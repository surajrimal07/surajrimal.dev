import siteMetadata from '@/data/siteMetadata';

import { TfiArrowTopRight } from 'react-icons/tfi';
import Link from './Link';
import IconsBundle from './social-icons';

const BuildWith = () => (
  <div className="flex items-center space-x-1">
    <span className="mr-1 text-gray-500 dark:text-gray-300">Build with</span>

    <div className="flex space-x-1.5">
      <IconsBundle kind="nextjs" href="https://nextjs.org?ref=surajr.com.np" size={6} className="h-5 w-5" />

      <IconsBundle kind="tailwind" href="https://tailwindcss.com?ref=surajr.com.np" size={6} className="h-5 w-5" />
      <IconsBundle kind="x" href={siteMetadata.x} size={6} />
      <IconsBundle kind="typescript" href="https://www.typescriptlang.org?ref=surajr.com.np" size={4} />

      <IconsBundle kind="umami" href="https://umami.is?ref=surajr.com.np" size={6} className="h-5 w-5" />
      <IconsBundle kind="supabase" href="https://supabase.com?ref=surajr.com.np" size={6} className="h-5 w-5" />
      <IconsBundle kind="postgres" href="https://www.postgresql.org?ref=surajr.com.np" size={6} className="h-5 w-5" />
    </div>
    <span className="px-1 text-gray-400 dark:text-gray-500">-</span>
    <Link href={siteMetadata.siteRepo} className="text-gray-500 underline underline-offset-4 dark:text-gray-300">
      <span data-umami-event="view-source" className="flex items-center">
        View source
        <TfiArrowTopRight size={12} />
      </span>
    </Link>
  </div>
);

export default BuildWith;
