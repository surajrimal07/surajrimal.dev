import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';

export function Weather() {
  const { data, error, isLoading } = useSWR('/api/weather', fetcher);

  console.log(`data recieved in client side is ${data}`); //undefined

  return {
    data,
    isLoading,
    isError: error,
  };
}
