import { notFound } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getCertifications } from '@/lib/certification';

import CertificationForm from '../certification-form';

export default async function EditCertification({
  params,
}: {
  params: { id: string };
}) {
  const certifications = await getCertifications();
  const certification = certifications.find(
    (c) => c.id === parseInt(params.id)
  );

  if (params.id !== 'new' && !certification) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/snippets">
              Certifications
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit - {certification.name} </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mb-6 mt-2 text-3xl font-bold">
        {params.id === 'new'
          ? 'Create New Certification'
          : 'Edit Certification'}
      </h1>
      <CertificationForm certification={certification} />
    </div>
  );
}
