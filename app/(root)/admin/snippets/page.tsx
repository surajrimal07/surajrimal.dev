import Link from 'next/link';

import { allSnippets } from 'contentlayer/generated';
import { sortPosts } from 'pliny/utils/contentlayer';

import DeleteButton from '@/components/admin/SnippetDelete';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
    <div className="container mx-auto py-5">
      <div className="mb-6 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                All Snippets - {sortedBlogs.length}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button asChild>
          <Link href="/admin/snippets/new">Add Snippet</Link>
        </Button>
      </div>

      <div className="flex justify-start">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBlogs.map((post) => (
              <TableRow key={post._id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {post.tags.join(', ')}
                </TableCell>
                <TableCell>
                  {new Date(post.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex space-x-2">
                    <Button asChild variant="outline">
                      <Link href={`/admin/${post._raw.flattenedPath}`}>
                        Edit
                      </Link>
                    </Button>
                    <DeleteButton content="snippet" id={post.slug} />
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
