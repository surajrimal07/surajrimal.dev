'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Provider } from '@supabase/supabase-js';

import { AuthError } from '@/app/auth/autherror';
import { createClient } from '@/utils/supabase/server';

export async function emaillogin(
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = createClient();
  const logindata = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: { captchaToken: formData.get('captchaToken') as string },
  };

  const { error } = await supabase.auth.signInWithPassword(logindata);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function magiclinklogin(email: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    throw new AuthError(error.message);
  }
}

export async function emailsignup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: { captchaToken: formData.get('captchaToken') as string },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new AuthError(error.message);
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function AuthSignIn(provider: Provider) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
    },
  });

  if (error) throw new AuthError(error.message);

  // revalidatePath('/', 'layout');
  // redirect('/dashboard');

  return { errorMessage: null, url: data.url };
}
