'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createCertification, updateCertification } from '@/lib/certification';
import { Certification } from '@/types/certificate';
import { toastOptions } from '@/utils/toast';

type FormData = Omit<Certification, 'id' | 'created_at' | 'updated_at'>;

export default function CertificationForm({
  certification,
}: {
  certification?: Certification;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(
    certification || {
      name: '',
      platform: '',
      completion_date: '',
      image_url: '',
      description: '',
      verification_link: '',
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
      if (certification) {
        await updateCertification(certification.id, formData);

        toast.success('Certification updated successfully', toastOptions);
      } else {
        await createCertification(formData);
        toast.success('Certification created successfully', toastOptions);
      }
      router.push('/admin/certifications');
      router.refresh();
    } catch (error) {
      toast.error(
        `Failed to save certification: ${
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="platform">Platform</Label>
        <Input
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="completion_date">Completion Date</Label>
        <Input
          id="completion_date"
          name="completion_date"
          type="date"
          value={formData.completion_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="verification_link">Verification Link</Label>
        <Input
          id="verification_link"
          name="verification_link"
          value={formData.verification_link || ''}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Certification'}
      </Button>
    </form>
  );
}
