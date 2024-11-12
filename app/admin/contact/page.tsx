'use client';

import { useEffect, useState } from 'react';

import { MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tables } from '@/types/database';
import { toastOptions } from '@/utils/toast';

export default function AdminContactsComponent() {
  const [contacts, setContacts] = useState<Tables<'contacts'>[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [showResponded, setShowResponded] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contact');
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        } else {
          toast.error('Failed to fetch contacts', toastOptions);
        }
      } catch (error) {
        toast.error(`Error fetching contacts: ${error}`, toastOptions);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setContacts(contacts.filter((contact) => contact.id !== id));
        toast.success('Contact deleted successfully', toastOptions);
      } else {
        toast.error(`Failed to delete contact`, toastOptions);
      }
    } catch (error) {
      toast.error(`Error deleting contact ${error}`, toastOptions);
    }
  };

  const handleResponded = async (id: number, type: string) => {
    const newcontacts = {
      responded: type === 'responded',
      responded_at: type === 'responded' ? new Date().toISOString() : null,
    };
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(newcontacts),
      });

      if (response.ok) {
        setContacts(
          contacts.map((contact) =>
            contact.id === id
              ? {
                  ...contact,
                  responded: newcontacts.responded,
                  responded_at: newcontacts.responded_at,
                }
              : contact
          )
        );

        toast.success(`Contact marked as ${type}`, toastOptions);
      } else {
        toast.error(`Failed to mark contact as ${type}`, toastOptions);
      }
    } catch (error) {
      toast.error(`Error marking contact as ${type}: ${error}`, toastOptions);
    }
  };

  const handleRespond = (contact: Tables<'contacts'>) => {
    window.open(`mailto:${contact.email}?subject=Re: ${contact.purpose}`);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (showResponded ? contact.responded : !contact.responded)
  );

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contacts - {contacts.length}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-4 flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="responded"
            checked={showResponded}
            onCheckedChange={(checked) => setShowResponded(checked as boolean)}
          />
          <label htmlFor="responded">Show Responded</label>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Created At</TableHead>
            {showResponded && <TableHead>Responded</TableHead>}
            {showResponded && <TableHead>Responded At</TableHead>}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.purpose}</TableCell>
              <TableCell>
                {contact.created_at
                  ? new Date(contact.created_at).toLocaleString()
                  : 'N/A'}
              </TableCell>

              {showResponded && (
                <TableCell>{contact.responded ? 'True' : 'False'}</TableCell>
              )}

              {showResponded && (
                <TableCell>
                  {contact.responded_at
                    ? new Date(contact.responded_at).toLocaleString()
                    : 'N/A'}
                </TableCell>
              )}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          View
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                          <p>
                            <strong>Name:</strong> {contact.name || 'N/A'}
                          </p>
                          <p>
                            <strong>Email:</strong> {contact.email || 'N/A'}
                          </p>
                          <p>
                            <strong>Purpose:</strong> {contact.purpose || 'N/A'}
                          </p>
                          <p>
                            <strong>Stack:</strong> {contact.stack || 'N/A'}
                          </p>
                          <p>
                            <strong>Custom Stack:</strong>{' '}
                            {contact.custom_stack || 'N/A'}
                          </p>
                          <p>
                            <strong>Project Description:</strong>{' '}
                            {contact.project_description || 'N/A'}
                          </p>
                          <p>
                            <strong>Cost Expectations:</strong>{' '}
                            {contact.cost_expectations || 'N/A'}
                          </p>
                          <p>
                            <strong>Message:</strong> {contact.message || 'N/A'}
                          </p>
                          <p>
                            <strong>User Session:</strong>{' '}
                            {contact.user_session || 'N/A'}
                          </p>
                          <p>
                            <strong>Created At:</strong>{' '}
                            {contact.created_at
                              ? new Date(contact.created_at).toLocaleString()
                              : 'N/A'}
                          </p>
                          <p>
                            <strong>Responded:</strong>{' '}
                            {contact.responded ? 'True' : 'False'}
                          </p>
                          <p>
                            <strong>Responded At:</strong>{' '}
                            {contact.responded_at
                              ? new Date(contact.responded_at).toLocaleString()
                              : 'N/A'}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuItem onSelect={() => handleRespond(contact)}>
                      Respond
                    </DropdownMenuItem>
                    {!contact.responded ? (
                      <DropdownMenuItem
                        onSelect={() =>
                          contact.id !== undefined &&
                          handleResponded(contact.id, 'responded')
                        }
                      >
                        Mark as Responded
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onSelect={() =>
                          contact.id !== undefined &&
                          handleResponded(contact.id, 'not_responded')
                        }
                      >
                        Not Responded?
                      </DropdownMenuItem>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                        </DialogHeader>
                        <p>Are you sure you want to delete this contact?</p>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              contact.id !== undefined &&
                              handleDelete(contact.id)
                            }
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
