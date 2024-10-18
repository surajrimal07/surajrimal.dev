import Link from 'next/link';

import DeleteButton from '@/components/admin/CertificationDelete';
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
import { getCertifications } from '@/lib/certification';
import { Certification } from '@/types/certificate';

export default async function CertificationsList() {
  const certifications = await getCertifications();

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              All Certificates - {certifications.length}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Certifications</h1>
        <Button asChild>
          <Link href="/admin/certifications/new">Add Certification</Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Name</TableHead>
              <TableHead className="w-[25%]">Platform</TableHead>
              <TableHead className="w-[20%]">Completion Date</TableHead>
              <TableHead className="w-[15%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((cert: Certification) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.name}</TableCell>
                <TableCell>{cert.platform}</TableCell>
                <TableCell>
                  {new Date(cert.completion_date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/certifications/${cert.id}`}>
                        Edit
                      </Link>
                    </Button>
                    <DeleteButton id={cert.id} />
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
