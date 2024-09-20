import IconsBundle from '@/components/social-icons';
import siteMetadata from '@/data/siteMetadata';

import BuildWith from './BuildWith';
import Link from './Link';
import PageView from './homepage/PageView';

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <IconsBundle kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <IconsBundle kind="github" href={siteMetadata.github} size={6} />
          <IconsBundle kind="facebook" href={siteMetadata.socialAccounts.facebook} size={6} />
          <IconsBundle kind="youtube" href={siteMetadata.socialAccounts.youtube} size={6} />
          <IconsBundle kind="linkedin" href={siteMetadata.socialAccounts.linkedin} size={6} />
          <IconsBundle kind="x" href={siteMetadata.socialAccounts.twitter} size={5} />
          <IconsBundle kind="instagram" href={siteMetadata.socialAccounts.instagram} size={6} />
          <IconsBundle kind="threads" href={siteMetadata.socialAccounts.threads} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
          <div>{` • `}</div>
          <PageView />
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <BuildWith />
        </div>
      </div>
    </footer>
  );
}
