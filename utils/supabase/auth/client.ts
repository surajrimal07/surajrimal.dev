import { createClient } from '../client';

export function getAuth() {
  const { auth } = createClient();

  return auth;
}

export const getUser = async () => {
  const auth = getAuth();
  const authUser = (await auth.getUser()).data.user;
  if (!authUser) {
    return null;
  }

  return authUser;
};
