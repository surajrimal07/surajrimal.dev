import Link from 'next/link';

import { allSnippets } from 'contentlayer/generated';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { sortPosts } from 'pliny/utils/contentlayer';

import DeleteButton from '@/components/snippet/DeleteButton';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function SnippetPage() {
  const sortedBlogs = sortPosts(allSnippets);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <ArrowLeft className="h-6 w-6 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-bold">Snippet Posts</h1>
        </div>
        <Button asChild>
          <Link href="/admin/snippets/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Snippet
          </Link>
        </Button>
      </div>

      <div className="flex justify-start">
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
                <TableCell>
                  {new Date(post.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/admin/${post._raw.flattenedPath}`}>
                        Edit
                      </Link>
                    </Button>
                    <DeleteButton id={post._raw.flattenedPath} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
