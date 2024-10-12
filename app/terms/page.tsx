import { FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService: FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            These Terms of Service ("Terms") govern your use of the personal
            blog website of Suraj Rimal. By accessing or using the website, you
            agree to comply with these Terms.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            User Responsibilities
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            While using this website, you agree not to engage in any of the
            following prohibited activities:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            <li>No spamming or abusive behavior towards other users.</li>
            <li>
              Avoid randomly clicking buttons like submit, reactions, or any
              other interaction components.
            </li>
            <li>
              Respect rate-limiting mechanisms in place to ensure fair use of
              the platform.
            </li>
          </ul>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Account Registration and Access
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Users can create an account via Supabase using Google, GitHub, or
            their email and password. By registering, you agree to provide
            accurate and complete information and keep your login credentials
            secure.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Termination of Use
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Your access to the website may be terminated if you violate these
            Terms, particularly through actions such as spamming, overusing
            interactive components, or attempting to bypass security measures
            like rate-limiting.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Intellectual Property
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            The code and content of this website are open-source and available
            for public use.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Changes to Terms of Servicea
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            These Terms of Service are final and will not be modified
            frequently. In the unlikely event of a change, users will be
            notified via the website.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-200">
            Governing Law
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            These Terms are governed by and construed in accordance with the
            laws of the United States.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
