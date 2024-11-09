import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Nepse Account Manager',
  description:
    'Terms of Service for the Nepse Account Manager browser extension. Learn about usage terms, limitations, and user responsibilities.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto px-4 py-8 dark:text-gray-100">
      <h1 className="mb-3 text-3xl font-bold">
        Terms of Service - Nepse Account Manager
      </h1>

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Version 1.0.0 - Last updated on: 11/09/2024
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <div className="mb-4 border-l-4 border-yellow-400 bg-yellow-50 p-4 dark:bg-yellow-900/30">
          <p className="font-medium">Extension Information:</p>
          <ul className="mb-2 list-disc pl-6">
            <li>
              These terms apply exclusively to the browser extension "Nepse
              Account Manager"
            </li>
            <li>
              This Extension functions only on specific domains:
              <ul className="mt-2 list-disc pl-6">
                <li>*.nepsetms.com.np (TMS portals)</li>
                <li>meroshare.cdsc.com.np (Meroshare portal)</li>
              </ul>
            </li>
            <li>
              The Extension is not designed to and will not function on any
              other websites
            </li>
          </ul>
        </div>

        <div className="mb-4 border-l-4 border-yellow-400 bg-yellow-50 p-4 dark:bg-yellow-900/30">
          <p className="font-medium">Important Disclaimers:</p>
          <ul className="mb-2 list-disc pl-6">
            <li>
              This Extension is NOT affiliated with, endorsed by, or connected
              to Nepal Stock Exchange (NEPSE), Trading Management System (TMS),
              or Meroshare/CDSC in any way.
            </li>
            <li>
              This is an open-source project provided for educational purposes
              only.
            </li>
            <li>
              The author holds NO LIABILITY for any misuse, data loss, or
              security issues arising from the use of this Extension.
            </li>
            <li>
              Users are solely responsible for their account security and any
              consequences of using this Extension.
            </li>
          </ul>
        </div>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          1. Open Source Nature
        </h2>
        <p>This Extension is open-source software:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Source code is publicly available for study and review</li>
          <li>
            Users can inspect the code to verify security and functionality
          </li>
          <li>Contributions and improvements are welcome through GitHub</li>
          <li>The code is available for educational purposes</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          2. Description of Service
        </h2>
        <p>The Extension provides automated form-filling functionality for:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>TMS (Trading Management System) login portals</li>
          <li>Meroshare login portals</li>
          <li>Automated CAPTCHA solving for TMS portals</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          3. User Data and Responsibility
        </h2>
        <p>Users acknowledge and accept that:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>All credentials are stored locally on the user's device</li>
          <li>
            Backup files contain plain text credentials - users are responsible
            for keeping backups secure
          </li>
          <li>
            The Extension does not transmit credentials to any external servers
          </li>
          <li>
            Users are responsible for the security of their stored credentials
          </li>
          <li>The Extension does not guarantee the security of stored data</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">4. Analytics Usage</h2>
        <p>The Extension's analytics feature:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Only tracks successful login events</li>
          <li>Does not collect any personal data or credentials</li>
          <li>Is used solely to measure Extension usage metrics</li>
          <li>Can be disabled at any time through Extension settings</li>
          <li>
            Analytics data contains no personally identifiable information
          </li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">5. Legal Compliance</h2>
        <p>In case of any legal concerns:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>
            Contact the author immediately if the Extension violates any laws or
            regulations
          </li>
          <li>
            The author commits to taking immediate action on valid legal
            concerns
          </li>
          <li>
            Users must comply with all applicable laws while using the Extension
          </li>
          <li>
            The Extension may be modified or discontinued to comply with legal
            requirements
          </li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          6. Limitations of Service
        </h2>
        <ul className="mb-4 list-disc pl-6">
          <li>
            The Extension is provided "as is" without warranties of any kind
          </li>
          <li>
            No guarantee of continuous, uninterrupted access to the service
          </li>
          <li>CAPTCHA solving functionality may not be 100% accurate</li>
          <li>
            The Extension may not work with future updates to target websites
          </li>
          <li>Service may be interrupted for maintenance or updates</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">7. User Obligations</h2>
        <ul className="mb-4 list-disc pl-6">
          <li>Use the Extension responsibly and legally</li>
          <li>Maintain the security of their account credentials</li>
          <li>Report any security vulnerabilities to the author</li>
          <li>Not attempt to reverse engineer or modify the Extension</li>
          <li>Not use the Extension for any malicious purposes</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold">8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use
          of the Extension after changes constitutes acceptance of the modified
          terms.
        </p>

        <h2 className="mb-3 mt-6 text-xl font-semibold">
          9. Contact Information
        </h2>
        <p>For support, concerns, or legal issues:</p>
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
            href="/tmsextension/privacy"
            className="inline-flex items-center gap-2 text-primary-600 hover:underline dark:text-primary-400"
          >
            View Privacy Policy
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
