'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { deleteProject, getProjects } from '@/lib/project';
import { Project } from '@/types/project';

export default function AdminProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProject(id);
      toast.success('Project deleted successfully');
      fetchProjects();
      setProjectToDelete(null);
    } catch (error) {
      toast.error('Failed to delete project');
    }
  }

  const workProjects = projects.filter((project) => project.type === 'work');
  const selfProjects = projects.filter((project) => project.type === 'self');
  const selfHostedProjects = projects.filter(
    (project) => project.type === 'selfhosted'
  );

  const ProjectList = ({ projects }: { projects: Project[] }) =>
    isGridView ? (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent>
              <h3 className="font-bold">{project.title}</h3>
              <p>{project.stack}</p>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => router.push(`/admin/project/${project.id}`)}
                >
                  Edit
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        project.id && setProjectToDelete(project.id)
                      }
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete this project?
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete the project.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setProjectToDelete(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => project.id && handleDelete(project.id)}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    ) : (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Stack</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.stack}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => router.push(`/admin/project/${project.id}`)}
                >
                  Edit
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        project.id && setProjectToDelete(project.id)
                      }
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete this project?
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete the project.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setProjectToDelete(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => project.id && handleDelete(project.id)}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

  return (
    <div className="container mx-auto p-2">
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

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="view-mode"
                checked={isGridView}
                onCheckedChange={setIsGridView}
              />
              <label htmlFor="view-mode">Grid View</label>
            </div>
            <Button onClick={() => router.push('/admin/project/new')}>
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex justify-center">
              <TabsList className="inline-flex justify-center">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="work" className="flex-1">
                  Work
                </TabsTrigger>
                <TabsTrigger value="self" className="flex-1">
                  Self
                </TabsTrigger>
                <TabsTrigger value="self-hosted" className="flex-1">
                  Self Hosted
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-2">
              <TabsContent value="all">
                <ProjectList projects={projects} />
              </TabsContent>
              <TabsContent value="work">
                <ProjectList projects={workProjects} />
              </TabsContent>
              <TabsContent value="self">
                <ProjectList projects={selfProjects} />
              </TabsContent>
              <TabsContent value="self-hosted">
                <ProjectList projects={selfHostedProjects} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
