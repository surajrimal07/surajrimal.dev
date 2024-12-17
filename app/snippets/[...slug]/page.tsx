import { notFound } from 'next/navigation';

import {
  type Authors,
  type Snippets,
  allAuthors,
  allSnippets,
} from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import {
  allCoreContent,
  coreContent,
  sortPosts,
} from 'pliny/utils/contentlayer';

import { components } from '@/components/mdx/MDXComponents';
import PostLayout from '@/layouts/PostSimple';

export const generateStaticParams = async () => {
  return allSnippets.map((p) => ({
    slug: p.slug.split('/').map((name) => decodeURI(name)),
  }));
};

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slug = decodeURI(params.slug.join('/'));
  const sortedCoreContents = allCoreContent(sortPosts(allSnippets));

  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[postIndex + 1];
  const next = sortedCoreContents[postIndex - 1];

  const post = allSnippets.find((p) => p.slug === slug) as Snippets;
  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });

  const mainContent = coreContent(post);

  return (
    <PostLayout
      authorDetails={authorDetails}
      content={mainContent}
      next={next}
      prev={prev}
    >
      <MDXLayoutRenderer code={post.body.code} components={components} />
    </PostLayout>
  );
}
