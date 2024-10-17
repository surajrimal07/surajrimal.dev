'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  getAvailabilityData,
  getSubscribers,
  saveAvailabilityData,
} from '@/lib/availablity';
import { useAvailabilityStore } from '@/lib/hooks/availablityState';
import { AvailabilityData } from '@/types/availablity';
import { toastOptions } from '@/utils/toast';

export default function AdminAvailabilityPage() {
  const [availableData, setAvailabilityData] =
    useState<AvailabilityData | null>(null);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAvailabilityData } = useAvailabilityStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAvailabilityData();
        setAvailabilityData(data);
        const subs = await getSubscribers();
        setSubscribers(subs);
      } catch (error) {
        toast.error('Failed to load data', toastOptions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateAvailability = async () => {
    if (!availableData) return;

    const updatedData: AvailabilityData = {
      ...availableData,
      last_updated: new Date().toISOString(),
    };

    await saveAvailabilityData(updatedData);

    fetchAvailabilityData();

    toast.success('Availability updated successfully', toastOptions);
  };

  if (isLoading) {
    return <AdminLoading />;
  }

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Availablity - {subscribers.length}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 mt-5">
          <CardHeader>
            <CardTitle>Manage Availability</CardTitle>
            <CardDescription>
              Update your current availability status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="availability">Available for work</Label>
                <Switch
                  id="availability"
                  checked={availableData?.is_available}
                  onCheckedChange={(checked) =>
                    setAvailabilityData((prev) => ({
                      ...prev!,
                      is_available: checked,
                    }))
                  }
                />
              </div>
              <div className="flex w-1/2 flex-col space-y-1.5">
                <Label htmlFor="hours">Hours per week</Label>
                <Input
                  id="hours"
                  type="number"
                  value={availableData?.hours_per_week || ''}
                  onChange={(e) =>
                    setAvailabilityData((prev) => ({
                      ...prev!,
                      hours_per_week: parseInt(e.target.value) || null,
                    }))
                  }
                  disabled={!availableData?.is_available}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpdateAvailability}>
              Update Availability
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscribers</CardTitle>
            <CardDescription>
              People who want to be notified when you're available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>
                      {new Date(subscriber.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
