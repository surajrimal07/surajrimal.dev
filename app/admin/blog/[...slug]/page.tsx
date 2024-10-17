'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import matter from 'gray-matter';
import toast from 'react-hot-toast';

import AdminLoading from '@/components/admin/Loader';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LANGUAGES, LAYOUTS, PostData } from '@/types/post';
import { toastOptions } from '@/utils/toast';

export default function EditSnippet() {
  const params = useParams();
  const router = useRouter();

  const postId = useMemo(() => {
    if (typeof params.slug === 'string') {
      return params.slug;
    }
    if (Array.isArray(params.slug)) {
      return params.slug[params.slug.length - 1];
    }
    return null;
  }, [params.slug]);

  const isNewPost = useMemo(() => postId === 'new', [postId]);
  const [orginalTitle, setOrginalTitle] = useState('');

  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    summary: '',
    date: '',
    tags: [],
    draft: false,
    language: 'English',
    layout: 'PostSimple',
    lastmod: '',
  });
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isNewPost && postId) {
      setIsLoading(true);
      fetch(`/api/posts?type=post&id=${postId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((rawContent) => {
          setOrginalTitle(`Editing - ${rawContent.title}`);
          setPostData({
            title: rawContent.title || '',
            content: rawContent.content || '',
            summary: rawContent.summary || '',
            date: rawContent.date || '',
            tags: rawContent.tags || [],
            draft: rawContent.draft || false,
            language: rawContent.language || 'English',
            layout: rawContent.layout || 'PostSimple',
            lastmod: rawContent.lastmod || rawContent.date,
          });
        })
        .catch((error) => {
          toast.error(
            `Failed to load blog data: ${error.message}`,
            toastOptions
          );
          router.push('/admin/blog');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [isNewPost, postId, router]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value, type } = e.target;
      setPostData((prev) => ({
        ...prev,
        [id]:
          type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    []
  );

  const handleLanguageChange = useCallback((value: string) => {
    setPostData((prev) => ({
      ...prev,
      language: value,
    }));
  }, []);

  const handleLayoutChange = useCallback((value: string) => {
    setPostData((prev) => ({
      ...prev,
      layout: value,
    }));
  }, []);

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
        const { content, ...frontmatter } = postData;
        const fileContent = matter.stringify(content, frontmatter);

        const response = await fetch('/api/posts?type=post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: fileContent, id: postId }),
        });

        if (response.ok) {
          toast.success('Blog saved successfully', toastOptions);
          router.push('/admin/blog');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An unknown error occurred');
        }
      } catch (error) {
        toast.error(
          `Failed to save blog: ${error instanceof Error ? error.message : String(error)}`,
          toastOptions
        );
      }
    },
    [postData, postId, router]
  );

  if (isLoading) {
    return <AdminLoading />;
  }

  return (
    <div className="container mx-auto py-5">
      <div className="flex items-center space-x-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/blog">All Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{orginalTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 pt-5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={postData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              disabled={!isNewPost}
              id="date"
              type="date"
              value={postData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isNewPost && (
            <div className="flex-1 space-y-2">
              <Label htmlFor="lastmod">Last Modified</Label>
              <Input
                id="lastmod"
                type="date"
                value={postData.lastmod}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 space-y-2">
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

          <div className="flex-1 space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={postData.language}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="layout">Post Layout</Label>
            <Select value={postData.layout} onValueChange={handleLayoutChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a layout" />
              </SelectTrigger>
              <SelectContent>
                {LAYOUTS.map((layout) => (
                  <SelectItem key={layout} value={layout}>
                    {layout}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-8 flex flex-1 items-center space-x-2">
            <input
              id="draft"
              type="checkbox"
              checked={postData.draft}
              onChange={handleInputChange}
              className="h-4 w-4 rounded"
            />
            <Label htmlFor="draft">Draft</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={postData.summary}
            onChange={handleInputChange}
            className="min-h-[100px] w-full resize-y"
            placeholder="Write your blog summary here..."
          />
        </div>

        <div className="mt-5">
          <Label htmlFor="content">Content</Label>
        </div>
        <div className="rounded-md border">
          <Textarea
            id="content"
            value={postData.content}
            onChange={handleInputChange}
            className="min-h-[500px] w-full resize-y"
            placeholder="Write your blog content here..."
          />
        </div>
        <Button type="submit">
          {isNewPost ? 'Create Blog' : 'Update Blog'}
        </Button>
      </form>
    </div>
  );
}
