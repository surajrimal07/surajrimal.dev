import '@/css/about.css';
import '@/css/prism.css';
import '@/css/resume.css';
import '@/css/tailwind.css';
import '@/css/twemoji.css';
import 'katex/dist/katex.css';
import '@/css/extra.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Space_Grotesk } from 'next/font/google';

import SectionContainer from '@/components/SectionContainer';
import siteMetadata from '@/data/siteMetadata';
import { Metadata } from 'next';
import { Analytics, AnalyticsConfig } from 'pliny/analytics';
import { SearchConfig, SearchProvider } from 'pliny/search';
import { ThemeProviders } from './theme-providers';

import NextTopLoader from 'nextjs-toploader';

const space_grotesk = Space_Grotesk({
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || '';

  return (
    <html lang={siteMetadata.language} className={`${space_grotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href={`${basePath}/static/favicons/apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/static/favicons/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/static/favicons/favicon-16x16.png`} />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />

      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />

      <body className="relative pl-[calc(100vw-100%)] bg-white text-black antialiased dark:bg-dark dark:text-white">
        <NextTopLoader color="#DC2626" height={2} />
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
              <main className="mb-0 ">{children}</main>
              <Footer />
            </SearchProvider>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  );
}
