'use client';

import { Button } from '../ui/button';

function ContributionError({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
      <div className="space-y-4 text-center">
        <h2 className="text-lg font-semibold text-red-500">
          Failed to load contributions
        </h2>
        <Button onClick={reset} type="button">
          Try again
        </Button>
      </div>
    </div>
  );
}

export default function CustomError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ContributionError reset={reset} />;
}
