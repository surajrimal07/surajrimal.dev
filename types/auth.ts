export type AuthFlow = 'signIn' | 'signUp';

export interface SignUpData {
  email: string;
  password: string;
  options: {
    data: {
      full_name: {
        name: string;
      };
    };
  };
}
