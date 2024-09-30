import Link from 'next/link';

import { allBlogs } from 'contentlayer/generated';
import { PlusCircle } from 'lucide-react';
import { sortPosts } from 'pliny/utils/contentlayer';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function BlogPage() {
  const sortedBlogs = sortPosts(allBlogs);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Post
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBlogs.map((post) => (
            <TableRow key={post._id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.tags.join(', ')}</TableCell>
              <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/admin/${post._raw.flattenedPath}`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
