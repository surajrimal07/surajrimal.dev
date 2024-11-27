'use server';

import { createClient } from '@/utils/supabase/server';

export default async function UserData({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return children({ user });
}
