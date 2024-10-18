import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';

export function Weather() {
  const { data, error, isLoading } = useSWR('/api/weather', fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
