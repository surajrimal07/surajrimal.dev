'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import matter from 'gray-matter';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

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
import { toastOptions } from '@/utils/toast';

interface PostData {
  title: string;
  content: string;
  summary: string;
  date: string;
  tags: string[];
  draft: boolean;
  language: string;
}

const LANGUAGES = ['English', 'Nepali'];

export default function EditBlogPost() {
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

  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    summary: '',
    date: '',
    tags: [],
    draft: false,
    language: 'English',
  });
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isNewPost && postId) {
      setIsLoading(true);
      fetch(`/api/snippets?id=${postId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((rawContent) => {
          setPostData({
            title: rawContent.title || '',
            content: rawContent.content || '',
            summary: rawContent.summary || '',
            date: rawContent.date || '',
            tags: rawContent.tags || [],
            draft: rawContent.draft || false,
            language: rawContent.language || 'English',
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            `Failed to load snippets data: ${error.message}`,
            toastOptions
          );
          router.push('/admin/snippets');
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

        console.log('File content to be sent:', fileContent);

        const response = await fetch('/api/snippets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: fileContent, id: postId }),
        });

        if (response.ok) {
          toast.success('Snippet saved successfully', toastOptions);
          router.push('/admin/snippets');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An unknown error occurred');
        }
      } catch (error) {
        console.error('Failed to save snippet:', error);
        toast.error(
          `Failed to save snippet: ${error instanceof Error ? error.message : String(error)}`,
          toastOptions
        );
      }
    },
    [postData, postId, router]
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center space-x-4">
        <Link href="/admin/snippets">
          <ArrowLeft className="h-6 w-6 cursor-pointer" />
        </Link>
        <h1 className="text-3xl font-bold">
          {isNewPost ? 'Create New Snippet' : 'Edit Snippet'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={postData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={postData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Input
            id="summary"
            type="text"
            value={postData.summary}
            onChange={handleInputChange}
            required
          />
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
        <div className="rounded-md border">
          <Textarea
            id="content"
            value={postData.content}
            onChange={handleInputChange}
            className="min-h-[500px] w-full resize-y"
            placeholder="Write your snippet content here..."
          />
        </div>
        <Button type="submit">
          {isNewPost ? 'Create Snippet' : 'Update Snippet'}
        </Button>
      </form>
    </div>
  );
}
