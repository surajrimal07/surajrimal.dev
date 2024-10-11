import Link from '@/components/Link';
import Twemoji from '@/components/Twemoji';

const BlogLinks = () => {
  const links = [
    {
      href: '/blog',
      emoji: 'writing-hand',
      label: 'My writings',
      event: 'home-link-blog',
    },
    {
      href: '/projects',
      emoji: 'hammer-and-wrench',
      label: 'What have I built?',
      event: 'home-link-projects',
    },
    {
      href: '/about',
      emoji: 'face-with-monocle',
      label: 'More about me and myself',
      event: 'home-link-about',
    },
    {
      href: '/resume',
      emoji: 'briefcase',
      label: 'My career',
      event: 'home-link-resume',
    },
  ];

  return (
    <div className="flex justify-between">
      <div className="flex flex-col space-y-1.5">
        {links.slice(0, 2).map((link, index) => (
          <Link key={index} href={link.href} className="hover:underline">
            <Twemoji emoji={link.emoji} />
            <span data-umami-event={link.event} className="ml-1.5">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex flex-col space-y-1.5">
        {links.slice(2).map((link, index) => (
          <Link key={index} href={link.href} className="hover:underline">
            <Twemoji emoji={link.emoji} />
            <span data-umami-event={link.event} className="ml-1.5">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogLinks;
