import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { RateLimitResult } from '@/lib/rate-limit';
import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  Github,
  Globe,
  InfoIcon,
  TwitterIcon,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ThemeCustomizer } from './theme-customizer';

interface InfoDialogProps {
  className?: string;
  rateLimit: RateLimitResult;
}

export default function InfoDialog({ className, rateLimit }: InfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'flex items-center gap-1 place-self-end text-xs text-muted-foreground',
          className,
        )}
      >
        <InfoIcon className="size-4 sm:size-3" />
        <span className="hidden sm:flex">Suraj&apos;s AI</span>
        <span>*</span>
        <span className="hidden sm:flex">Remaining: {rateLimit.remaining}</span>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Suraj&apos;s AI</DialogTitle>
          <DialogDescription>Welcome to my AI portfolio!</DialogDescription>
          <div className="text-xs text-muted-foreground">
            Heavily inspired by{' '}
            <Link
              href="https://chat.brodin.dev"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              chat.brodin.dev
            </Link>
            . Special thanks to him.
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="https://github.com/surajrimal07/surajrimal.dev"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                target="_blank"
              >
                <Github className="size-4" />
                Project Repo
              </Link>
              <Link
                href="https://www.surajrimal.dev"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                target="_blank"
              >
                <Globe className="size-4" />
                Portfolio
              </Link>
              <Link
                href="https://github.com/surajrimal07"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                target="_blank"
              >
                <User className="size-4" />
                GitHub Profile
              </Link>
              <Link
                href="https://x.com/0x100000"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                target="_blank"
              >
                <TwitterIcon className="size-4" />
                Twitter
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Privacy Concerns</h3>
            <p className="text-sm text-muted-foreground">
              Please be aware that all conversations are saved and visible to
              anyone. (Don&apos;t ask crazy questions, we see you)
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              How Suraj&apos;s AI Knows About Me
            </h3>
            <p className="text-sm text-muted-foreground">
              I give to an AI model (llama) context about my career and how it
              should answer your questions. I still noticed some hallucinations
              from the AI so don&apos;t trust everything it says.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Rate limits stats for Suraj&apos;s AI
            </h3>

            <div className="space-y-2 text-sm text-muted-foreground">
              {rateLimit.remaining === 0 ? (
                <p className="text-red-500">
                  You have reached your lifetime conversation limit. Please
                  email me at davidparkedme@gmail.com for more information.
                </p>
              ) : (
                <p>Remaining conversations: {rateLimit.remaining}</p>
              )}
            </div>
          </div>
          <ThemeCustomizer />
          <div className="pt-2">
            <Link href="/conversations" passHref>
              <Button variant="outline" className="w-full">
                <AlertTriangle className="mr-2 size-4 text-yellow-500" />
                Do not click on this
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
