'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import toast from 'react-hot-toast';

import AdminLoading from '@/components/admin/Loader';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { createProject, getProject, updateProject } from '@/lib/project';
import { Project } from '@/types/project';
import { toastOptions } from '@/utils/toast';

export default function EditProject() {
  const params = useParams();
  const router = useRouter();

  const projectId = useMemo(() => {
    if (typeof params.slug === 'string') {
      return params.slug;
    }
    return null;
  }, [params.slug]);

  const isNewProject = useMemo(() => projectId === 'new', [projectId]);
  const [originalTitle, setOriginalTitle] = useState('');

  const [projectData, setProjectData] = useState<Project>({
    title: '',
    type: 'work',
    description: '',
    imgSrc: '',
    isDarkBadgeNeeded: false,
    url: '',
    repo: '',
    builtWith: [],
    stack: 'fullstack',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      console.log(projectId);
      if (!isNewProject && projectId) {
        setIsLoading(true);
        await getProject(projectId)
          .then((project) => {
            setOriginalTitle(`Editing - ${project.title}`);
            setProjectData(project);
          })
          .catch((error) => {
            toast.error(
              `Failed to load project data: ${error.message}`,
              toastOptions
            );
            router.push('/admin/project');
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [isNewProject, projectId, router]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value, type } = e.target;
      setProjectData((prev) => ({
        ...prev,
        [id]:
          type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    []
  );

  const handleSelectChange = useCallback((id: string, value: string) => {
    setProjectData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const handleSwitchChange = useCallback((checked: boolean) => {
    setProjectData((prev) => ({
      ...prev,
      isDarkBadgeNeeded: checked,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!projectData.title || !projectData.imgSrc || !projectData.stack) {
        toast.error('Please fill in all required fields.', toastOptions);
        return;
      }

      try {
        if (isNewProject) {
          await createProject(projectData);
          toast.success('Project created successfully', toastOptions);
        } else {
          await updateProject(projectId as string, projectData);
          toast.success('Project updated successfully', toastOptions);
        }
        router.push('/admin/projects');
      } catch (error) {
        toast.error(
          `Failed to save project: ${error instanceof Error ? error.message : String(error)}`,
          toastOptions
        );
      }
    },
    [projectData, isNewProject, projectId, router]
  );

  if (isLoading) {
    return <AdminLoading />;
  }

  return (
    <div className="container mx-auto py-5">
      <div className="flex items-center space-x-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/project">
                All Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isNewProject ? 'New Project' : originalTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 pt-5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={projectData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={projectData.type}
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="self">Self</SelectItem>
              <SelectItem value="selfhosted">Self Hosted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={projectData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imgSrc">Image Source</Label>
          <Input
            id="imgSrc"
            value={projectData.imgSrc}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stack">Stack</Label>
          <Select
            value={projectData.stack}
            onValueChange={(value) => handleSelectChange('stack', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stack" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fullstack">Full Stack</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="api">API</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            value={projectData.url}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="repo">Repository</Label>
          <Input
            id="repo"
            value={projectData.repo}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="builtWith">Built With (comma-separated)</Label>
          <Input
            id="builtWith"
            value={projectData.builtWith.join(', ')}
            onChange={(e) => {
              const value = e.target.value;
              setProjectData((prev) => ({
                ...prev,
                builtWith: value.split(',').map((item) => item.trim()),
              }));
            }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isDarkBadgeNeeded"
            checked={projectData.isDarkBadgeNeeded}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="isDarkBadgeNeeded">Dark Badge Needed</Label>
        </div>

        <Button type="submit">
          {isNewProject ? 'Create Project' : 'Update Project'}
        </Button>
      </form>
    </div>
  );
}
