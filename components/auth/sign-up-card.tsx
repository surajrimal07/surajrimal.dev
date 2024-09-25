'use client';

import React, { useState } from 'react';

import { TriangleAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';

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

import Link from '../Link';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loading-button';

interface SignUpCardProps {
  setState: (state: AuthFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const onPasswordSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password do not match', {
        ...toastOptions,
      });
      return;
    }
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
  // const onProviderSignUp = async (
  //   provider: 'google' | 'github' | 'twitter',
  // ) => {
  //   setPending(true);
  //   try {
  //     let authProvider;

  //     switch (provider) {
  //       case 'google':
  //         authProvider = googleProvider;
  //         break;
  //       case 'github':
  //         authProvider = githubProvider;
  //         break;
  //       case 'twitter':
  //         authProvider = twitterProvider;
  //         break;
  //       default:
  //         throw new Error('Unsupported provider');
  //     }
  //     await signInWithPopup(auth, authProvider);
  //     console.log('Signed up');
  //   } catch (err) {
  //     const error = err as Error;

  //     setError(error.message || 'Something went wrong');
  //   } finally {
  //     setPending(false);
  //   }
  // };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your credentials to create your account
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/20 p-3 text-sm text-red-500">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
          <Input
            required
            disabled={pending}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            required
            disabled={pending}
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              Or Signup with
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="relative w-full"
            disabled={pending}
            size="lg"
            variant="outline"
            //            onClick={() => onProviderSignUp('google')}
          >
            <GrGoogle className="absolute left-2.5 top-3 size-5" />
            Continue with Google
          </Button>
          <Button
            className="relative w-full"
            disabled={pending}
            size="lg"
            variant="outline"
            //         onClick={() => onProviderSignUp('twitter')}
          >
            <FaTwitter className="absolute left-2.5 top-3 size-5" />
            Continue with Twitter
          </Button>
          <Button
            className="relative w-full"
            disabled={pending}
            size="lg"
            variant="outline"
            //         onClick={() => onProviderSignUp('github')}
          >
            <FaGithub className="absolute left-2.5 top-3 size-5" />
            Continue with GitHub
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{' '}
            <button
              className="cursor-pointer border-none bg-transparent p-0 text-xs underline"
              onClick={() => setState('signIn')}
              type="button"
            >
              Sign In
            </button>
          </p>
          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link className="underline" href="/terms-of-service">
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
  );
};
