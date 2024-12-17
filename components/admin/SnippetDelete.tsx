'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toastOptions } from '@/utils/toast';

interface DeleteButtonProps {
  id: string;
  content: string;
}

export default function DeleteButton({ id, content }: DeleteButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts?type=${content}&id=${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ content: 'snippets' }),
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
        toastOptions,
      );
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action will permanently delete the file{' '}
            <span className="font-bold text-red-400">{id}.mdx</span>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
