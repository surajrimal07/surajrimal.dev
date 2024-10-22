import Image from 'next/image';
import { memo } from 'react';

import { IconType } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import * as LuIcons from 'react-icons/lu';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as VscIcons from 'react-icons/vsc';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import Link from '../Link';

const iconLibraries = {
  ai: AiIcons,
  bs: BsIcons,
  io: IoIcons,
  lu: LuIcons,
  md: MdIcons,
  ri: RiIcons,
  si: SiIcons,
  vsc: VscIcons,
} as const;

const iconConfig = {
  candy: ['lu', 'LuCandy'] as const,
  buymeacoffee: ['si', 'SiBuymeacoffee'] as const,
  pizza: ['lu', 'LuPizza'] as const,
  dashboard: ['lu', 'LuLayoutDashboard'] as const,
  logout: ['lu', 'LuLogOut'] as const,
  admin: ['md', 'MdAdminPanelSettings'] as const,
  settings: ['lu', 'LuSettings'] as const,
  tools: ['ri', 'RiToolsFill'] as const,
  mail: ['io', 'IoIosMail'] as const,
  spotify: ['ai', 'AiFillSpotify'] as const,
  github: ['ai', 'AiFillGithub'] as const,
  facebook: ['ai', 'AiFillFacebook'] as const,
  youtube: ['ai', 'AiFillYoutube'] as const,
  supabase: ['ri', 'RiSupabaseFill'] as const,
  linkedin: ['ai', 'AiFillLinkedin'] as const,
  twitter: ['ai', 'AiOutlineTwitter'] as const,
  x: ['ri', 'RiTwitterXFill'] as const,
  mastodon: ['ri', 'RiMastodonFill'] as const,
  threads: ['ri', 'RiThreadsFill'] as const,
  instagram: ['ai', 'AiFillInstagram'] as const,
  githubFork: ['lu', 'LuGitFork'] as const,
  githubStar: ['lu', 'LuStar'] as const,
  externalLink: ['lu', 'LuExternalLink'] as const,
  openai: ['ri', 'RiOpenaiFill'] as const,
  search: ['lu', 'LuSearch'] as const,
  searchHeart: ['bs', 'BsSearchHeartFill'] as const,
  vscode: ['vsc', 'VscVscodeInsiders'] as const,
  azuredevops: ['si', 'SiMicrosoftazure'] as const,
  powershell: ['si', 'SiPowershell'] as const,
} as const;

type IconName = keyof typeof iconConfig;

interface IconsBundleProps {
  kind: IconName | string;
  href?: string;
  size?: number;
  hover?: boolean;
  iconType?: 'linkButton' | 'link' | 'icon' | 'Link' | 'LinkButton';
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
  className?: string;
  parentClassName?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  text?: string;
  strokeWidth?: number;
  iconColor?: string;
}

interface CdnIconProps {
  kind: string;
  size: number;
  iconColor?: string;
  className?: string;
}

const CdnIcon = memo(function CdnIcon({
  kind,
  size,
  iconColor,
  className,
}: CdnIconProps) {
  const cdnUrl = `https://cdn.simpleicons.org/${kind}${iconColor ? `/${iconColor}` : ''}?viewbox=auto`;

  return (
    <Image
      src={cdnUrl}
      alt={`${kind} icon`}
      width={size * 4}
      height={size * 4}
      className={className}
      loading="lazy"
    />
  );
});

// LocalIcon component
const LocalIcon = memo(function LocalIcon({
  iconName,
  className,
  strokeWidth,
}: {
  iconName: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const [libraryKey, iconKey] = iconConfig[iconName];
  const IconComponent = iconLibraries[libraryKey][
    iconKey as keyof (typeof iconLibraries)[typeof libraryKey]
  ] as IconType;

  return <IconComponent className={className} strokeWidth={strokeWidth} />;
});

const IconsBundle = memo(function IconsBundle({
  kind,
  href,
  size = 8,
  iconType = 'link',
  variant = 'outline',
  className,
  parentClassName,
  hover = true,
  target,
  text,
  strokeWidth,
  iconColor,
}: IconsBundleProps) {
  const isLocalIcon = kind in iconConfig;

  const combinedClass = cn(text && 'mr-2', `h-${size} w-${size}`, className);

  const combinedParentClass = cn(
    'flex items-center justify-center transition-transform duration-200',
    hover && 'hover:scale-150',
    parentClassName
  );

  const IconElement = isLocalIcon ? (
    <LocalIcon
      iconName={kind as IconName}
      className={combinedClass}
      strokeWidth={strokeWidth}
    />
  ) : (
    <CdnIcon
      kind={kind.toString()}
      size={size}
      iconColor={iconColor}
      className={combinedClass}
    />
  );

  const linkProps = {
    target,
    rel: target === '_blank' ? 'noopener noreferrer' : undefined,
    href,
  } as const;

  if (iconType === 'LinkButton' && href) {
    return (
      <Button
        variant={variant}
        size={text ? 'default' : 'icon'}
        className={combinedParentClass}
        asChild
      >
        <Link href={href} target={target}>
          <span className="sr-only">{kind}</span>
          {IconElement}
          {text}
        </Link>
      </Button>
    );
  }

  if (iconType === 'Link' && href) {
    return (
      <Link href={href} className={combinedParentClass} target={target}>
        <span className="sr-only">{kind}</span>
        {IconElement}
        {text}
      </Link>
    );
  }

  if (iconType === 'icon') {
    return IconElement;
  }

  if (iconType === 'linkButton' && href) {
    return (
      <Button
        variant={variant}
        size={text ? 'default' : 'icon'}
        className={parentClassName}
        asChild
      >
        <a
          className={cn('text-sm transition', combinedParentClass)}
          {...linkProps}
        >
          <span className="sr-only">{kind}</span>
          {IconElement}
          {text}
        </a>
      </Button>
    );
  }

  return href ? (
    <a className={cn('text-sm transition', combinedParentClass)} {...linkProps}>
      <span className="sr-only">{kind}</span>
      {IconElement}
      {text}
    </a>
  ) : (
    <div className={combinedParentClass}>
      <span className="sr-only">{kind}</span>
      {IconElement}
      {text}
    </div>
  );
});

export default IconsBundle;
