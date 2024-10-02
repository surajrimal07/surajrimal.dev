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
import { ContactForm } from '@/types/contact';
import { toastOptions } from '@/utils/toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purpose, setPurpose] = useState<ContactForm['purpose']>('general');
  const [stack, setStack] = useState<ContactForm['stack']>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const contactData = Object.fromEntries(formData) as unknown as ContactForm;

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
          toastOptions
        );
        return;
      }

      toast.success(
        "Message sent! We'll get back to you as soon as possible.",
        toastOptions
      );

      if (formRef.current) {
        formRef.current.reset();
      }
      setPurpose('general');
      setStack(undefined);
    } catch (error) {
      toast.error(
        `Failed to send message. Please try again. ${error}`,
        toastOptions
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
          Let's get in touch! Fill out the form below and we'll get back to you
          as soon as possible.
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
          <a href="mailto:business@enji.dev" className="text-red-600">
            business@surajr.com.np
          </a>
        </p>
        <p className="text-sm">Phone: {siteMetadata.socialAccounts.phone}</p>
        <p className="text-sm">
          If you need any further information, such as my phone number, please
          do not hesitate to send me an email first.
        </p>
      </div>
      <form ref={formRef} onSubmit={onSubmit} className="space-y-8">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            required
          />
        </div>
        <div>
          <Label htmlFor="purpose">Purpose</Label>
          <Select
            value={purpose}
            onValueChange={(value) =>
              setPurpose(value as ContactForm['purpose'])
            }
            required
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
                value={stack}
                onValueChange={(value) =>
                  setStack(value as ContactForm['stack'])
                }
                required
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
                <Label htmlFor="customStack">Specify Stack</Label>
                <Input
                  id="customStack"
                  name="customStack"
                  placeholder="Please specify your stack"
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                placeholder="Please describe your project"
                className="resize-none"
                required
              />
            </div>
            <div>
              <Label htmlFor="costExpectations">Cost Expectations</Label>
              <Input
                id="costExpectations"
                name="costExpectations"
                placeholder="~ $Your budget range"
                required
              />
            </div>
          </>
        )}
        {purpose && purpose !== 'project' && (
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message"
              className="resize-none"
              required
            />
          </div>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
