import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Paper } from '@/lib/papers';
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

interface PaperSidebarProps {
  paper: Paper;
}

export function PaperSidebar({ paper }: PaperSidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Paper Information</h3>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Authors</span>
              <div className="mt-1">
                {paper.authors.map((author, index) => (
                  <Link
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    href={`https://scholar.google.com/scholar?q=author:${encodeURIComponent(author)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary transition-colors block"
                  >
                    {author}
                  </Link>
                ))}
              </div>
            </div>
            <Separator />
            {paper.keywords && (
              <>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Keywords
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {paper.keywords.map((keyword, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}
            {paper.doi && (
              <div>
                <label
                  htmlFor="doi-link"
                  className="text-sm text-muted-foreground"
                >
                  DOI
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <LinkIcon className="w-4 h-4" />
                  <a
                    id="doi-link"
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {paper.doi}
                  </a>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
