'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
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
import type { Tables } from '@/types/database';
import { toastOptions } from '@/utils/toast';

// Types
type ProjectState = Omit<Tables<'projects'>, 'id'>;

type ProjectAction =
  | { type: 'SET_PROJECT'; payload: Partial<Tables<'projects'>> }
  | { type: 'RESET_PROJECT' };

// Initial state
const initialState: ProjectState = {
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
};

// Reducer
function projectReducer(
  state: ProjectState,
  action: ProjectAction,
): ProjectState {
  switch (action.type) {
    case 'SET_PROJECT':
      return { ...state, ...action.payload };
    case 'RESET_PROJECT':
      return initialState;
    default:
      return state;
  }
}

export default function EditProject() {
  const params = useParams();
  const router = useRouter();
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const [projectId, setProjectId] = useState<string | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [originalTitle, setOriginalTitle] = useState('');
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [zoomImage, setZoomImage] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullImageViewOpen, setIsFullImageViewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const filteredImages = useMemo(
    () =>
      projectImages.filter((image) =>
        image.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [projectImages, searchTerm],
  );

  useEffect(() => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id || null;
    setProjectId(id);
    setIsNewProject(id === 'new');
  }, [params.id]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true);

        const images = await getProjectImages();
        setProjectImages(images);

        if (!isNewProject && projectId) {
          const project = await getProject(projectId);
          setOriginalTitle(`Editing - ${project.title}`);
          dispatch({ type: 'SET_PROJECT', payload: project });
          setSelectedImage(project.img_src);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        toast.error(
          `Failed to load project data: ${errorMessage}`,
          toastOptions,
        );
        router.push('/admin/project');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [isNewProject, projectId, router]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value, type } = e.target;
      dispatch({
        type: 'SET_PROJECT',
        payload: {
          [id]:
            type === 'checkbox'
              ? (e.target as HTMLInputElement).checked
              : value,
        },
      });
    },
    [],
  );

  const handleImageSelect = useCallback((image: string) => {
    setSelectedImage(image);
    dispatch({ type: 'SET_PROJECT', payload: { img_src: image } });
    setUploadedImage(null);
    setPreviewUrl('');
    setIsDrawerOpen(false);
  }, []);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadedImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setSelectedImage('');
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!state.title || (!selectedImage && !uploadedImage) || !state.stack) {
        toast.error('Please fill in all required fields.', toastOptions);
        return;
      }

      try {
        let imgSrc = selectedImage;
        if (uploadedImage) {
          imgSrc = await uploadProjectImage(uploadedImage);
          setSelectedImage(imgSrc);
        }

        const projectData = {
          ...state,
          img_src: imgSrc,
          created_at: state.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        if (isNewProject) {
          await createProject(projectData);
          toast.success('Project created successfully', toastOptions);
        } else {
          await updateProject(projectId as string, projectData);
          toast.success('Project updated successfully', toastOptions);
        }
        router.push('/admin/project');
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        toast.error(`Failed to save project: ${errorMessage}`, toastOptions);
      }
    },
    [state, selectedImage, uploadedImage, isNewProject, projectId, router],
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

      <form className="mt-2 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                required
                id="title"
                value={state.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={state.type}
                onValueChange={(value) =>
                  dispatch({
                    type: 'SET_PROJECT',
                    payload: { type: value as Tables<'projects'>['type'] },
                  })
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

            <div className="space-y-4">
              <Label>Project Image</Label>
              <div className="rounded-lg border p-4">
                {selectedImage || previewUrl ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Image
                        priority
                        alt="Project image"
                        className="h-full w-full rounded-md object-cover"
                        height={200}
                        src={selectedImage || previewUrl}
                        width={300}
                      />
                      <Button
                        className="absolute right-2 top-2"
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedImage('');
                          setPreviewUrl('');
                          setUploadedImage(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        className="absolute bottom-2 right-2"
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          setZoomImage(selectedImage || previewUrl);
                          setIsFullImageViewOpen(true);
                        }}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                    <ImageSelectionDrawer
                      filteredImages={filteredImages}
                      isOpen={isDrawerOpen}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      onImageSelect={handleImageSelect}
                      onOpenChange={setIsDrawerOpen}
                      onZoomImage={(image) => {
                        setZoomImage(image);
                        setIsFullImageViewOpen(true);
                      }}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ImageSelectionDrawer
                      filteredImages={filteredImages}
                      isOpen={isDrawerOpen}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      onImageSelect={handleImageSelect}
                      onOpenChange={setIsDrawerOpen}
                      onZoomImage={(image) => {
                        setZoomImage(image);
                        setIsFullImageViewOpen(true);
                      }}
                    />
                    <div className="text-center text-lg font-bold">or</div>
                    <div>
                      <div className="mb-2 text-center">
                        <Label htmlFor="imageUpload">Upload New Image</Label>
                      </div>
                      <Input
                        accept="image/*"
                        id="imageUpload"
                        type="file"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stack">Stack</Label>
              <Select
                value={state.stack!}
                onValueChange={(value) =>
                  dispatch({
                    type: 'SET_PROJECT',
                    payload: { stack: value as Tables<'projects'>['stack'] },
                  })
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
              <Input id="url" value={state.url!} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repo">Repository</Label>
              <Input
                id="repo"
                value={state.repo!}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                className="h-32"
                id="description"
                value={state.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="builtWith">Built With (comma-separated)</Label>
              <Input
                id="builtWith"
                value={state.built_with.join(', ')}
                onChange={(e) => {
                  dispatch({
                    type: 'SET_PROJECT',
                    payload: {
                      built_with: e.target.value
                        .split(',')
                        .map((item) => item.trim()),
                    },
                  });
                }}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={state.is_dark_badge_needed!}
                id="isDarkBadgeNeeded"
                onCheckedChange={(checked) =>
                  dispatch({
                    type: 'SET_PROJECT',
                    payload: { is_dark_badge_needed: checked },
                  })
                }
              />
              <Label htmlFor="isDarkBadgeNeeded">Dark Badge Needed</Label>
            </div>
          </div>
        </div>

        <Button className="w-full md:w-auto" type="submit">
          {isNewProject ? 'Create Project' : 'Update Project'}
        </Button>
      </form>

      <Dialog open={isFullImageViewOpen} onOpenChange={setIsFullImageViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>Full size project image</DialogTitle>
          <DialogDescription>
            This is the full-sized version of the project image.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              className="absolute right-0 top-0 z-10"
              size="sm"
              variant="destructive"
              onClick={() => setIsFullImageViewOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </DialogClose>
          <Image
            alt="Full size project image"
            className="h-[600px] w-[800px] object-cover"
            height={600}
            src={zoomImage}
            width={800}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ImageSelectionDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredImages: string[];
  onImageSelect: (image: string) => void;
  onZoomImage: (image: string) => void;
}

const ImageSelectionDrawer: React.FC<ImageSelectionDrawerProps> = ({
  isOpen,
  onOpenChange,
  searchTerm,
  setSearchTerm,
  filteredImages,
  onImageSelect,
  onZoomImage,
}) => (
  <Drawer open={isOpen} onOpenChange={onOpenChange}>
    <DrawerTrigger asChild>
      <Button
        className="w-full"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          onOpenChange(true);
        }}
      >
        Choose Existing Image
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="p-4">
        <DrawerHeader>
          <DrawerTitle>Select Image</DrawerTitle>
          <DrawerDescription>
            Tap and image to choose image and click zoom to view the image
          </DrawerDescription>
        </DrawerHeader>
        <div className="mb-4">
          <Input
            className="w-full"
            placeholder="Search images..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
          {filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div
                key={image}
                className="group relative cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-white"
              >
                <Image
                  alt="Project image"
                  className="h-[200px] w-[410px] object-cover"
                  height={200}
                  src={image}
                  width={410}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-black bg-opacity-50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    className="h-8 px-3"
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onZoomImage(image);
                    }}
                  >
                    <Maximize2 className="mr-1 h-4 w-4" />
                    Zoom
                  </Button>
                  <Button
                    className="h-8 px-3"
                    size="sm"
                    variant="secondary"
                    onClick={() => onImageSelect(image)}
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
);

interface ImageSelectionDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredImages: string[];
  onImageSelect: (image: string) => void;
  onZoomImage: (image: string) => void;
}
