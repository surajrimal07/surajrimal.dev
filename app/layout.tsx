import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Space_Grotesk } from 'next/font/google';

import 'katex/dist/katex.css';
import NextTopLoader from 'nextjs-toploader';
import { Analytics, type AnalyticsConfig } from 'pliny/analytics';
import 'pliny/search/algolia.css';
import { Toaster } from 'react-hot-toast';
import 'remark-github-blockquote-alert/alert.css';

import { ThemeProviders } from '@/app/theme-providers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { PathProvider } from '@/components/PathProvider';
import { SearchProvider } from '@/components/SearchProvider';
import SectionContainer from '@/components/SectionContainer';
import '@/css/about.css';
import '@/css/extra.css';
import '@/css/prism.css';
import '@/css/resume.css';
import '@/css/tailwind.css';
import siteMetadata from '@/data/siteMetadata';

const Chatbox = dynamic(() => import('@/components/ChatBox'));

const CookieConsent = dynamic(() => import('@/components/CookieConsent'));

const ConsoleLabrador = dynamic(
  () => import('@/components/homepage/ConsoleLabrador')
);

const VercelAnalytics = dynamic(() => import('@/components/VercelAnalytics'));

export const fetchCache = 'default-cache';
//export const dynamic = 'auto';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const basePath = process.env.BASE_PATH || '';

  return (
    <html
      lang={siteMetadata.language}
      className={`${spaceGrotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link
        rel="manifest"
        href={`${basePath}/static/favicons/site.webmanifest`}
      />

      <meta name="msapplication-TileColor" content="#da532c" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#ffffff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#ffffff"
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${basePath}/feed.xml`}
      />

      <body className="pl-[calc(100vw-100%)] antialiased">
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#00000009_1px,transparent_1px)] [background-size:20px_20px] dark:bg-black dark:bg-[radial-gradient(#ffffff09_1px,transparent_1px)]">
          <div className="absolute inset-0 bg-white/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black/50" />
        </div>
        <ConsoleLabrador />
        <NextTopLoader color="#ef4444" height={1} showSpinner={false} />

        <Toaster position="top-right" reverseOrder={false} />
        <ThemeProviders>
          <PathProvider>
            <VercelAnalytics />
            <Analytics
              analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
            />

            <SectionContainer>
              <SearchProvider>
                <Header />
                <main className="mb-auto">{children}</main>
                <Footer />
              </SearchProvider>
              <Chatbox />
              <CookieConsent />
            </SectionContainer>
          </PathProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
