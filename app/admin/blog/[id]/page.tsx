'use client';

import { useParams, useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import React from 'react';

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
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import '@/css/mdx.css';
import { toastOptions } from '@/utils/toast';

interface PostData {
  title: string;
  content: string;
  summary: string;
  date: string;
  tags: string[];
  draft: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cleanData = (rawData: any): PostData => {
  return {
    title: rawData.title.replace(/^'|'$/g, ''),
    date: rawData.date.replace(/^'|'$/g, ''),
    summary: rawData.summary.replace(/^'|'$/g, ''),
    tags: JSON.parse(rawData.tags.replace(/'/g, '"')),
    content: rawData.content.replace(/^'|'$/g, ''),
    draft: rawData.draft === 'true',
  };
};

export default function EditBlogPost() {
  const params = useParams();
  const router = useRouter();
  const isNewPost = useMemo(() => params.id === 'new', [params.id]);

  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    summary: '',
    date: '',
    tags: [],
    draft: false,
  });
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isNewPost) {
      setIsLoading(true);
      fetch(`/api/posts?id=${params.id}`)
        .then((response) => response.json())
        .then((rawData) => {
          const cleanedData = cleanData(rawData);
          setPostData(cleanedData);
        })
        .catch((error) => {
          toast.error(
            `Failed to load post data: ${error.message}`,
            toastOptions
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [isNewPost, params.id]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value, type, checked } = e.target;
      setPostData((prev) => ({
        ...prev,
        [id]: type === 'checkbox' ? checked : value,
      }));
    },
    []
  );

  const handleAddTag = useCallback(() => {
    if (newTag.trim() && !postData.tags.includes(newTag.trim())) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  }, [newTag, postData.tags]);

  const handleDeleteTag = useCallback((tagToDelete: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (
        !postData.title ||
        !postData.content ||
        !postData.summary ||
        !postData.date ||
        postData.tags.length === 0
      ) {
        toast.error(
          'Please fill in all fields, including at least one tag.',
          toastOptions
        );
        return;
      }

      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          toast.success('Post saved successfully', toastOptions);
          router.push('/admin');
        } else {
          toast.error('Failed to save post', toastOptions);
        }
      } catch (error) {
        toast.error(`Failed to save post ${error}`, toastOptions);
      }
    },
    [postData, router]
  );

  const editorPlugins = useMemo(
    () => [
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      markdownShortcutPlugin(),
      diffSourcePlugin(),
      frontmatterPlugin(),
      imagePlugin(),
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
    ],
    []
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">
        {isNewPost ? 'Create New Post' : 'Edit Post'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields */}
        {(['title', 'date', 'summary'] as const).map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              id={field}
              type={field === 'date' ? 'date' : 'text'}
              value={postData[field]}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}
        {/* Tags Input */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="tags"
              value={newTag}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTag(e.target.value)
              }
            />
            <Button type="button" onClick={handleAddTag}>
              Add Tag
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {postData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-2 rounded bg-zinc-900 p-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleDeleteTag(tag)}
                  className="ml-2 rounded px-2 text-red-500 hover:bg-zinc-700 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* Draft Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="draft"
            type="checkbox"
            checked={postData.draft}
            onChange={handleInputChange}
            className="h-4 w-4 rounded"
          />
          <Label htmlFor="draft">Draft</Label>
        </div>
        <div className="mt-5">
          <Label htmlFor="content">Content</Label>
        </div>
        <div
          className="rounded-md border"
          style={{ height: '500px', overflow: 'auto' }}
        >
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <LoaderCircle className="h-12 w-12 animate-spin text-white" />
            </div>
          ) : (
            <Suspense fallback={<div>Loading editor...</div>}>
              <MDXEditor
                className="dark-theme dark-editor"
                contentEditableClassName="prose"
                markdown={postData.content}
                onChange={(content: string) =>
                  setPostData((prev) => ({ ...prev, content }))
                }
                plugins={editorPlugins}
              />
            </Suspense>
          )}
        </div>
        <Button type="submit">
          {isNewPost ? 'Create Post' : 'Update Post'}
        </Button>
      </form>
    </div>
  );
}
