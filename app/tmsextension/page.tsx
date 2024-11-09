import type { Metadata } from 'next';
import Link from 'next/link';

import { FaChrome } from 'react-icons/fa';
import { TbBrandFirefox } from 'react-icons/tb';

import {
  extensionFAQS,
  extensionFeatures,
  extensionPlatforms,
  extensionPrivacyFeatures,
} from '@/data/nepseExtension';

export const metadata: Metadata = {
  title: 'Nepse Account Manager - Browser Extension',
  description:
    'Automate your TMS and Meroshare login experience with secure credential management and CAPTCHA solving capabilities.',
};

export default function ExtensionPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Nepse Account Manager
          </h1>
          <p className="mt-3 text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Streamline your TMS and Meroshare login experience securely
          </p>
          <div className="mt-8 space-x-4">
            <a
              href="https://chrome.google.com/webstore/detail/[your-extension-id]"
              className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaChrome className="mr-2 h-5 w-5" />
              Add to Chrome
            </a>
            <a
              href="https://addons.mozilla.org/en-US/firefox/addon/nepse-account-manager/"
              className="inline-flex items-center rounded-md border border-transparent bg-[#FF9500] px-6 py-3 text-base font-medium text-white hover:bg-[#E66000]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbBrandFirefox className="mr-2 h-5 w-5" />
              Add to Firefox
            </a>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {extensionFeatures.map((feature) => (
              <div
                key={feature.title}
                className="relative rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
              >
                <div className="mb-4 text-2xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Privacy & Security First
          </h2>
          <div className="rounded-lg bg-indigo-50 p-6 dark:bg-gray-800">
            <ul className="space-y-4">
              {extensionPrivacyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="mt-0.5 h-6 w-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3 text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Supported Platforms */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Supported Platforms
          </h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {extensionPlatforms.map((platform) => (
              <div
                key={platform.name}
                className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
              >
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {platform.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            {extensionFAQS.map((faq, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-20">
          <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-6 dark:bg-yellow-900/30">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Important Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              This extension is NOT affiliated with, endorsed by, or connected
              to Nepal Stock Exchange (NEPSE), Trading Management System (TMS),
              or Meroshare/CDSC. This is an independent, open-source tool
              created for educational purposes.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center">
          <div className="space-x-4">
            <Link
              href="/tmsextension/privacy"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/tmsextension/terms"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              Terms of Service
            </Link>
            <a
              href="https://github.com/surajrimal07/tms-captcha"
              className="text-primary-600 hover:underline dark:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
