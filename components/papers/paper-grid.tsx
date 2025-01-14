import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Paper } from '@/lib/papers';
import { motion } from 'framer-motion';
import { Calendar, User2 } from 'lucide-react';
import Link from 'next/link';

interface PaperGridProps {
  papers: Paper[];
}

export function PaperGrid({ papers }: PaperGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {papers.map((paper, index) => (
        <Link href={`/papers/${paper.id}`} key={paper.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              <CardHeader className="relative p-0">
                <div className="w-full h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={paper.image}
                    alt={paper.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {paper.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {paper.conference}
                  </Badge>
                </div>
                <CardTitle className="mb-2 line-clamp-2">
                  {paper.title}
                </CardTitle>
                <CardDescription className="mb-4 line-clamp-2 flex-1">
                  {paper.summary}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
                  <div className="flex items-center gap-1">
                    <User2 className="w-4 h-4" />
                    <span className="hover:text-primary transition-colors">
                      {paper.authors[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{paper.year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
