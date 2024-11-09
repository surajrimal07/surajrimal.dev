export const extensionFeatures = [
  {
    icon: '🔄',
    title: 'CAPTCHA Automation',
    description:
      'Automatically solves CAPTCHA on TMS portals, saving time and reducing login friction.',
  },
  {
    icon: '🔐',
    title: 'Secure Auto-fill',
    description:
      'Safely stores and auto-fills login credentials for TMS and Meroshare portals.',
  },
  {
    icon: '👥',
    title: 'Multiple Accounts',
    description:
      'Manage multiple TMS and Meroshare accounts with easy switching between them.',
  },
  {
    icon: '🎯',
    title: 'Primary Account',
    description:
      'Set primary accounts per broker for faster access to your main trading accounts.',
  },
  {
    icon: '💾',
    title: 'Local Storage',
    description:
      'All data stored securely on your device with no external transmission.',
  },
  {
    icon: '🔄',
    title: 'Backup & Restore',
    description:
      'Easy backup and restore functionality for your account configurations.',
  },
];

export const extensionPrivacyFeatures = [
  "All credentials stored locally using Chrome's secure storage API",
  'No data transmission to external servers',
  'Open-source code for complete transparency',
  'Optional anonymous usage analytics',
  'No tracking or personal data collection',
  'Complete user control over data',
];

export const extensionPlatforms = [
  {
    name: 'TMS Portals',
    description: 'Works on all broker TMS portals (*.nepsetms.com.np)',
  },
  {
    name: 'Meroshare Portal',
    description: 'Supports Meroshare platform (meroshare.cdsc.com.np)',
  },
];

export const extensionFAQS = [
  {
    question: 'Is my data secure?',
    answer:
      "Yes! All your credentials are stored locally on your device using Chrome's secure storage API. No data is ever transmitted to external servers.",
  },
  {
    question: 'Does it work on all websites?',
    answer:
      'No, the extension only works on official TMS portals and the Meroshare website to ensure security and proper functionality.',
  },
  {
    question: 'Is it free to use?',
    answer:
      'Yes, the extension is completely free and open-source. You can review the code on GitHub.',
  },
  {
    question: 'How does it handle multiple accounts?',
    answer:
      'You can add multiple accounts and set primary accounts per broker for TMS and one primary account for Meroshare for quick access.',
  },
];
