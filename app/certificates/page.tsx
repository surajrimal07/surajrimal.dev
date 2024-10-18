import Image from 'next/image';

import { ExternalLink } from 'lucide-react';

import Link from '@/components/Link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCertifications } from '@/lib/certification';

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Certifications
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Here's a collection of certifications I've earned from various
            online learning platforms. These represent my commitment to
            continuous learning and skill development.
          </p>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Card key={cert.id} className="flex flex-col">
                <CardHeader>
                  <Image
                    src={cert.imageUrl}
                    alt={`${cert.name} Certificate`}
                    width={300}
                    height={200}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="mb-2">{cert.name}</CardTitle>
                  <CardDescription>{cert.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <div className="flex w-full items-center justify-between">
                    <Badge variant="secondary">{cert.platform}</Badge>
                    <span className="text-sm text-muted-foreground">
                      Completed on{' '}
                      {new Date(cert.completion_date).toLocaleDateString()}
                    </span>
                  </div>
                  {cert.verification_link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      asChild
                    >
                      <Link
                        href={cert.verification_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Verify Certificate
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
