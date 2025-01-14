// @ts-check
/** @type {import("pliny/config").PlinyConfig } */

const siteMetadata = {
  title: "Suraj's personal blog",
  author: 'Suraj Rimal',
  address: 'Kathmandu, Nepal',
  fullName: 'Suraj Rimal',
  headerTitle: 'Suraj',
  description:
    'My desire to practice my skills and share my acquired knowledge fuels my endeavors.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://surajrimal.dev',
  analyticsURL: 'https://us.umami.is/share/RTY7jNH0nlrkwCfJ/surajrimal.dev',
  siteRepo: 'https://github.com/surajrimal07/surajr.com.np',
  siteLogo: '/static/images/avatar.webp',
  image: '/static/images/avatar.webp',
  socialBanner: '/static/images/suraj-blog.webp',
  email: 'davidparkedme@gmail.com',
  github: 'https://github.com/surajrimal07',
  locale: 'en-US',
  timezone: 'GMT+5:45',
  stickyNav: true,
  socialAccounts: {
    phone: '+977-9840220290',
    twitter: 'https://twitter.com/0x100000',
    youtube: 'https://youtube.com',
    github: 'https://github.com/surajrimal07',
    facebook: 'fb.com/meettheflash',
    linkedin: 'https://www.linkedin.com/in/surajrimal/',
    instagram: 'https://www.instagram.com/weiggegg/',
    threads: 'https://www.threads.net/@weiggegg',
  },
  analytics: {
    umamiAnalytics: {
      // @ts-ignore
      umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_ID,
      googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    },
  },
  newsletter: {
    provider: 'convertkit',
  },
  keywords: [
    'Suraj Rimal',
    'AI chatbot',
    'Frontend Engineer',
    'portfolio',
    'interactive resume',
    'tech career',
    'web development',
    'personal AI',
    'developer insights',
    'career information',
    'project showcase',
    'professional background',
    'software engineering',
    'AI-powered portfolio',
    'personalized chat experience',
  ],
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
};

module.exports = siteMetadata;
