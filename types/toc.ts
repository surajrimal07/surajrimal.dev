export type TOC = {
  value: string;
  depth: number;
  data: { hProperties?: { id?: string } };
  children: TOC[];
  url: string;
};
