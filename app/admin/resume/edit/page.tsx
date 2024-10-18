'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import matter from 'gray-matter';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

import AdminLoading from '@/components/admin/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Author } from '@/types/author';
import { toastOptions } from '@/utils/toast';

async function saveAuthorData(data: Author) {
  const { body, ...frontmatter } = data;
  const fileContent = matter.stringify(body, frontmatter);

  const response = await fetch('/api/about?type=resume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: fileContent }),
  });
  if (!response.ok) {
    throw new Error('Failed to save author resume');
  }
  return response.json();
}

export default function EditAuthorPage() {
  const router = useRouter();

  const [author, setAuthor] = useState<Author>({
    name: '',
    avatar: '',
    occupation: '',
    company: '',
    email: '',
    twitter: '',
    linkedin: '',
    github: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAuthorData() {
      try {
        const response = await fetch('/api/about?type=resume', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to load author resume');
        }
        const rawContent = await response.json();
        setAuthor({
          name: rawContent.name || '',
          avatar: rawContent.avatar || '',
          occupation: rawContent.occupation || '',
          company: rawContent.company || '',
          email: rawContent.email || '',
          twitter: rawContent.twitter || '',
          linkedin: rawContent.linkedin || '',
          github: rawContent.github || '',
          body: rawContent.content || '',
        });
      } catch (error) {
        toast.error(`Failed to load author resume: ${error}`, toastOptions);
      } finally {
        setIsLoading(false);
      }
    }

    loadAuthorData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const requiredFields = ['name', 'occupation', 'company', 'email', 'body'];
      const missingFields = requiredFields.filter(
        (field) => !author[field as keyof Author]
      );

      if (missingFields.length > 0) {
        throw new Error(
          `Please fill in all required fields: ${missingFields.join(', ')}`
        );
      }

      if (author.email && !/\S+@\S+\.\S+/.test(author.email)) {
        throw new Error('Please enter a valid email address');
      }

      await saveAuthorData(author);
      toast.success('Author resume saved successfully', toastOptions);
      router.push('/admin/resume');
    } catch (err) {
      toast.error(`Failed to save author resume: ${err}`, toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <AdminLoading />;
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
            <BreadcrumbLink href="/admin/resume">About</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>About - Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mx-auto mt-2 max-w-5xl">
        <CardHeader>
          <CardTitle className="text-3xl">Edit Author Resume</CardTitle>
          <CardDescription>Update your author resune</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  value={author.avatar}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={author.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                name="occupation"
                value={author.occupation}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={author.company}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={author.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                name="twitter"
                value={author.twitter}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={author.linkedin}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="github"
                value={author.github}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="body">Bio</Label>
              <Textarea
                id="body"
                name="body"
                value={author.body}
                onChange={handleInputChange}
                className="h-[700px] min-h-96"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
              <Save className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
