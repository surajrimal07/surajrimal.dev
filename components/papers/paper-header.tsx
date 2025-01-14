import type { Paper } from '@/lib/papers';

interface PaperHeaderProps {
  paper: Paper;
}

export function PaperHeader({ paper }: PaperHeaderProps) {
  return (
    <div className="relative h-[40vh] bg-gradient-to-b from-primary/20 to-background">
      <img
        src={paper.image}
        alt={paper.title}
        className="w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
