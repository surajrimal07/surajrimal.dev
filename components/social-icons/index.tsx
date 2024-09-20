import {
  AWS,
  Anaconda,
  Arduino,
  Azure,
  AzureDevOps,
  // Pinecone,
  Bash,
  BootStrap,
  CLang,
  CSS,
  Celery,
  DBeaver,
  DataDog,
  Django,
  Docker,
  FastAPI,
  Fiber,
  Flask,
  FramerMotion,
  Git,
  GithubActions,
  GoLang,
  Gradio,
  Grafana,
  GraphQL,
  HTML,
  HuggingFace,
  JSON,
  JavaScript,
  Jira,
  Jupyter,
  Kaggle,
  Kub,
  LangChain,
  Linux,
  Locust,
  Markdown,
  Matplotlib,
  MeiliSearch,
  Mistral,
  Mongodb,
  MySQL,
  NGINX,
  NextJs,
  Node,
  NodeJS,
  NodeJs,
  Notion,
  Numpy,
  Opensource,
  PNPM,
  Pandas,
  Pinecone,
  PlayWright,
  Plotly,
  Poetry,
  Postgres,
  Postman,
  PowerBi,
  Powershell,
  Prisma,
  PyTorch,
  Pytest,
  Python,
  RabbitMQ,
  React,
  Redis,
  Rust,
  Sanity,
  SciKitLearn,
  Seaborn,
  Selenium,
  ShadCn,
  Streamlit,
  Stripe,
  Svelte,
  SvelteKit,
  Swagger,
  Tableau,
  Tailwind,
  TestRail,
  ThreeJS,
  TypeScript,
  Umami,
  VLLM,
  Vercel,
  Vite,
  VsCode,
  Windows,
  Yaml,
  Yarn,
} from './icons';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillSpotify,
  AiFillYoutube,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { RiSupabaseFill } from "react-icons/ri";
import { BsSearchHeartFill } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
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
import { RiMastodonFill, RiOpenaiFill, RiThreadsFill, RiToolsFill, RiTwitterXFill } from 'react-icons/ri';
import { SiBuymeacoffee } from 'react-icons/si';

const components = {
  candy: LuCandy,
  buymeacoffee: SiBuymeacoffee,
  pizza: LuPizza,
  dashboard: LuLayoutDashboard,
  logout: LuLogOut,
  admin: MdAdminPanelSettings,
  settings: LuSettings,
  tools: RiToolsFill,
  mail: IoIosMail,
  spotify: AiFillSpotify,
  github: AiFillGithub,
  facebook: AiFillFacebook,
  youtube: AiFillYoutube,
  supabase:RiSupabaseFill,
  linkedin: AiFillLinkedin,
  twitter: AiOutlineTwitter,
  x: RiTwitterXFill,
  mastodon: RiMastodonFill,
  threads: RiThreadsFill,
  instagram: AiFillInstagram,
  githubFork: LuGitFork,
  githubStar: LuStar,
  externalLink: LuExternalLink,
  openai: RiOpenaiFill,
  search: LuSearch,
  searchHeart: BsSearchHeartFill,
  nextjs: NextJs,
  tailwind: Tailwind,
  typescript: TypeScript,
  shadcn: ShadCn,
  umami: Umami,
  mongodb: Mongodb,
  markdown: Markdown,
  prisma: Prisma,
  pinecone: Pinecone,
  bash: Bash,
  django: Django,
  linux: Linux,
  docker: Docker,
  vscode: VsCode,
  azure: Azure,
  arduino: Arduino,
  azuredevops: AzureDevOps,
  clang: CLang,
  css: CSS,
  dbeaver: DBeaver,
  fastapi: FastAPI,
  flask: Flask,
  golang: GoLang,
  graphql: GraphQL,
  html: HTML,
  javascript: JavaScript,
  json: JSON,
  jira: Jira,
  kaggle: Kaggle,
  kub: Kub,
  nginx: NGINX,
  nodejs: NodeJs,
  notion: Notion,
  pandas: Pandas,
  plotly: Plotly,
  playwright: PlayWright,
  powershell: Powershell,
  postgres: Postgres,
  pytest: Pytest,
  python: Python,
  react: React,
  redis: Redis,
  selenium: Selenium,
  streamlit: Streamlit,
  svelte: Svelte,
  swagger: Swagger,
  vercel: Vercel,
  vite: Vite,
  windows: Windows,
  yarn: Yarn,
  yaml: Yaml,
  aws: AWS,
  anaconda: Anaconda,
  git: Git,
  pytorch: PyTorch,
  bootstrap: BootStrap,
  postman: Postman,
  sanity: Sanity,
  sveltekit: SvelteKit,
  numpy: Numpy,
  matplotlib: Matplotlib,
  jupyter: Jupyter,
  scikitlearn: SciKitLearn,
  grafana: Grafana,
  gradio: Gradio,
  celery: Celery,
  testrail: TestRail,
  langchain: LangChain,
  seaborn: Seaborn,
  powerbi: PowerBi,
  datadog: DataDog,
  huggingface: HuggingFace,
  rust: Rust,
  threejs: ThreeJS,
  node: Node,
  poetry: Poetry,
  mysql: MySQL,
  pnpm: PNPM,
  githubactions: GithubActions,
  framermotion: FramerMotion,
  rabbitmq: RabbitMQ,
  tableau: Tableau,
  meilisearch: MeiliSearch,
  mistral: Mistral,
  opensource: Opensource,
  locust: Locust,
  vllm: VLLM,
  fiber: Fiber,
  stripe: Stripe,
  Nodejs: NodeJS,
};

type IconsBundleProps = {
  kind: keyof typeof components | string;
  href?: string | undefined;
  size?: number;
  hover?: boolean;
  iconType?: 'linkButton' | 'link' | 'icon' | 'Link' | 'LinkButton';
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  className?: string;
  parentClassName?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  text?: string;
  strokeWidth?: number;
};

const IconsBundle = ({
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
}: IconsBundleProps) => {
  const SocialSvg = components[kind];

  // check if kind already exists in the components object
  if (kind in components === false) {
    return null;
  }

  //not sure why this was added
  // if ((iconType === 'link' || iconType === 'icon' || iconType === 'LinkButton') && !href) {
  //   return null;
  // }

  // if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
  //   return (
  //     <SocialSvg
  //       className={`${hover ? 'hover:text-red-500 dark:hover:text-red-400' : ''} h-${size} w-${size}`}
  //     />
  //   )
  // convert tailwind size to px

  const combinedClass = cn(`${text ? 'mr-2' : ''}  h-${size} w-${size}`, className);

  const combinedParentClass = cn(
    'flex items-center justify-center transition-transform duration-200',
    `${hover ? 'hover:scale-150' : ''}`,
    parentClassName
  );

  if (iconType === 'LinkButton' && href) {
    return (
      <Button variant={variant} size={!text ? 'icon' : 'default'} className={combinedParentClass} asChild>
        <Link href={href} target={target}>
          <span className="sr-only">{kind}</span>
          <SocialSvg className={combinedClass} strokeWidth={strokeWidth} />
          {text}
        </Link>
      </Button>
    );
  }
  if (iconType === 'Link' && href) {
    return (
      <Link href={href} className={combinedParentClass} target={target}>
        <span className="sr-only">{kind}</span>
        <SocialSvg className={combinedClass} strokeWidth={strokeWidth} />
        {text}
      </Link>
    );
  }

  if (iconType === 'icon') {
    return <SocialSvg className={cn(`h-${size} w-${size}`, className)} strokeWidth={strokeWidth} />
  }

  if (iconType === 'linkButton' && href) {
    return (
      <Button variant={variant} size={!text ? 'icon' : 'default'} className={parentClassName} asChild>
        <a
          className={cn('text-sm transition', combinedParentClass)}
          target={'_blank'}
          rel="noopener noreferrer"
          href={href}
        >
          <span className="sr-only">{kind}</span>
          <SocialSvg className={combinedClass} strokeWidth={strokeWidth} />
          {text}
        </a>
      </Button>
    );
  }

  return (
    <>
      <a
        className={cn('text-sm transition', combinedParentClass)}
        target={'_blank'}
        rel="noopener noreferrer"
        href={href}
      >
        <span className="sr-only">{kind}</span>
        <SocialSvg className={combinedClass} strokeWidth={strokeWidth} />
        {text}
      </a>
    </>
  );
};

export default IconsBundle;
