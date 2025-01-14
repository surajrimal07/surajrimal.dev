import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Paper } from '@/lib/papers';
import { Calendar, Clock } from 'lucide-react';

const formatDate = (date: Date) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

interface PaperContentProps {
  paper: Paper;
}

export function PaperContent({ paper }: PaperContentProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      <div>
        <div className="flex gap-2 mb-4">
          <Badge variant="secondary">{paper.category}</Badge>
          <Badge variant="outline">{paper.conference}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">{paper.title}</h1>
        <div className="flex flex-wrap gap-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              Read on{' '}
              {paper.readingDate && formatDate(new Date(paper.readingDate))}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Published {paper.year}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 prose prose-neutral dark:prose-invert max-w-none">
          {paper.content?.split('\n\n').map((paragraph, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <p key={index} className="text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
