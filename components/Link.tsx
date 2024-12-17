/* eslint-disable jsx-a11y/anchor-has-content */
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
    return <Link className="break-words" href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />;
  }

  return (
    <a
      className="special-underline-new break-words"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    />
  );
};

export default CustomLink;
