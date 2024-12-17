'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';
import { z } from 'zod';

import useLocalStorage from '@/lib/hooks/use-local-storage';
import {
  convertkitSubscribe,
  convertkitUnsubscribe,
  getConvertkitTotalSubscribers,
} from '@/lib/newsletter';
import { emailSchema } from '@/lib/validation/email';
import { toastOptions } from '@/utils/toast';

const NewsletterForm = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useLocalStorage<string | null>(
    'newsletter-email',
    null,
  );
  const [totalSubscribers, setTotalSubscribers] = useState(0);

  useEffect(() => {
    const fetchTotalSubscribers = async () => {
      const result = await getConvertkitTotalSubscribers();
      setTotalSubscribers(result?.totalSubscribers);
    };

    fetchTotalSubscribers();
  }, []);

  const handleUnsubscribe = async () => {
    if (!subscribedEmail) {
      toast.error('No email to unsubscribe', toastOptions);
      return;
    }
    const response = await convertkitUnsubscribe(subscribedEmail);

    if (response.error) {
      toast.error(response.error, toastOptions);
      return;
    }

    toast.success(
      response.message || 'Successfully unsubscribed!',
      toastOptions,
    );
    setSubscribedEmail(null);
  };

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = inputEl.current?.value;

    if (!email) return;

    try {
      const validatedInput = emailSchema.parse({ email });

      const response = await convertkitSubscribe(validatedInput.email);
      const { error: apiError, message: apiMessage } = response;

      if (apiError) {
        setError(true);
        setMessage(
          'Your e-mail address is invalid or you are already subscribed!',
        );
        toast.error(
          'Your e-mail address is invalid or you are already subscribed!',
          toastOptions,
        );
        return;
      }

      if (apiMessage) {
        setMessage(apiMessage);
        toast.success(apiMessage, toastOptions);
      }
      if (inputEl.current) {
        inputEl.current.value = '';
      }
      setError(false);
      setSubscribedEmail(validatedInput.email);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(true);
        setMessage(err.errors[0].message);
        toast.error(err.errors[0].message, toastOptions);
      }
    }
  };

  const title = subscribedEmail ? (
    <p>
      You have already joined newsletter.{' '}
      <button
        className="cursor-pointer text-primary-300 underline hover:text-primary-600 dark:hover:text-primary-400"
        type="button"
        onClick={handleUnsubscribe}
      >
        Unsubscribe
      </button>{' '}
      anytime.
    </p>
  ) : (
    `${totalSubscribers} people have already joined! No spam, unsubscribe anytime.`
  );

  return (
    <div>
      <h2 className="mb-2 text-center text-2xl font-bold">Stay in the loop!</h2>
      <div className="pb-1 text-center text-sm font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </div>

      {!subscribedEmail && (
        <form className="mt-1 flex flex-col sm:flex-row" onSubmit={subscribe}>
          <div>
            <label htmlFor="email-input">
              <span className="sr-only">Email address</span>
              <input
                ref={inputEl}
                required
                autoComplete="email"
                className="w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
                id="email-input"
                name="email"
                placeholder="Enter your email"
                type="email"
              />
            </label>
          </div>
          <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0">
            <button
              className="w-full rounded-md bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400 sm:py-0"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="w-72 pt-2 text-center text-sm text-red-500 dark:text-red-400 sm:w-96">
          {message}
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
