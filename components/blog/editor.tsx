'use client';

import { FC } from 'react';

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertAdmonition,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import '@/css/mdx.css';

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      className="dark-theme dark-editor min-h-[1000px]"
      contentEditableClassName="prose"
      onChange={(e) => console.log(e)} //add callback
      ref={editorRef}
      markdown={markdown} //add markdown
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),

        diffSourcePlugin(),
        frontmatterPlugin(),
        imagePlugin(), //imagePlugin({ imageUploadHandler })
        linkPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: 'JavaScript',
            css: 'CSS',
            txt: 'text',
            tsx: 'TypeScript',
          },
        }),
        linkDialogPlugin({
          linkAutocompleteSuggestions: [
            'https://virtuoso.dev',
            'https://mdxeditor.dev',
          ],
        }),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <CreateLink />
              <InsertAdmonition />
              <InsertCodeBlock />
              <InsertFrontmatter />
              <InsertImage />
              <InsertTable />
              <InsertThematicBreak />
              <ListsToggle />
            </>
          ),
        }),
      ]}
    />
  );
};

export default Editor;
