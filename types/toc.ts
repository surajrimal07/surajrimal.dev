import { Toc } from 'pliny/mdx-plugins/remark-toc-headings';

export type TOC = {
  value: string;
  depth: number;
  data: { hProperties?: { id?: string } };
  children: TOC[];
  url: string;
};

export type TocItem = {
  value: string;
  url: string;
  depth: number;
  active?: boolean;
};

export interface TOCInlineProps {
  toc: Toc;
  title?: string;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
  collapse?: boolean;
  ulClassName?: string;
  liClassName?: string;
  rightAlign?: boolean;
}
