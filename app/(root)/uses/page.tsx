import { allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';

import { components } from '@/components/mdx/MDXComponents';
import siteMetadata from '@/data/siteMetadata';
import UsesLayout from '@/layouts/UsesLayout';

export const metadata = {
  title: `Uses - ${siteMetadata.author}`,
  description: `What I Use - ${siteMetadata.author}`,
};

export default function Uses() {
  const author = allAuthors.find((p) => p.slug === 'usage');

  if (!author) {
    return null;
  }

  return (
    <UsesLayout>
      <MDXLayoutRenderer
        code={author.body.code}
        components={components}
        content={author}
      />
    </UsesLayout>
  );
}
