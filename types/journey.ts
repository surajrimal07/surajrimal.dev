export type JourneyEvent = {
  id: number; // Unique identifier for each event
  title: string; // Title of the event, e.g., "Graduated College"
  icon: string; // Icon name, e.g., "FaGraduationCap"
  description?: string; // Optional description of the event
  date: string; // Date of the event in ISO format (YYYY-MM-DD)
  is_current: boolean; // Indicates if it's the current event, e.g., "Present"
  label?: string; // Optional label like "Present" or "2022"
  color: string; // Background color for the icon (e.g., "bg-blue-200")
};
