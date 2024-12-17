'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { Provider } from '@supabase/supabase-js';
import { TriangleAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { PiMagicWandBold } from 'react-icons/pi';

import { AuthSignIn } from '@/app/auth/actions';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useLocalStorage from '@/lib/hooks/use-local-storage';
import type { LastAuth } from '@/types/lastauth';
import { toastOptions } from '@/utils/toast';

const AuthScreen = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [lastProvider, setLastProvider] = useLocalStorage<LastAuth | null>(
    'lastAuthProvider',
    null,
  );

  const errorMessageRef = useRef<string | null>(null);

  const showErrorToast = useCallback((message: string) => {
    toast.error(message, toastOptions);
  }, []);

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
      setLastProvider(provider as LastAuth);

      const { errorMessage, url } = await AuthSignIn(provider);

      if (url) {
        router.push(url);
      } else {
        setError(errorMessage || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setPending(false);
    }
  };

  const AuthButton = ({
    provider,
    icon: Icon,
    children,
  }: {
    provider: Provider | 'magiclink';
    icon: React.ComponentType<{ className: string }>;
    children: React.ReactNode;
  }) => (
    <button
      className={`relative flex w-full items-center justify-center gap-2 rounded-md bg-background p-3 text-sm transition-colors hover:bg-accent disabled:opacity-50 ${pending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} border border-border`}
      disabled={pending}
      type="button"
      onClick={() =>
        provider === 'magiclink'
          ? router.push('/auth/magiclink')
          : oAuthSignIn(provider as Provider)
      }
    >
      <Icon className="size-5" />
      <span className="ml-2">{children}</span>
      {lastProvider === provider && (
        <Badge
          className="absolute right-1 top-1 bg-background/80 px-1 py-0 text-[10px] font-normal leading-3"
          variant="outline"
        >
          Last used
        </Badge>
      )}
    </button>
  );

  return (
    <div className="flex h-full items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        <Card className="h-full w-full p-8 shadow-lg">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Welcome back </CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          {!!error && (
            <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/20 p-3 text-sm text-red-500">
              <TriangleAlert className="size-4" />
              <p>{error}</p>
            </div>
          )}
          <CardContent className="space-y-5 px-0 pb-0">
            <div className="flex flex-col gap-y-2.5">
              <AuthButton icon={PiMagicWandBold} provider="magiclink">
                Continue with Magic Link
              </AuthButton>
              <AuthButton icon={GrGoogle} provider="google">
                Continue with Google
              </AuthButton>

              <AuthButton icon={FaTwitter} provider="twitter">
                Continue with Twitter
              </AuthButton>
              <AuthButton icon={FaGithub} provider="github">
                Continue with GitHub
              </AuthButton>
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
