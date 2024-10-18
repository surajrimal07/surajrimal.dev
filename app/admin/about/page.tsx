import Link from 'next/link';

import { Authors, allAuthors } from 'contentlayer/generated';
import { ExternalLink, Github, Linkedin, Mail, Twitter } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AuthorAdminPage() {
  const author = allAuthors.find((p) => p.slug === 'default') as
    | Authors
    | undefined;

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>About</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mx-auto mt-2 max-w-5xl">
        <CardHeader>
          <CardTitle className="text-3xl">Author Information</CardTitle>
          <CardDescription>
            Manage the author details for your site
          </CardDescription>
        </CardHeader>
        <CardContent>
          {author ? (
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{author.name}</h2>
                  {author.occupation && (
                    <p className="text-muted-foreground">{author.occupation}</p>
                  )}
                  {author.company && (
                    <p className="text-muted-foreground">{author.company}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{author.email || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Twitter className="h-4 w-4" />
                  <span>{author.twitter || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4" />
                  <span>{author.linkedin || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Github className="h-4 w-4" />
                  <span>{author.github || 'Not provided'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Additional Information
                </h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    Reading Time: {author.readingTime.text}
                  </Badge>
                </div>
              </div>
              <Alert>
                <AlertTitle>Author Page Exists</AlertTitle>
                <AlertDescription>
                  An author page for {author.name} has been found. File path:
                  {author.filePath}
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <Alert variant="destructive">
              <AlertTitle>No Author Page Found</AlertTitle>
              <AlertDescription>
                There is no author page created yet. Use the button below to
                create one.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          {author ? (
            <Button asChild>
              <Link href="/admin/about/edit">
                Edit Author <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/admin/about/new">
                Create Author <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
