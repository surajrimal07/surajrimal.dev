'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';

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
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { deleteProject, getProjects } from '@/lib/project';
import { Tables } from '@/types/database';
import { formatDate } from '@/utils/timeAgo';
import { toastOptions } from '@/utils/toast';

export default function AdminProjectsListPage() {
  const [projects, setProjects] = useState<Tables<'projects'>[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setProjects(await getProjects());
    } catch (error) {
      toast.error(`Failed to fetch proects ${error}`, toastOptions);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProject(id);
      toast.success('Project deleted successfully', toastOptions);
      fetchProjects();
    } catch (error) {
      toast.error(`Failed to delete project ${error}`, toastOptions);
    }
  }

  const ProjectList = ({ projects }: { projects: Tables<'projects'>[] }) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              {project.is_dark_badge_needed && (
                <Badge variant="outline">Dark</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{project.stack}</p>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-2 text-sm">{project.description}</p>
            <div className="mb-2">
              <strong className="text-sm">Built with:</strong>
              <div className="mt-1 flex flex-wrap gap-1">
                {project.built_with.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Created on : {formatDate(project.created_at!)}
            </p>

            <p className="text-xs text-muted-foreground">
              Edited on : {formatDate(project.updated_at!)}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/project/${project.id}`)}
            >
              Edit
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete {project.title}? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button
                    variant="destructive"
                    onClick={() => project.id && handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Projects - {projects.length}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button onClick={() => router.push('/admin/project/new')}>
            New Project
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4 flex justify-center">
              {['all', 'work', 'self', 'self-hosted'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 capitalize"
                >
                  {tab.replace('-', ' ')}
                </TabsTrigger>
              ))}
            </TabsList>
            {['all', 'work', 'self', 'self-hosted'].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <ProjectList
                  projects={
                    tab === 'all'
                      ? projects
                      : projects.filter(
                          (p) =>
                            p.type ===
                            (tab === 'self-hosted' ? 'selfhosted' : tab)
                        )
                  }
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
