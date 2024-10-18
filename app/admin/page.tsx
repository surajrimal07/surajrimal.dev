import Link from 'next/link';

import {
  Briefcase,
  Calendar,
  Code,
  Computer,
  ContactRound,
  FileSpreadsheet,
  FileText,
  Map,
  ShieldCheck,
  User,
} from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';

export default async function AdminDashboard() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  const sections = [
    {
      name: 'Posts',
      href: '/admin/blog',
      icon: FileText,
      description: 'Manage your blog posts',
    },
    {
      name: 'Snippets',
      href: '/admin/snippets',
      icon: Code,
      description: 'Organize code snippets',
    },
    {
      name: 'Journey',
      href: '/admin/journey',
      icon: Map,
      description: 'Update your professional journey',
    },
    {
      name: 'Projects',
      href: '/admin/project',
      icon: Briefcase,
      description: 'Showcase your projects',
    },
    {
      name: 'About',
      href: '/admin/about',
      icon: User,
      description: 'Edit your about page',
    },
    {
      name: 'Resume',
      href: '/admin/resume',
      icon: FileSpreadsheet,
      description: 'Update your resume',
    },
    {
      name: 'Uses',
      href: '/admin/uses',
      icon: Computer,
      description: 'List your tech stack and tools',
    },
    {
      name: 'Availability',
      href: '/admin/available',
      icon: Calendar,
      description: 'Set your availability',
    },
    {
      name: 'Contacts',
      href: '/admin/contact',
      icon: ContactRound,
      description: 'Set your contact information',
    },
    {
      name: 'Certificates',
      href: '/admin/certifications',
      icon: ShieldCheck,
      description: 'Set your certification information',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Welcome, {data.user!.user_metadata.full_name}
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link href={section.href} key={section.name}>
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg">
              <CardHeader className="flex items-center space-x-2 text-lg font-semibold">
                <section.icon className="h-5 w-5" />
                <span>{section.name}</span>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
