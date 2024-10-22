'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Turnstile } from '@marsidev/react-turnstile';
import { Provider } from '@supabase/supabase-js';
import { TriangleAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { PiMagicWandBold } from 'react-icons/pi';

import { AuthSignIn, emaillogin } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/cool-separator';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { createClient } from '@/utils/supabase/client';
import { toastOptions } from '@/utils/toast';

import { AuthError } from './autherror';

const AuthScreen = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | undefined>(
    undefined
  );

  const errorMessageRef = useRef<string | null>(null);

  const showErrorToast = useCallback((message: string) => {
    toast.error(message, toastOptions);
  }, []);

  const cloudflare_turnstile =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_KEY!;

  useEffect(() => {
    const errorMessage = searchParams.get('message');

    if (errorMessage && errorMessage !== errorMessageRef.current) {
      errorMessageRef.current = errorMessage;
      showErrorToast(errorMessage);
    }
  }, [searchParams, showErrorToast]);

  const oAuthSignIn = async (provider: Provider) => {
    setPending(true);
    setError('');

    try {
      const { errorMessage, url } = await AuthSignIn(provider);

      if (url) {
        router.push(url);
      } else {
        throw new Error(errorMessage || 'Something went wrong');
      }
    } catch (err) {
      if (err instanceof AuthError) {
        const errorMessage = err.message;
        showErrorToast(errorMessage);
        setError(errorMessage);
      } else {
        showErrorToast('An unexpected error occurred');
        setError('An unexpected error occurred');
      }
    } finally {
      setPending(false);
    }
  };

  const onPasswordSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('captchaToken', captchaToken!);

      const result: { error?: string } = await emaillogin(formData);

      if (result?.error) {
        const errorMessage = result.error;
        showErrorToast(errorMessage);
        setError(errorMessage);
        return;
      }

      const {
        data: { session },
      } = await createClient().auth.getSession();

      if (session?.user?.email) {
        toast.success(`Logged in as ${session.user.email}`, toastOptions);
      }
    } catch (err) {
      const errorMessage = `An unexpected error occurred ${err} `;
      showErrorToast(errorMessage);
      setError(errorMessage);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        <Card className="h-full w-full p-8 shadow-lg">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Welcome back </CardTitle>
            <CardDescription>
              Use your credentials to access your account
            </CardDescription>
          </CardHeader>
          {!!error && (
            <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/20 p-3 text-sm text-red-500">
              <TriangleAlert className="size-4" />
              <p>{error}</p>
            </div>
          )}
          <CardContent className="space-y-5 px-0 pb-0">
            <form className="space-y-2.5" onSubmit={onPasswordSignIn}>
              <Input
                required
                disabled={pending}
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                required
                disabled={pending}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Turnstile
                siteKey={cloudflare_turnstile}
                onSuccess={(token) => {
                  setCaptchaToken(token);
                }}
              />
              <LoadingButton
                loading={pending}
                className="w-full"
                disabled={pending}
                size="lg"
                type="submit"
              >
                Continue &rarr;
              </LoadingButton>
            </form>
            <div className="relative">
              <Separator
                label={
                  <div className="rounded-full border px-4 py-0 text-xs font-light">
                    Or continue with
                  </div>
                }
              />
            </div>
            <div className="flex flex-col gap-y-2.5">
              <Button
                className="relative w-full"
                disabled={pending}
                size="lg"
                variant="outline"
                onClick={() => router.push('/auth/magiclink')}
              >
                <PiMagicWandBold className="absolute left-2.5 top-3 size-5" />
                Continue with Magic Link
              </Button>
              <Button
                className="relative w-full"
                disabled={pending}
                size="lg"
                variant="outline"
                onClick={() => oAuthSignIn('google')}
              >
                <GrGoogle className="absolute left-2.5 top-3 size-5" />
                Continue with Google
              </Button>

              <Button
                className="relative w-full"
                disabled={pending}
                size="lg"
                variant="outline"
                onClick={() => oAuthSignIn('twitter')}
              >
                <FaTwitter className="absolute left-2.5 top-3 size-5" />
                Continue with Twitter
              </Button>
              <Button
                className="relative w-full"
                disabled={pending}
                size="lg"
                variant="outline"
                onClick={() => oAuthSignIn('github')}
              >
                <FaGithub className="absolute left-2.5 top-3 size-5" />
                Continue with Github
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Don&apos;t have an account?{' '}
                <button
                  className="cursor-pointer border-none bg-transparent p-0 text-xs underline"
                  type="button"
                  onClick={() => router.push('/auth/signup')}
                >
                  Sign Up
                </button>
              </p>
              <p className="text-center text-xs text-muted-foreground">
                By signing in, you agree to our{' '}
                <Link className="underline" href="/terms">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link className="underline" href="/privacy">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
