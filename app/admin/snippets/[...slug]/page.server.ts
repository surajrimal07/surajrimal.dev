import { allSnippets } from 'contentlayer/generated';

export const generateStaticParams = async () => {
  return allSnippets.map((p) => ({
    slug: p.slug.split('/').map((name) => decodeURI(name)),
  }));
};
