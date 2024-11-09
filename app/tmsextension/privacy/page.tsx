import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Nepse Trade Helper',
  description:
    'Privacy Policy for the Nepse Trade Helper browser extension. Learn about data handling, storage, and user privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto px-4 py-8 dark:text-gray-100">
      <h1 className="mb-6 text-3xl font-bold">
        Privacy Policy - Nepse Trade Helper
      </h1>

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Version 1.0.0 - Last updated on: 11/09/2024
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <div className="mb-4 border-l-4 border-yellow-400 bg-yellow-50 p-4 dark:bg-yellow-900/30">
          <p className="font-medium">Extension Scope:</p>
          <ul className="mb-2 list-disc pl-6">
            <li>
              This privacy policy applies exclusively to the browser extension
              "Nepse Trade Helper"
            </li>
            <li>
              The Extension operates only on:
              <ul className="mt-2 list-disc pl-6">
                <li>TMS portals (*.nepsetms.com.np)</li>
                <li>Meroshare portal (meroshare.cdsc.com.np)</li>
              </ul>
            </li>
            <li>No data is collected from any other websites</li>
          </ul>
        </div>

        <div className="mb-4 border-l-4 border-yellow-400 bg-yellow-50 p-4 dark:bg-yellow-900/30">
          <p className="font-medium">Important Privacy Notice:</p>
          <ul className="mb-2 list-disc pl-6">
            <li>
              This Extension is NOT affiliated with NEPSE, TMS, or
              Meroshare/CDSC
            </li>
            <li>All user data remains strictly on the user's device</li>
            <li>No credentials are ever transmitted to external servers</li>
            <li>
              Users are solely responsible for securing their backup files
            </li>
            <li>
              The Extension's functionality is limited to form auto-filling and
              CAPTCHA solving on specified domains only
            </li>
          </ul>
        </div>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          1. Data Collection and Storage
        </h2>
        <h3 className="mb-2 mt-4 text-lg font-medium">1.1 Local Storage</h3>
        <p>The Extension stores the following data locally in your browser:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>TMS and Meroshare account credentials</li>
          <li>Broker/DP numbers</li>
          <li>Account aliases</li>
          <li>Primary account preferences</li>
          <li>All data is stored using Chrome's secure storage API</li>
          <li>
            Data remains on your device and is never transmitted externally
          </li>
        </ul>

        <h3 className="mb-2 mt-4 text-lg font-medium">1.2 Analytics Data</h3>
        <p>With user consent, the Extension collects minimal analytics data:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Only successful login attempts are counted</li>
          <li>No personal data or credentials are included</li>
          <li>Analytics are used solely to track usage metrics</li>
          <li>Analytics can be disabled at any time through settings</li>
          <li>No user identification or tracking is performed</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          2. Data Backup and Security
        </h2>
        <p>Regarding backup functionality:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Backup files contain unencrypted account credentials</li>
          <li>Users are responsible for securing their backup files</li>
          <li>Backups are created and stored locally</li>
          <li>The Extension does not upload backups to any server</li>
          <li>Users should store backup files securely</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          3. Open Source Transparency
        </h2>
        <p>We maintain full transparency through:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Publicly available source code on GitHub</li>
          <li>Documented data handling practices</li>
          <li>Community code review and contributions</li>
          <li>Clear documentation of all features</li>
          <li>Open issue tracking and bug reporting</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          4. Data Security Measures
        </h2>
        <ul className="mb-4 list-disc pl-6">
          <li>All credentials are stored using Chrome's secure storage API</li>
          <li>
            No external data transmission except anonymous login success metrics
          </li>
          <li>HTTPS encryption for all network requests</li>
          <li>Content Security Policy (CSP) implementation</li>
          <li>Regular security updates and patches</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          5. User Control and Rights
        </h2>
        <p>Users have complete control over their data:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Enable/disable analytics collection</li>
          <li>Create and manage data backups</li>
          <li>Delete individual accounts</li>
          <li>Remove all data by uninstalling the Extension</li>
          <li>Export and import account data</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          6. Third-Party Access
        </h2>
        <p>The Extension interacts with:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>TMS and Meroshare portals for form filling</li>
          <li>Chrome Storage API for local data storage</li>
          <li>Anonymous analytics service (optional)</li>
          <li>No other third-party services are used</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          7. Updates to Privacy Policy
        </h2>
        <ul className="mb-4 list-disc pl-6">
          <li>Users will be notified of significant changes</li>
          <li>Changes will be documented in the GitHub repository</li>
          <li>Updated policies will be available in new releases</li>
          <li>Users can review changes before updating</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          8. Contact and Support
        </h2>
        <p>For privacy concerns or questions:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>
            <a
              href="https://github.com/surajrimal07/tms-captcha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              Visit our GitHub repository
            </a>
          </li>
          <li>
            <a
              href="https://github.com/surajrimal07/tms-captcha/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              Submit issues through the repository's issue tracker
            </a>
          </li>
          <li>
            <a
              href="mailto:davidparkedme@gmail.com"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              Contact the author directly for urgent concerns
            </a>
          </li>
        </ul>

        <div className="mb-4 mt-8">
          <Link
            href="/tmsextension/terms"
            className="inline-flex items-center gap-2 text-primary-600 hover:underline dark:text-primary-400"
          >
            View Terms of Service
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
