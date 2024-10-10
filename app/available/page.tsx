'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Ensure the path is correct
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAvailabilityData, saveSubscriberEmail } from '@/lib/availablity';
import { validateEmail } from '@/lib/validation/email';
import { AvailabilityData } from '@/types/availablity';
import { toastOptions } from '@/utils/toast';

export default function AvailabilityPage() {
  const router = useRouter();
  const [showHireMe, setShowHireMe] = useState(false);
  
  const [email, setEmail] = useState('');
  const [availabilityData, setAvailabilityData] =
    useState<AvailabilityData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAvailabilityData();

      setAvailabilityData(data);

      if (data?.is_available) {
        const timer = setTimeout(() => setShowHireMe(true), 1000);
        return () => clearTimeout(timer);
      }
    };

    fetchData();
  }, []);

  const handleNotifyClick = async () => {
    if (validateEmail(email)) {
      try {
        await saveSubscriberEmail(email);
        toast.success(
          `You will recieve email when author becomes available for work.`,
          toastOptions
        );
      } catch (error) {
        toast.error(error.message, toastOptions);
      }
    } else {
      toast.error(`Please input a valid email for notification`, toastOptions);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mx-auto w-full max-w-md overflow-hidden">
          <motion.div transition={{ duration: 0.3 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Availability Status
              </CardTitle>
              <CardDescription>Current work availability</CardDescription>
            </CardHeader>
          </motion.div>
          <CardContent>
            <motion.div
              className="mb-4 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge
                variant={
                  availabilityData?.is_available ? 'success' : 'destructive'
                }
                className="flex items-center px-3 py-1 text-sm"
              >
                {availabilityData?.is_available ? (
                  <>
                    <CheckCircle className="mr-1 h-4 w-4" /> Available
                  </>
                ) : (
                  <>
                    <XCircle className="mr-1 h-4 w-4" /> Unavailable
                  </>
                )}
              </Badge>
              {availabilityData?.is_available &&
                availabilityData?.hours_per_week !== null && (
                  <motion.div
                    className="flex items-center text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Clock className="mr-1 h-4 w-4" />
                    {availabilityData?.hours_per_week} hours/week
                  </motion.div>
                )}
            </motion.div>
            <motion.p
              className="mb-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Last updated:{' '}
              {availabilityData?.last_updated
                ? new Date(availabilityData?.last_updated).toLocaleString()
                : 'N/A'}
            </motion.p>
            <AnimatePresence>
              {availabilityData?.is_available && showHireMe && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    onClick={() => router.push('/contact')}
                    className="w-full"
                    size="lg"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Hire Me
                  </Button>
                </motion.div>
              )}
              {!availabilityData?.is_available && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Button
                    onClick={handleNotifyClick}
                    className="mt-4 w-full"
                    size="lg"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notify Me
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
