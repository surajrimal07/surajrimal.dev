import BuildWith from '@/components/BuildWith';
import PageView from '@/components/homepage/PageView';
import IconsBundle from '@/components/social-icons';
import siteMetadata from '@/data/siteMetadata';

import VisitorCounter from './Visitor';

export default function Footer() {
  return (
    <footer>
      <div className="mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <IconsBundle
            href={`mailto:${siteMetadata.email}`}
            kind="mail"
            size={6}
          />
          <IconsBundle href={siteMetadata.github} kind="github" size={6} />
          <IconsBundle
            href={siteMetadata.socialAccounts.facebook}
            kind="facebook"
            size={6}
          />
          <IconsBundle
            href={siteMetadata.socialAccounts.youtube}
            kind="youtube"
            size={6}
          />
          <IconsBundle
            href={siteMetadata.socialAccounts.linkedin}
            kind="linkedin"
            size={6}
          />
          <IconsBundle
            href={siteMetadata.socialAccounts.twitter}
            kind="x"
            size={5}
          />
          <IconsBundle
            href={siteMetadata.socialAccounts.instagram}
            kind="instagram"
            size={6}
          />
          <IconsBundle
            href={siteMetadata.socialAccounts.threads}
            kind="threads"
            size={6}
          />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{' • '}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{' • '}</div>
          <VisitorCounter />
          <div>{' • '}</div>
          <PageView shouldIncrement={true} />
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <BuildWith />
        </div>
      </div>
    </footer>
  );
}
