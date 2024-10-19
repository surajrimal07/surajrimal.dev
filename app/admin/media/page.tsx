import Link from 'next/link';

import DeleteButton from '@/components/admin/MediaDelete';
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
import { getMedia } from '@/lib/media';
import { InMedia } from '@/types/media';

export default async function CertificationsList() {
  const mediaItems = await getMedia();

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Medias - {mediaItems.length}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">In Media</h1>
        <Button asChild>
          <Link href="/admin/media/new">Add Media</Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead className="w-[25%]">Publication</TableHead>
              <TableHead className="w-[20%]">Date</TableHead>
              <TableHead className="w-[15%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mediaItems.map((media: InMedia) => (
              <TableRow key={media.id}>
                <TableCell className="font-medium">{media.title}</TableCell>
                <TableCell>{media.publication}</TableCell>
                <TableCell>
                  {new Date(media.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/media/${media.id}`}>Edit</Link>
                    </Button>
                    <DeleteButton id={media.id} title={media.title} />
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
