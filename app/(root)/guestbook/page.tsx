'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { Edit2, Loader2, Pin, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { GUESTBOOK_ENTRIES_LIMIT } from '@/constants/index';
import useAuthStore from '@/lib/store/authStore';
import type { Tables } from '@/types/database';
import { gravatarURL } from '@/utils/gravatarHash';
import { supabase } from '@/utils/supabase/client';
import { useSuperadminStatus } from '@/utils/supabase/superAdmin';
import { timeAgo } from '@/utils/time';
import { toastOptions } from '@/utils/toast';

export default function Guestbook() {
  const [entries, setEntries] = useState<Tables<'guestbook'>[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState('');
  const { user, isLoading: isAuthLoading } = useAuthStore();

  const { isSuperadmin, isLoading: isLoadingSuperadminStatus } =
    useSuperadminStatus(user);

  const userExistingEntry = user
    ? entries.find((entry) => entry.email === user.email)
    : null;

  const fetchEntries = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc(
        'get_latest_guestbook_entries',
        {
          limit_count: GUESTBOOK_ENTRIES_LIMIT,
        },
      );

      if (error) throw error;
      setEntries(data as Tables<'guestbook'>[]);
    } catch (error) {
      console.error('Error fetching entries:', error);
      toast.error('Failed to load guestbook entries', toastOptions);
    } finally {
      setIsLoadingEntries(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to submit an entry.');
      return;
    }

    if (userExistingEntry) {
      toast.error(
        'You have existing entry, user can only post one guestbook, consider editing existing entry.',
        toastOptions,
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.rpc('save_guestbook_entry', {
        p_name: user.user_metadata.full_name,
        p_email: user.email,
        p_message: message.trim(),
      });

      if (error) {
        throw error;
      }

      toast.success(
        'Your message has been added to the guestbook!',
        toastOptions,
      );
      setMessage('');
      fetchEntries();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to submit entry. Please try again.',
        toastOptions,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (entryId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('delete_guestbook_entry', {
        p_id: entryId,
      });

      if (error) throw error;

      if (!data) {
        throw new Error('You can only delete your own entries.');
      }

      toast.success('Entry deleted successfully!', toastOptions);
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to delete entry. Please try again.',
        toastOptions,
      );
    }
  };

  const handleEdit = async (entryId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('update_guestbook_entry', {
        p_id: entryId,
        p_message: editMessage.trim(),
      });

      if (error) throw error;

      if (!data) {
        throw new Error('You can only edit your own entries.');
      }

      toast.success('Entry updated successfully!', toastOptions);
      setEditingEntry(null);
      setEditMessage('');
      fetchEntries();
    } catch (error) {
      console.error('Error updating entry:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update entry. Please try again.',
        toastOptions,
      );
    }
  };

  const startEdit = (entry: Tables<'guestbook'>) => {
    setEditingEntry(entry.id);
    setEditMessage(entry.message);
  };

  const separateEntries = () => {
    if (!user) return { userEntry: null, otherEntries: entries };

    const userEntry = entries.find((entry) => entry.email === user.email);
    const otherEntries = entries.filter((entry) => entry.email !== user.email);

    return { userEntry, otherEntries };
  };

  const { userEntry, otherEntries } = separateEntries();

  const renderEntry = (entry: Tables<'guestbook'>, isUserEntry = false) => (
    <div
      key={entry.id}
      className={`rounded-lg ${isUserEntry ? 'bg-gray-800' : 'bg-gray-900'} p-4 transition-all`}
    >
      {isUserEntry && <div className="mb-2 font-medium">Your post</div>}
      <div className="flex items-start space-x-4">
        <Image
          alt={entry.name}
          className="rounded-full"
          height={40}
          priority={isUserEntry}
          src={gravatarURL(entry.email)}
          width={40}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="truncate font-semibold">{entry.name}</h3>
            <div className="flex items-center gap-2">
              {user &&
                !isAuthLoading &&
                (user.email === entry.email ||
                  (!isLoadingSuperadminStatus && isSuperadmin)) && (
                  <div className="flex items-center">
                    {user.email === entry.email && editingEntry === entry.id ? (
                      <Button
                        className="text-gray-400 hover:text-white"
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingEntry(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    ) : (
                      user.email === entry.email && (
                        <Button
                          className="text-gray-400 hover:text-white"
                          size="sm"
                          variant="ghost"
                          onClick={() => startEdit(entry)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )
                    )}
                    <Button
                      className="text-gray-400 hover:text-red-500"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              <span className="text-xs text-gray-400">
                {timeAgo(new Date(entry.created_at))}
              </span>
            </div>
          </div>
          {editingEntry === entry.id ? (
            <div className="space-y-2">
              <Textarea
                className="min-h-[60px] w-full resize-none border-gray-700 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500"
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  className="text-gray-400 hover:text-white"
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingEntry(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={!editMessage.trim()}
                  size="sm"
                  onClick={() => handleEdit(entry.id)}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="break-words text-gray-300">{entry.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-4xl space-y-8 p-4">
        <header className="text-left">
          <h1 className="mb-2 text-5xl font-bold">Guestbook</h1>
          <p className="text-gray-400">
            Sign my guestbook and share your idea. You can tell me anything
            here!
          </p>
        </header>

        <div className="rounded-md bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-white">
          <div className="flex items-center gap-2">
            <Pin className="h-5 w-5" />
            <span className="font-semibold">Pinned</span>
          </div>
          <p>
            Hey there! Thanks for visiting my website. If you have a moment,
            I&apos;d love to hear your thoughts on my work. Please log in with
            your account to leave a comment. Remember to keep language
            respectful and avoid using any inappropriate words. Thanks!
          </p>
        </div>

        {!user ? (
          <div className="text-center">
            <Link href="/auth">
              <Button className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2 font-semibold text-white hover:opacity-90">
                Login
              </Button>
            </Link>
            <span className="ml-2 text-gray-400">
              to continue leaving a message
            </span>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <Textarea
              required
              className="max-h-[100px] min-h-[100px] w-full resize-none border-gray-700 bg-gray-900 text-white"
              disabled={isSubmitting}
              placeholder="Leave a message..."
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
              disabled={isSubmitting || !message.trim()}
              type="submit"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                'Post to Guestbook'
              )}
            </Button>
          </form>
        )}

        <div className="space-y-4">
          {isLoadingEntries ? (
            <div className="space-y-4">
              {[...Array(10)].map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div className="py-4 text-center text-gray-400">
              No entries yet. Be the first to sign the guestbook!
            </div>
          ) : (
            <>
              {userEntry && renderEntry(userEntry, true)}
              {otherEntries.map((entry) => renderEntry(entry))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
