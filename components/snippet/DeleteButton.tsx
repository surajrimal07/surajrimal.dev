'use client';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { toastOptions } from '@/utils/toast';

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      try {
        const response = await fetch(`/api/snippets?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Snippet deleted successfully', toastOptions);

          router.refresh();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An unknown error occurred');
        }
      } catch (error) {
        toast.error(
          `Failed to delete snippet: ${error instanceof Error ? error.message : String(error)}`,
          toastOptions
        );
      }
    }
  };

  return (
    <Button variant="destructive" className="w-full" onClick={handleDelete}>
      Delete
    </Button>
  );
}
