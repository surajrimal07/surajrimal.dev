'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ArrowLeft, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

  // Extract the post ID from the URL
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
  });
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isNewPost && postId) {
      setIsLoading(true);
      fetch(`/api/posts?id=${postId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((rawData) => {
          const cleanedData = cleanData(rawData);
          setPostData(cleanedData);
        })
        .catch((error) => {
          console.error('Failed to load post data:', error);
          toast.error(
            `Failed to load post data: ${error.message}`,
            toastOptions
          );
          router.push('/admin'); // Redirect to admin page on error
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
          body: JSON.stringify({ ...postData, id: postId }),
        });

        if (response.ok) {
          toast.success('Post saved successfully', toastOptions);
          router.push('/admin');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to save post:', error);
        toast.error(
          `Failed to save post: ${error instanceof Error ? error.message : String(error)}`,
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
        <Link href="/admin">
          <ArrowLeft className="h-6 w-6 cursor-pointer" />
        </Link>
        <h1 className="text-3xl font-bold">
          {isNewPost ? 'Create New Post' : 'Edit Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Write your post content here..."
          />
        </div>
        <Button type="submit">
          {isNewPost ? 'Create Post' : 'Update Post'}
        </Button>
      </form>
    </div>
  );
}
