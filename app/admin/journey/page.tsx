'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { AlertCircle, Edit, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import {
  deleteJourneyEvent,
  getJourneyEvents,
  insertJourneyEvent,
  updateJourneyEvent,
} from '@/lib/journey';
import { Tables } from '@/types/database';
import { toastOptions } from '@/utils/toast';

const JourneyEventManager = () => {
  const [journeyEvents, setJourneyEvents] = useState<
    Tables<'journey_events'>[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] =
    useState<Tables<'journey_events'> | null>(null);
  const [eventToDelete, setEventToDelete] =
    useState<Tables<'journey_events'> | null>(null);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const fetchJourneyEvents = useCallback(async () => {
    try {
      const events = await getJourneyEvents();
      setJourneyEvents(events);
    } catch (err) {
      const error = `Failed to fetch journey events: ${err instanceof Error ? err.message : String(err)}`;
      setError(error);
      toast.error(error, toastOptions);
    }
  }, []);

  useEffect(() => {
    fetchJourneyEvents();
  }, [fetchJourneyEvents]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCurrentEvent((prev) => (prev ? { ...prev, [name]: value } : null));
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    },
    []
  );

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setCurrentEvent((prev) => (prev ? { ...prev, is_current: checked } : null));
  }, []);

  const validateEvent = (event: Tables<'journey_events'>): boolean => {
    const errors: { [key: string]: string } = {};
    if (!event.title.trim()) errors.title = 'Title is required';
    if (!event.description?.trim())
      errors.description = 'Description is required';
    if (!event.date) errors.date = 'Date is required';
    if (!event.color.trim()) errors.color = 'Color is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveEvent = useCallback(async () => {
    try {
      if (currentEvent && validateEvent(currentEvent)) {
        if ('id' in currentEvent) {
          await updateJourneyEvent(currentEvent.id, currentEvent);
        } else {
          await insertJourneyEvent(currentEvent);
        }
        await fetchJourneyEvents();
        toast.success(
          `Journey event ${
            'id' in currentEvent ? 'updated' : 'added'
          } successfully`,
          toastOptions
        );
        setIsDialogOpen(false);
        setCurrentEvent(null);
        setValidationErrors({});
      }
    } catch (err) {
      const error = `Failed to save journey event: ${err instanceof Error ? err.message : String(err)}`;
      setError(error);
      toast.error(error, toastOptions);
    }
  }, [currentEvent, fetchJourneyEvents]);

  const handleEditEvent = useCallback((event: Tables<'journey_events'>) => {
    setCurrentEvent(event);
    setValidationErrors({});
    setIsDialogOpen(true);
  }, []);

  const handleDeleteEvent = useCallback(
    async (event: Tables<'journey_events'>) => {
      setEventToDelete(event);
      setIsDeleteDialogOpen(true);
    },
    []
  );

  const confirmDeleteEvent = useCallback(async () => {
    if (eventToDelete) {
      try {
        await deleteJourneyEvent(eventToDelete.id);
        toast.success('Journey event deleted successfully', toastOptions);
        await fetchJourneyEvents();
      } catch (err) {
        const error = `Failed to delete journey event: ${err instanceof Error ? err.message : String(err)}`;
        setError(error);
        toast.error(error, toastOptions);
      } finally {
        setIsDeleteDialogOpen(false);
        setEventToDelete(null);
      }
    }
  }, [eventToDelete, fetchJourneyEvents]);

  const handleAddNewEvent = useCallback(() => {
    setCurrentEvent({
      title: '',
      icon: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      is_current: false,
      color: '',
    } as Tables<'journey_events'>);
    setValidationErrors({});
    setIsDialogOpen(true);
  }, []);

  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  All Journeys - {journeyEvents.length}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button onClick={handleAddNewEvent}>Add Journey</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journeyEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>
                  {new Date(event.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{event.is_current ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEvent(event)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentEvent && 'id' in currentEvent
                  ? 'Edit Journey Event'
                  : 'Add Journey Event'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input
                  name="title"
                  placeholder="Event Title"
                  value={currentEvent?.title || ''}
                  onChange={handleInputChange}
                />
                {validationErrors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.title}
                  </p>
                )}
              </div>
              <Input
                name="icon"
                placeholder="Icon Name"
                value={currentEvent?.icon || ''}
                onChange={handleInputChange}
              />
              <div>
                <Textarea
                  name="description"
                  placeholder="Event Description"
                  value={currentEvent?.description || ''}
                  onChange={handleInputChange}
                />
                {validationErrors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.description}
                  </p>
                )}
              </div>
              <div>
                <Input
                  name="date"
                  type="date"
                  value={currentEvent?.date || ''}
                  onChange={handleInputChange}
                />
                {validationErrors.date && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.date}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_current"
                  checked={currentEvent?.is_current || false}
                  onCheckedChange={handleCheckboxChange}
                />
                <label htmlFor="is_current">Current Event</label>
              </div>
              <div>
                <Input
                  name="color"
                  placeholder="Color"
                  value={currentEvent?.color || ''}
                  onChange={handleInputChange}
                />
                {validationErrors.color && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.color}
                  </p>
                )}
              </div>
              <Button onClick={handleSaveEvent}>Save Event</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the event "
                {eventToDelete?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteEvent}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default JourneyEventManager;
