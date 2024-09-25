'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import toast from 'react-hot-toast';

import { toastOptions } from '@/utils/toast';

const Page = () => {
  const searchParams = useSearchParams();

  const errorMessageRef = useRef<string | null>(null);

  const showToast = useCallback((message: string) => {
    toast(message, toastOptions);
  }, []);

  useEffect(() => {
    const errorMessage = searchParams.get('message');

    if (errorMessage && errorMessage !== errorMessageRef.current) {
      errorMessageRef.current = errorMessage;
      showToast(errorMessage);
    }
  }, [searchParams, showToast]);

  return <div>This is a dummy admin dashboard</div>;
};

export default Page;
