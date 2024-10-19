'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createMedia, updateMedia } from '@/lib/media';
import { InMedia } from '@/types/media';
import { toastOptions } from '@/utils/toast';

type FormData = Omit<InMedia, 'id'>;

export default function MediaForm({ media }: { media?: InMedia }) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(
    media || {
      title: '',
      publication: '',
      date: '',
      url: '',
      description: '',
      category: '',
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (media) {
        await updateMedia(media.id, formData);
        toast.success('Media item updated successfully', toastOptions);
      } else {
        await createMedia(formData);
        toast.success('Media item created successfully', toastOptions);
      }
      router.push('/admin/media');
      router.refresh();
    } catch (error) {
      toast.error(
        `Failed to save media: ${
          error instanceof Error ? error.message : String(error)
        }`,
        toastOptions
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="publication">Publication</Label>
        <Input
          id="publication"
          name="publication"
          value={formData.publication}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Publication Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : media ? 'Update Media' : 'Create Media'}
      </Button>
    </form>
  );
}
