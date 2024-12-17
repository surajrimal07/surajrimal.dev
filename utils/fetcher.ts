export async function fetcher(...args: unknown[]) {
  // @ts-expect-error fetch is a global function
  const res = await fetch(...args);

  return res.json();
}
