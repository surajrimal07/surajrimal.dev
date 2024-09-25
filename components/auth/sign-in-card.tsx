'use client';

import Link from 'next/link';
import { useState } from 'react';

import { TriangleAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { IoPersonSharp } from 'react-icons/io5';

import { emailsignup } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AuthFlow } from '@/types/auth';
import { toastOptions } from '@/utils/toast';

import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loading-button';

interface SignInCardProps {
  setState: (state: AuthFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  // const onPasswordSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setPending(true);
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //   } catch (err) {
  //     const error = err as Error;

  //     setError(error.message || 'Something went wrong');
  //   } finally {
  //     setPending(false);
  //   }
  // };

  // const onProviderSignIn = async (provider: 'google' | 'github') => {
  //   setPending(true);
  //   try {
  //     const authProvider =
  //       provider === 'google' ? googleProvider : githubProvider;

  //   } catch (err) {
  //     const error = err as Error;

  //     setError(error.message || 'Something went wrong');
  //   } finally {
  //     setPending(false);
  //   }
  // };

  const onPasswordSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      await emailsignup(formData);

      toast.success(
        'Account created successfully, please confirm your email to continue',
        {
          ...toastOptions,
        }
      );
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
    <Card className="h-full w-full p-8 shadow-lg">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Welcome back </CardTitle>
        <CardDescription>
          Use your credentials to access your account
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
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
          <LoadingButton
            loading={pending}
            className="w-full"
            disabled={pending}
            size="lg"
            type="submit"
          >
            Continue
          </LoadingButton>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="relative w-full"
            disabled={pending}
            size="lg"
            variant="outline"
          >
            <GrGoogle className="absolute left-2.5 top-3 size-5" />
            Continue with Google
          </Button>

          <Button
            className="relative w-full"
            disabled={pending}
            size="lg"
            variant="outline"
          >
            <FaTwitter className="absolute left-2.5 top-3 size-5" />
            Continue with Twitter
          </Button>
          <Button
            className="relative w-full"
            disabled={pending}
            size="lg"
            variant="outline"
          >
            <FaGithub className="absolute left-2.5 top-3 size-5" />
            Continue with Github
          </Button>
          <Button
            className="relative w-full"
            disabled={pending}
            size="lg"
            variant="outline"
          >
            <IoPersonSharp className="absolute left-2.5 top-3 size-5" />
            Continue as Guest
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{' '}
            <span
              className="cursor-pointer text-xs underline"
              onClick={() => setState('signUp')}
            >
              Sign Up
            </span>
          </p>
          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link className="underline" href="#">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link className="underline" href="#">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
