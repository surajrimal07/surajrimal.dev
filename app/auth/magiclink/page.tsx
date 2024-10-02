'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';

import { TriangleAlert } from 'lucide-react';
import toast from 'react-hot-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { toastOptions } from '@/utils/toast';

import { magiclinklogin } from '../actions';

const AuthScreen = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const errorMessageRef = useRef<string | null>(null);

  const router = useRouter();

  const showErrorToast = useCallback((message: string) => {
    toast.error(message, toastOptions);
  }, []);

  useEffect(() => {
    const errorMessage = searchParams.get('message');

    if (errorMessage && errorMessage !== errorMessageRef.current) {
      errorMessageRef.current = errorMessage;
      showErrorToast(errorMessage);
      setError(errorMessage);
    }
  }, [searchParams, showErrorToast]);

  const sendMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError('');
    setSuccess(false);

    try {
      await magiclinklogin(email);

      toast.success('Magic link sent! Check your email to sign in.', {
        ...toastOptions,
      });
      setSuccess(true);
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong';
      toast.error(errorMessage, {
        ...toastOptions,
      });
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
            <CardTitle>Sign In with magiclink</CardTitle>
            <CardDescription>
              Enter your email to receive a magic link for signing in
            </CardDescription>
          </CardHeader>
          {!!error && (
            <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/20 p-3 text-sm text-red-500">
              <TriangleAlert className="size-4" />
              <p>{error}</p>
            </div>
          )}
          {!!success && (
            <div className="bg-success/20 mb-6 flex items-center gap-x-2 rounded-md p-3 text-sm text-green-500">
              <p>Magic link sent! Check your email to sign in.</p>
            </div>
          )}
          <CardContent className="space-y-5 px-0 pb-0">
            <form className="space-y-2.5" onSubmit={sendMagicLink}>
              <Input
                required
                disabled={pending}
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <LoadingButton
                loading={pending}
                className="w-full"
                disabled={pending}
                size="lg"
                type="submit"
              >
                Send Magic Link &rarr;
              </LoadingButton>
            </form>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
