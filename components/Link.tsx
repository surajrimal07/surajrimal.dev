import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

const CustomLink = ({
  href,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href?.startsWith('/');
  const isAnchorLink = href?.startsWith('#');

  if (isInternalLink) {
    return (
      <Link className="break-words" prefetch={true} href={href} {...rest} />
    );
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />;
  }

  return (
    <a
      className="special-underline-new break-words"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
    />
  );
};

export default CustomLink;
