'use client';
import { PaperGrid } from '@/components/papers/paper-grid';
import { papers } from '@/lib/papers';

export default function PapersPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Research Papers
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          A curated collection of influential research papers that have shaped
          my understanding.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <PaperGrid papers={papers} />
      </div>
    </div>
  );
}
