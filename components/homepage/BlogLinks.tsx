import Link from '@/components/Link';
import Twemoji from '@/components/Twemoji';
import { HomepageLinks } from '@/data/homepageLinks';
import { HomepageLink } from '@/types/components';

const BlogLinks = () => {
  const renderItem = (item: HomepageLink, index: number) => {
    const content = (
      <>
        <Twemoji name={item.emoji} size={'sm'} />
        <span data-umami-event={item.event} className="ml-1.5">
          {item.label}
        </span>
      </>
    );

    return item.href ? (
      <Link key={index} href={item.href} className="hover:underline">
        {content}
      </Link>
    ) : (
      <div key={index} className="flex items-center">
        {content}
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div className="mb-2 flex flex-col space-y-1.5 sm:mb-0">
        {HomepageLinks.slice(0, 3).map(renderItem)}
      </div>
      <div className="flex flex-col space-y-1.5">
        {HomepageLinks.slice(3).map(renderItem)}
      </div>
    </div>
  );
};

export default BlogLinks;
