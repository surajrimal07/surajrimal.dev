import { BackButton } from '@/components/papers/back-button';
import { PaperContent } from '@/components/papers/paper-content';
import { PaperHeader } from '@/components/papers/paper-header';
import { PaperSidebar } from '@/components/papers/paper-sidebar';
import { papers } from '@/lib/papers';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return papers.map((paper) => ({
    id: paper.id.toString(),
  }));
}

export default async function PaperDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const paper = papers.find((p) => p.id === Number.parseInt(id));

  if (!paper) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <PaperHeader paper={paper} />
      <main className="max-w-7xl mx-auto px-6 -mt-32 relative">
        <div>
          <BackButton />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PaperContent paper={paper} />
            <PaperSidebar paper={paper} />
          </div>
        </div>
      </main>
    </div>
  );
}
