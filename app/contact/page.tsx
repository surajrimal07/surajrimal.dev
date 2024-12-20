'use client';

import { useRef, useState } from 'react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import siteMetadata from '@/data/siteMetadata';
import type { Tables } from '@/types/database';
import { toastOptions } from '@/utils/toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purpose, setPurpose] =
    useState<Tables<'contacts'>['purpose']>('general');
  const [stack, setStack] = useState<Tables<'contacts'>['stack']>('other');
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const contactData = Object.fromEntries(
      formData,
    ) as unknown as Tables<'contacts'>;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactData,
          purpose,
          stack,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          errorData.message || 'An error occurred. Please try again.',
          toastOptions,
        );
        return;
      }

      toast.success(
        "Message sent! We'll get back to you as soon as possible.",
        toastOptions,
      );

      if (formRef.current) {
        formRef.current.reset();
      }
      setPurpose('general');
      setStack(null);
    } catch (error) {
      toast.error(
        `Failed to send message. Please try again. ${error}`,
        toastOptions,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-0">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Contact
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Let&apos;s get in touch! Fill out the form below and we&apos;ll get
          back to as soon as possible.
        </p>
      </div>
      <div className="mb-8 rounded-md border border-gray-300 bg-gray-300 p-4 text-gray-700">
        <p className="mb-2 text-sm">
          Just a friendly reminder that the information provided here is for
          business purposes only. If you have any questions, feel free to chat
          with me directly on my social media.
        </p>
        <p className="mb-2 text-sm">
          I appreciate your understanding in using this responsibly.
        </p>
        <h2 className="font-bold">Contact Details</h2>
        <p className="text-sm">Address: {siteMetadata.address}</p>
        <p className="text-sm">Timezone: {siteMetadata.timezone}</p>
        <p className="text-sm">
          E-mail:{' '}
          <a className="text-red-600" href="mailto:business@enji.dev">
            business@surajr.com.np
          </a>
        </p>
        <p className="text-sm">Phone: {siteMetadata.socialAccounts.phone}</p>
        <p className="text-sm">
          If you need any further information, such as my phone number, please
          do not hesitate to send me an email first.
        </p>
      </div>
      <form ref={formRef} className="space-y-8" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input required id="name" name="name" placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            required
            id="email"
            name="email"
            placeholder="Your email"
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="purpose">Purpose</Label>
          <Select
            required
            value={purpose}
            onValueChange={(value) =>
              setPurpose(value as Tables<'contacts'>['purpose'])
            }
          >
            <SelectTrigger id="purpose">
              <SelectValue placeholder="Select a purpose for contact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="project">Project Proposal</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {purpose === 'project' && (
          <>
            <div>
              <Label htmlFor="stack">Project Stack</Label>
              <Select
                required
                value={stack || 'null'}
                onValueChange={(value) =>
                  setStack(value as Tables<'contacts'>['stack'])
                }
              >
                <SelectTrigger id="stack">
                  <SelectValue placeholder="Select your project stack" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-stack">Full Stack</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {stack === 'other' && (
              <div>
                <Label htmlFor="custom_stack">Specify Stack</Label>
                <Input
                  required
                  id="custom_stack"
                  name="custom_stack"
                  placeholder="Please specify your stack"
                />
              </div>
            )}
            <div>
              <Label htmlFor="project_description">Project Description</Label>
              <Textarea
                required
                className="resize-none"
                id="project_description"
                name="project_description"
                placeholder="Please describe your project"
              />
            </div>
            <div>
              <Label htmlFor="cost_expectations">Cost Expectations</Label>
              <Input
                required
                id="cost_expectations"
                name="cost_expectations"
                placeholder="~ $Your budget range"
              />
            </div>
          </>
        )}
        {purpose && purpose !== 'project' && (
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              required
              className="resize-none"
              id="message"
              name="message"
              placeholder="Your message"
            />
          </div>
        )}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
