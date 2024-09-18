export interface WorkStatus {
  status: string;
  message: string;
  data: unknown;
}

export async function getWorkStatus(): Promise<WorkStatus> {
  const response = await fetch('/api/work-status');
  const data = await response.json();
  return data;
}
