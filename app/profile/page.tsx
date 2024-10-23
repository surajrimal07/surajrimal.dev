'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { toast } from 'react-hot-toast';

import { toastOptions } from '@/utils/toast';

export default function ProfilePage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      toast.success(decodeURIComponent(message), toastOptions);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Profile Page</h1>
      <p>Your profile content will go here.</p>
    </div>
  );
}
