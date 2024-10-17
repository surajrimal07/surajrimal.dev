'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { Check, Maximize2, X, ZoomIn } from 'lucide-react';
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
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
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
import {
  createProject,
  getProject,
  getProjectImages,
  updateProject,
  uploadProjectImage,
} from '@/lib/project';
import { Project } from '@/types/newProject';
import { toastOptions } from '@/utils/toast';

export default function EditProject() {
  const params = useParams();
  const router = useRouter();

  const [projectId, setProjectId] = useState<string | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [originalTitle, setOriginalTitle] = useState('');

  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [zoomImage, setZoomImage] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const [projectData, setProjectData] = useState<Project>({
    title: '',
    type: 'work',
    description: '',
    img_src: '',
    is_dark_badge_needed: false,
    url: '',
    repo: '',
    built_with: [],
    stack: 'fullstack',
    created_at: '',
    updated_at: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullImageViewOpen, setIsFullImageViewOpen] = useState(false);

  useEffect(() => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    setProjectId(id);
    setIsNewProject(id === 'new');
  }, [params.id]);

  useEffect(() => {
    const fetchProject = async () => {
      const images = await getProjectImages();
      setProjectImages(images);

      if (!isNewProject && projectId) {
        setIsLoading(true);
        try {
          const project = await getProject(projectId);
          setOriginalTitle(`Editing - ${project.title}`);
          setProjectData(project);
          setSelectedImage(project.img_src);
        } catch (error) {
          toast.error(
            `Failed to load project data: ${error instanceof Error ? error.message : String(error)}`,
            toastOptions
          );
          router.push('/admin/project');
        } finally {
          setIsLoading(false);
        }
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

  const handleImageSelect = useCallback((image: string) => {
    setSelectedImage(image);
    setProjectData((prev) => ({
      ...prev,
      img_src: image,
    }));
    setUploadedImage(null);
    setPreviewUrl('');
    setIsDrawerOpen(false);
  }, []);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadedImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setSelectedImage('');
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (
        !projectData.title ||
        (!selectedImage && !uploadedImage) ||
        !projectData.stack
      ) {
        toast.error('Please fill in all required fields.', toastOptions);
        return;
      }

      try {
        let imgSrc = selectedImage;

        if (uploadedImage) {
          imgSrc = await uploadProjectImage(uploadedImage);
        }

        const updatedProjectData = {
          ...projectData,
          img_src: imgSrc,
        };

        if (isNewProject) {
          await createProject(updatedProjectData);
          toast.success('Project created successfully', toastOptions);
        } else {
          await updateProject(projectId as string, updatedProjectData);
          toast.success('Project updated successfully', toastOptions);
        }
        router.push('/admin/project');
      } catch (error) {
        toast.error(
          `Failed to save project: ${error instanceof Error ? error.message : String(error)}`,
          toastOptions
        );
      }
    },
    [projectData, selectedImage, uploadedImage, isNewProject, router, projectId]
  );

  const filteredImages = projectImages.filter((image) =>
    image.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
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
                onValueChange={(value) =>
                  setProjectData((prev) => ({ ...prev, type: value }))
                }
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

            {/* Image Selection and Upload Section */}
            <div className="space-y-4">
              <Label>Project Image</Label>
              <div className="rounded-lg border p-4">
                {selectedImage || previewUrl ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Image
                        src={selectedImage || previewUrl}
                        alt="Project image"
                        width={300}
                        height={200}
                        className="h-[200px] w-full rounded-md object-cover"
                        priority
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute right-2 top-2"
                        onClick={() => {
                          setSelectedImage('');
                          setPreviewUrl('');
                          setUploadedImage(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsFullImageViewOpen(true);
                        }}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                      <DrawerTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsDrawerOpen(true);
                          }}
                        >
                          Change Image
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="p-4">
                          <h2 className="mb-4 text-lg font-semibold">
                            Select Image
                          </h2>
                          <div className="mb-4">
                            <Input
                              type="text"
                              placeholder="Search images..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div className="grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
                            {filteredImages.length > 0 ? (
                              filteredImages.map((image) => (
                                <div
                                  key={image}
                                  className="group relative cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-500"
                                >
                                  <Image
                                    src={image}
                                    alt="Project image"
                                    width={150}
                                    height={100}
                                    className="h-[100px] w-full object-cover"
                                  />

                                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-black bg-opacity-50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      className="h-8 px-3"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setZoomImage(image);
                                        setIsFullImageViewOpen(true);
                                      }}
                                    >
                                      <Maximize2 className="mr-1 h-4 w-4" />
                                      Zoom
                                    </Button>
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      className="h-8 px-3"
                                      onClick={() => handleImageSelect(image)}
                                    >
                                      <Check className="mr-1 h-4 w-4" />
                                      Select
                                    </Button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-full text-center text-gray-500">
                                No images found
                              </div>
                            )}
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                      <DrawerTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Choose Existing Image
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="p-4">
                          <h2 className="mb-4 text-lg font-semibold">
                            Select Image
                          </h2>
                          <div className="mb-4">
                            <Input
                              type="text"
                              placeholder="Search images..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div className="grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
                            {filteredImages.length > 0 ? (
                              filteredImages.map((image) => (
                                <div
                                  key={image}
                                  className="hover:border-white-500 group relative cursor-pointer overflow-hidden rounded-lg border-2 border-transparent"
                                >
                                  <Image
                                    src={image}
                                    alt="Project image"
                                    width={150}
                                    height={100}
                                    className="h-[100px] w-full object-cover"
                                  />
                                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-black bg-opacity-50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      className="h-8 px-3"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setZoomImage(image);
                                        setIsFullImageViewOpen(true);
                                      }}
                                    >
                                      <Maximize2 className="mr-1 h-4 w-4" />
                                      Zoom
                                    </Button>
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      className="h-8 px-3"
                                      onClick={() => handleImageSelect(image)}
                                    >
                                      <Check className="mr-1 h-4 w-4" />
                                      Select
                                    </Button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-full text-center text-gray-500">
                                No images found
                              </div>
                            )}
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                    <div className="text-center text-lg font-bold">or</div>
                    <div>
                      <div className="mb-2 text-center">
                        <Label htmlFor="imageUpload">Upload New Image</Label>
                      </div>

                      <Input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stack">Stack</Label>
              <Select
                value={projectData.stack}
                onValueChange={(value) =>
                  setProjectData((prev) => ({ ...prev, stack: value }))
                }
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={projectData.description}
                onChange={handleInputChange}
                className="h-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="builtWith">Built With (comma-separated)</Label>
              <Input
                id="builtWith"
                value={projectData.built_with.join(', ')}
                onChange={(e) => {
                  setProjectData((prev) => ({
                    ...prev,
                    built_with: e.target.value
                      .split(',')
                      .map((item) => item.trim()),
                  }));
                }}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isDarkBadgeNeeded"
                checked={projectData.is_dark_badge_needed}
                onCheckedChange={(checked) =>
                  setProjectData((prev) => ({
                    ...prev,
                    is_dark_badge_needed: checked,
                  }))
                }
              />
              <Label htmlFor="isDarkBadgeNeeded">Dark Badge Needed</Label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          {isNewProject ? 'Create Project' : 'Update Project'}
        </Button>
      </form>

      {/* Full Image View Dialog */}
      <Dialog open={isFullImageViewOpen} onOpenChange={setIsFullImageViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogClose asChild>
            <Button
              variant="destructive"
              size="sm"
              className="absolute right-0 top-0 z-10"
              onClick={() => setIsFullImageViewOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </DialogClose>

          <Image
            src={zoomImage}
            alt="Full size project image"
            width={800}
            height={600}
            className="h-auto w-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
