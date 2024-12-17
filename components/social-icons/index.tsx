import Image from 'next/image';
import { memo } from 'react';

import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillSpotify,
  AiFillYoutube,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { BiLogoTypescript } from 'react-icons/bi';
import { BsSearchHeartFill } from 'react-icons/bs';
import { FaAws, FaJenkins, FaPython, FaReact } from 'react-icons/fa';
import { FaCss3Alt, FaGitAlt, FaGithub, FaLinux } from 'react-icons/fa6';
import { FiFramer } from 'react-icons/fi';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { GrMysql } from 'react-icons/gr';
import { IoIosMail, IoLogoJavascript } from 'react-icons/io';
import { LiaDocker, LiaNodeJs } from 'react-icons/lia';
import {
  LuCandy,
  LuExternalLink,
  LuGitFork,
  LuLayoutDashboard,
  LuLogOut,
  LuPizza,
  LuSearch,
  LuSettings,
  LuStar,
} from 'react-icons/lu';
import { MdAdminPanelSettings } from 'react-icons/md';
import {
  RiMastodonFill,
  RiNextjsLine,
  RiNotionFill,
  RiOpenaiFill,
  RiSupabaseFill,
  RiTailwindCssFill,
  RiThreadsFill,
  RiToolsFill,
  RiTwitterXFill,
} from 'react-icons/ri';
import { RxVercelLogo } from 'react-icons/rx';
import {
  SiAnaconda,
  SiBuymeacoffee,
  SiDatadog,
  SiDuplicati,
  SiFastapi,
  SiFlask,
  SiGithubactions,
  SiGrafana,
  SiHuggingface,
  SiJira,
  SiJupyter,
  SiLangchain,
  SiMeilisearch,
  SiN8N,
  SiNginx,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiRedis,
  SiSanity,
  SiScikitlearn,
  SiSelenium,
  SiShadcnui,
  SiStreamlit,
  SiTableau,
} from 'react-icons/si';
import { TbBrandMongodb, TbBrandStripe, TbBrandVite } from 'react-icons/tb';
import { VscTerminalPowershell } from 'react-icons/vsc';
import {
  VscAzureDevops,
  VscTerminalBash,
  VscVscodeInsiders,
} from 'react-icons/vsc';

import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const iconMap = {
  candy: LuCandy,
  buymeacoffee: SiBuymeacoffee,
  numpy: SiNumpy,
  pandas: SiPandas,
  duplicati: SiDuplicati,
  anaconda: SiAnaconda,
  scikitlearn: SiScikitlearn,

  bash: VscTerminalBash,
  linux: FaLinux,
  postman: SiPostman,
  datadog: SiDatadog,
  vercel: RxVercelLogo,
  jira: SiJira,
  grafana: SiGrafana,
  selenium: SiSelenium,
  nginx: SiNginx,
  jenkins: FaJenkins,
  githubactions: SiGithubactions,
  notion: RiNotionFill,
  tableau: SiTableau,
  streamlit: SiStreamlit,
  huggingface: SiHuggingface,
  n8n: SiN8N,
  aws: FaAws,
  git: FaGitAlt,
  github: FaGithub,
  jupyter: SiJupyter,
  plotly: SiPlotly,
  agent: GiArtificialIntelligence,
  pizza: LuPizza,
  stripe: TbBrandStripe,
  meilisearch: SiMeilisearch,
  framer: FiFramer,
  dashboard: LuLayoutDashboard,
  sanity: SiSanity,
  vite: TbBrandVite,
  flask: SiFlask,
  mongodb: TbBrandMongodb,
  mysql: GrMysql,
  logout: LuLogOut,
  admin: MdAdminPanelSettings,
  settings: LuSettings,
  nodejs: LiaNodeJs,
  prisma: SiPrisma,
  tools: RiToolsFill,
  shadcnui: SiShadcnui,
  css3: FaCss3Alt,
  mail: IoIosMail,
  spotify: AiFillSpotify,
  typescript: BiLogoTypescript,
  fastapi: SiFastapi,
  postgresql: SiPostgresql,
  javascript: IoLogoJavascript,
  langchain: SiLangchain,
  redis: SiRedis,
  facebook: AiFillFacebook,

  python: FaPython,
  react: FaReact,
  nextjs: RiNextjsLine,
  youtube: AiFillYoutube,
  supabase: RiSupabaseFill,
  linkedin: AiFillLinkedin,
  twitter: AiOutlineTwitter,
  tailwindcss: RiTailwindCssFill,
  x: RiTwitterXFill,
  mastodon: RiMastodonFill,
  threads: RiThreadsFill,
  docker: LiaDocker,
  instagram: AiFillInstagram,
  githubFork: LuGitFork,
  githubStar: LuStar,
  externalLink: LuExternalLink,
  openai: RiOpenaiFill,
  search: LuSearch,
  searchHeart: BsSearchHeartFill,
  vscode: VscVscodeInsiders,
  azuredevops: VscAzureDevops,
  powershell: VscTerminalPowershell,
} as const;

export type IconName = keyof typeof iconMap;

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

const LocalIcon = memo(function LocalIcon({
  iconName,
  className,
  strokeWidth,
}: {
  iconName: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const IconComponent = iconMap[iconName];
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
  const isLocalIcon = kind in iconMap;

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
