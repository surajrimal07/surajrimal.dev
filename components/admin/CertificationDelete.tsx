'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { deleteCertification } from '@/lib/certification';

export default function DeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this certification?')) {
      setIsDeleting(true);
      try {
        await deleteCertification(id);
        router.refresh();
      } catch (error) {
        console.error('Failed to delete certification:', error);
        alert('Failed to delete certification. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="destructive"
      size="sm"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
