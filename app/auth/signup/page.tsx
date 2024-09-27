'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

import { TriangleAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';

import Link from '@/components/Link';
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
import { toastOptions } from '@/utils/toast';

import { emailsignup } from '../actions';

const SignUpCard = () => {
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onPasswordSignUp = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      e.persist();

      const { email, password, confirmPassword } = formState;

      if (password !== confirmPassword) {
        toast.error('Passwords do not match', toastOptions);
        return;
      }

      try {
        setPending(true);
        setError('');

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        await emailsignup(formData);

        toast.success(
          'Signup successful! Please check your email to verify your account.',
          toastOptions
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';

        setError(errorMessage);
        toast.error(errorMessage, toastOptions);
      } finally {
        setPending(false);
      }
    },
    [formState]
  );

  return (
    <div className="flex h-full items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
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
                name="name"
                value={formState.name}
                onChange={handleChange}
              />
              <Input
                required
                disabled={pending}
                placeholder="Email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
              <Input
                required
                disabled={pending}
                placeholder="Password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
              <Input
                required
                disabled={pending}
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
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
                Continue with GitHub
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Already have an account?{' '}
                <button
                  className="cursor-pointer border-none bg-transparent p-0 text-xs underline"
                  type="button"
                  onClick={() => router.push('/auth')}
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
      </div>
    </div>
  );
};

export default SignUpCard;
