'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import { SignInCard } from '@/components/auth/sign-in-card';
import { SignUpCard } from '@/components/auth/sign-up-card';
import { AuthFlow } from '@/types/auth';
import { toastOptions } from '@/utils/toast';

const AuthScreen = () => {
  const searchParams = useSearchParams();
  const [state, setState] = useState<AuthFlow>(() => {
    const flowParam = searchParams.get('flow') as AuthFlow | null;
    return flowParam || 'signIn';
  });

  const errorMessageRef = useRef<string | null>(null);

  const showErrorToast = useCallback((message: string) => {
    toast.error(message, toastOptions);
  }, []);

  useEffect(() => {
    const flowParam = searchParams.get('flow') as AuthFlow | null;
    const errorMessage = searchParams.get('message');

    if (flowParam && flowParam !== state) {
      setState(flowParam);
    }

    if (errorMessage && errorMessage !== errorMessageRef.current) {
      errorMessageRef.current = errorMessage;
      showErrorToast(errorMessage);
    }
  }, [searchParams, state, showErrorToast]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        {state === 'signIn' ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
