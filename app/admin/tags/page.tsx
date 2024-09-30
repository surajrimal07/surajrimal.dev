'use client';

import { useState } from 'react';

import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const initialTags = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'React' },
  { id: 3, name: 'CSS' },
  { id: 4, name: 'Next.js' },
];

export default function TagsPage() {
  const [tags, setTags] = useState(initialTags);
  const [newTagName, setNewTagName] = useState('');

  const handleAddTag = () => {
    if (newTagName.trim()) {
      setTags([...tags, { id: tags.length + 1, name: newTagName.trim() }]);
      setNewTagName('');
    }
  };

  const handleDeleteTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Tags</h1>
      <div className="mb-6 flex space-x-2">
        <Input
          placeholder="New tag name"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <Button onClick={handleAddTag}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Tag
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell className="font-medium">{tag.name}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => handleDeleteTag(tag.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
