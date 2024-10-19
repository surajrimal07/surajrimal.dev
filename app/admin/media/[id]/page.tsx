import { notFound } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getMedia } from '@/lib/media';

import CertificationForm from '../media-form';

export default async function EditMedia({
  params,
}: {
  params: { id: string };
}) {
  const medias = await getMedia();
  const media = medias.find((c) => c.id === parseInt(params.id));

  if (params.id !== 'new' && !media) {
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
            <BreadcrumbLink href="/admin/media">In Medias</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              Edit - {params.id === 'new' ? 'New' : media.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mb-6 mt-2 text-3xl font-bold">
        {params.id === 'new'
          ? 'Create New Certification'
          : 'Edit Certification'}
      </h1>
      <CertificationForm media={media} />
    </div>
  );
}
