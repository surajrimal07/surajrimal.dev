/* eslint-disable @typescript-eslint/no-explicit-any */
import { components } from '@/components/MDXComponents';
import SectionContainer from '@/components/SectionContainer';
import ResumeLayout from '@/layouts/ResumeLayout';
import { TOC } from '@/types/toc';
import { allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';

import { genPageMetadata } from 'app/seo';
export const metadata = genPageMetadata({ title: 'About' });

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'resume');

  // Convert resume.toc from string to TOC[]
  const resumeTOC: TOC[] = Array.isArray(author?.toc)
    ? author.toc.map((item: any) => ({
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
        <ResumeLayout toc={resumeTOC}>
          <MDXLayoutRenderer code={author!.body.code} components={components} toc={resumeTOC} />
        </ResumeLayout>
      </SectionContainer>
    </>
  );
}
