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

const ChatBoxWrapper = dynamic(
  () => import('@/components/chatbox/chat-box-wrapper'),
);

const CookieConsent = dynamic(() => import('@/components/CookieConsent'));

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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteMetadata.title,
  },
  keywords: siteMetadata.keywords,
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
    card: 'summary',
    images: [siteMetadata.socialBanner],
    description: siteMetadata.description,
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
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} scroll-smooth dark`}
      lang={siteMetadata.language}
    >
      <link
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href={`${basePath}/static/favicons/favicon-32x32.png`}
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href={`${basePath}/static/favicons/favicon-16x16.png`}
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link
        href={`${basePath}/static/favicons/site.webmanifest`}
        rel="manifest"
      />

      <meta content="#da532c" name="msapplication-TileColor" />
      <meta
        content="#ffffff"
        media="(prefers-color-scheme: light)"
        name="theme-color"
      />
      <meta
        content="#ffffff"
        media="(prefers-color-scheme: dark)"
        name="theme-color"
      />
      <link
        href={`${basePath}/feed.xml`}
        rel="alternate"
        type="application/rss+xml"
      />

      <body className="pl-[calc(100vw-100%)] antialiased">
        <ThemeProviders>
          <div className="fixed inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#ffffff09_1px,transparent_1px)] [background-size:20px_20px] light:bg-white light:bg-[radial-gradient(#00000009_1px,transparent_1px)]">
            <div className="absolute inset-0 bg-black/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] light:bg-white/50" />
          </div>

          <NextTopLoader color="#ef4444" height={1} showSpinner={false} />

          <Toaster position="top-right" reverseOrder={false} />

          <PathProvider>
            <Analytics
              analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
            />

            <SectionContainer>
              <SearchProvider>
                <Header />
                <main className="mb-auto">{children}</main>
                <Footer />
              </SearchProvider>
              <ChatBoxWrapper />
              <CookieConsent />
            </SectionContainer>
          </PathProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
