import { genPageMetadata } from 'app/seo';
import { allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';

import SectionContainer from '@/components/SectionContainer';
import { components } from '@/components/mdx/MDXComponents';
import ResumeLayout from '@/layouts/ResumeLayout';
import type { TOC } from '@/types/toc';

export const metadata = genPageMetadata({ title: 'About' });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'resume');

  // Convert resume.toc from string to TOC[]
  const resumeTOC: TOC[] = Array.isArray(author?.toc)
    ? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      author.toc.map((item: any) => ({
        value: item.value,
        depth: item.depth,
        url: item.url,
        data: item.data || { hProperties: { id: item.url.slice(1) } },
        children: item.children || [],
      }))
    : [];

  return (
    <>
      <SectionContainer>
        {author ? (
          <ResumeLayout toc={resumeTOC}>
            <MDXLayoutRenderer
              code={author.body.code}
              components={components}
              toc={resumeTOC}
            />
          </ResumeLayout>
        ) : (
          <p>Author not found</p>
        )}
      </SectionContainer>
    </>
  );
}
