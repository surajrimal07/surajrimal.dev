'use client';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import React, { use, useCallback, useEffect, useMemo, useState } from 'react';

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
import { Textarea } from '@/components/ui/textarea';
import {
  createCertification,
  getCertifications,
  updateCertification,
} from '@/lib/certification';
import { getProjectImages, uploadProjectImage } from '@/lib/project';
import type { Tables } from '@/types/database';
import { toastOptions } from '@/utils/toast';

type FormData = Omit<
  Tables<'certifications'>,
  'id' | 'created_at' | 'updated_at'
>;

export default function CertificationPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
  const [certification, setCertification] =
    useState<Tables<'certifications'> | null>(null);

  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [zoomImage, setZoomImage] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isFullImageViewOpen, setIsFullImageViewOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = useMemo(
    () =>
      projectImages.filter((image) =>
        image.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [projectImages, searchTerm],
  );

  const [formData, setFormData] = useState<FormData>({
    name: '',
    platform: '',
    completion_date: '',
    image_url: '',
    description: '',
    verification_link: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const images = await getProjectImages();
        setProjectImages(images);

        if (params.id !== 'new') {
          const certifications = await getCertifications();
          const cert = certifications.find(
            (c) => c.id === Number.parseInt(params.id),
          );
          if (cert) {
            setCertification(cert);
            setFormData(cert);
            setSelectedImage(cert.image_url);
          } else {
            notFound();
          }
        }
      } catch (error) {
        toast.error(
          `Failed to load data: ${
            error instanceof Error ? error.message : String(error)
          }`,
          toastOptions,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = useCallback((image: string) => {
    setSelectedImage(image);
    setFormData((prev) => ({ ...prev, image_url: image }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let imageUrl = selectedImage;
      if (uploadedImage) {
        imageUrl = await uploadProjectImage(uploadedImage);
      }

      const updatedFormData = {
        ...formData,
        image_url: imageUrl,
      };

      if (certification) {
        await updateCertification(certification.id, updatedFormData);
        toast.success('Certification updated successfully', toastOptions);
      } else {
        await createCertification(updatedFormData);
        toast.success('Certification created successfully', toastOptions);
      }
      router.push('/admin/certifications');
      router.refresh();
    } catch (error) {
      toast.error(
        `Failed to save certification: ${
          error instanceof Error ? error.message : String(error)
        }`,
        toastOptions,
      );
    } finally {
      setIsSubmitting(false);
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
            <BreadcrumbLink href="/admin/certifications">
              Certifications
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              Edit - {params.id === 'new' ? 'New' : formData.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mb-6 mt-2 text-3xl font-bold">
        {params.id === 'new'
          ? 'Create New Certification'
          : 'Edit Certification'}
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label>Certification Image</Label>
          <div className="rounded-lg border p-4">
            {selectedImage || previewUrl ? (
              <div className="space-y-4">
                <div className="relative">
                  <Image
                    alt="Certification image"
                    className="h-[200px] w-full rounded-md object-cover"
                    height={200}
                    priority={true}
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
                      setFormData((prev) => ({ ...prev, image_url: '' }));
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

        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            required
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Input
            required
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="completion_date">Completion Date</Label>
          <Input
            required
            id="completion_date"
            name="completion_date"
            type="date"
            value={formData.completion_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="verification_link">Verification Link</Label>
          <Input
            id="verification_link"
            name="verification_link"
            value={formData.verification_link || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
          />
        </div>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Saving...' : 'Save Certification'}
        </Button>
      </form>

      <Dialog open={isFullImageViewOpen} onOpenChange={setIsFullImageViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>Full size certification image</DialogTitle>
          <DialogDescription>
            This is the full-sized version of the certification image.
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
            alt="Full size certification image"
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
            Tap an image to choose it and click zoom to view the image
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
                  alt="Certification image"
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
