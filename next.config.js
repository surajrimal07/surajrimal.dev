/* eslint-disable @typescript-eslint/no-require-imports */
const { withContentlayer } = require('next-contentlayer2');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' us.umami.is analytics.umami.is va.vercel-scripts.com static.cloudflareinsights.com https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  worker-src 'self' blob:;
  img-src 'self' data: blob: https://wakapi.dev https://twitter.github.io https://*.r2.dev https://stats.surajrimal.dev https://www.gravatar.com;
  media-src 'self';
  connect-src * https://wakapi.dev;
  font-src 'self' data:;
  frame-src https://challenges.cloudflare.com
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const output = process.env.EXPORT ? 'export' : undefined;
const basePath = process.env.BASE_PATH || undefined;
const unoptimized = process.env.UNOPTIMIZED ? true : undefined;

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer];
  return plugins.reduce((acc, next) => next(acc), {
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    // compiler: {
    //   removeConsole: process.env.NODE_ENV === 'production'
    //     ? {
    //         exclude: ['error'],
    //       }
    //     : false,
    // },
    reactStrictMode: false,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    transpilePackages: ['lucide-react'],
    eslint: {
      dirs: [
        'app',
        'components',
        'lib',
        'layouts',
        'scripts',
        'types',
        'utils',
      ],
    },
    images: {
      dangerouslyAllowSVG: true,
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
        },
        {
          protocol: 'https',
          hostname: 'i.scdn.co',
        },
        {
          protocol: 'https',
          hostname: 'wakapi.dev',
        },
        {
          protocol: 'https',
          hostname: 'cdn.weatherapi.com',
        },
        {
          protocol: 'https',
          hostname: 'nfmcturislsuejmkigqk.supabase.co',
        },
        {
          protocol: 'https',
          hostname: 'cdn.simpleicons.org',
        },
        {
          protocol: 'https',
          hostname: 'gravatar.com',
        },
        {
          protocol: 'https',
          hostname: 'www.gravatar.com',
        },
        {
          protocol: 'https',
          hostname: 'stats.surajrimal.dev',
        },
      ],
      unoptimized,
    },
    output,
    basePath,
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: '/feed',
          destination: '/feed.xml',
        },
        {
          source: '/rss',
          destination: '/feed.xml',
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
        {
          source: '/public/:path*',
          headers: [
            ...securityHeaders,
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
  });
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'surajrimal',
  project: 'personalwebsite',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
