import { allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';

import { components } from '@/components/mdx/MDXComponents';
import UsesLayout from '@/layouts/UsesLayout';

export const metadata = {
  title: 'Uses - Dale Larroder',
  description: 'What I Use - Dale Larroder',
};

export default function Uses() {
  const author = allAuthors.find((p) => p.slug === 'usage');

  if (!author) {
    return null;
  }

  return (
    <UsesLayout>
      <MDXLayoutRenderer
        content={author}
        code={author.body.code}
        components={components}
      />
    </UsesLayout>
  );
}
