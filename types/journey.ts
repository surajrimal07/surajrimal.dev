export type JourneyEvent = {
  id: number;
  title: string;
  icon: string;
  description?: string;
  date: string;
  is_current: boolean;
  label?: string;
  color: string;
};
