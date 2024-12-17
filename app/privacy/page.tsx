import type { FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy: FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            We value your privacy and are committed to protecting your personal
            information. This privacy policy outlines how we collect, use, and
            safeguard your data when you interact with our website.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Information We Collect
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            We may collect certain data when you visit our site, including:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            <li>
              IP Address: We collect your IP address to help implement
              rate-limiting features, which prevent misuse and ensure a secure
              and smooth browsing experience.
            </li>
            <li>
              Analytics Data: We use tools like Vercel PageSpeed and Unami to
              analyze traffic patterns and understand user behavior on our site.
              These tools help us monitor site performance and improve the user
              experience.
            </li>
            <li>
              Browser Cache: Some data may be stored in your browser's cache to
              optimize loading times and improve the overall responsiveness of
              the site.
            </li>
          </ul>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            How We Use Your Information
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            The information we collect is used primarily to improve our
            website’s performance and provide a better user experience.
            Specifically, we use this data to:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            <li>
              Monitor traffic and user interactions to improve website content
              and layout.
            </li>
            <li>Implement rate limiting for security purposes.</li>
            <li>
              Analyze site performance through analytics tools such as Vercel
              PageSpeed and Unami.
            </li>
          </ul>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Data Security
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            We take appropriate measures to safeguard your data. While no method
            of transmission over the internet is completely secure, we strive to
            use commercially acceptable means to protect your personal
            information.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Your Rights
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            You have the right to access, correct, or delete any personal data
            we hold about you. If you have any concerns about how we handle your
            data, feel free to contact us.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Changes to This Privacy Policy
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            We reserve the right to update this Privacy Policy at any time. Any
            changes will be posted on this page, and we encourage you to review
            this policy periodically.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Contact Us
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at: privacy@surajr.com.np.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
