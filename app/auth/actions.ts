'use server';

import { Provider } from '@supabase/supabase-js';

import { AuthError } from '@/app/auth/autherror';
import { createClient } from '@/utils/supabase/server';

const getURL = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  let url = isDevelopment
    ? 'http://localhost:3000/'
    : (process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      'http://localhost:3000/');

  url = url.startsWith('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;

  return url;
};

export async function magiclinklogin(
  email: string
): Promise<{ error?: string }> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  });

  if (error) {
    return { error: error.message };
  }

  return {};
}

export async function AuthSignIn(provider: Provider) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${getURL()}auth/callback`,
    },
  });

  if (error) throw new AuthError(error.message);

  // revalidatePath('/', 'layout');
  // redirect('/dashboard');

  return { errorMessage: null, url: data.url };
}
