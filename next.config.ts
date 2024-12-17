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
  img-src 'self' data: blob: https://wakapi.dev https://twitter.github.io https://*.r2.dev https://*.supabase.co https://stats.surajrimal.dev https://www.gravatar.com https://seccdn.libravatar.org https://cdn.surajrimal.dev https://cdn.jsdelivr.net;
  media-src 'self';
  connect-src * https://wakapi.dev;
  font-src 'self' data:;
  object-src 'self' data:;
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
    experimental: {
      staleTimes: {
        dynamic: 30,
        static: 180,
      },
      // turbo: {
      //   rules: {
      //     '*.svg': {
      //       loaders: ['@svgr/webpack'],
      //       as: '*.js',
      //     },
      //   },
      // },
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
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
          hostname: 'avatars.githubusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
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
        {
          protocol: 'https',
          hostname: 'cdn.surajrimal.dev',
        },
      ],
      unoptimized,
    },
    output,
    basePath,
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
