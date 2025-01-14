export function timeAgo(timestamp: Date, locale = 'en'): string {
  const now = new Date();
  const diffInSeconds = (now.getTime() - timestamp.getTime()) / 1000;

  if (diffInSeconds < 60) {
    return 'now';
  }

  const thresholds = {
    year: 60 * 60 * 24 * 365,
    month: 60 * 60 * 24 * 30,
    day: 60 * 60 * 24,
    hour: 60 * 60,
    minute: 60,
  };

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds >= thresholds.year) {
    return rtf.format(-Math.floor(diffInSeconds / thresholds.year), 'year');
  }
  if (diffInSeconds >= thresholds.month) {
    return rtf.format(-Math.floor(diffInSeconds / thresholds.month), 'month');
  }
  if (diffInSeconds >= thresholds.day) {
    return rtf.format(-Math.floor(diffInSeconds / thresholds.day), 'day');
  }
  if (diffInSeconds >= thresholds.hour) {
    return rtf.format(-Math.floor(diffInSeconds / thresholds.hour), 'hour');
  }
  if (diffInSeconds >= thresholds.minute) {
    return rtf.format(-Math.floor(diffInSeconds / thresholds.minute), 'minute');
  }
  return rtf.format(-Math.floor(diffInSeconds), 'second');
}

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};


export function formatDates(date: Date | string): string {
  const d = new Date(date);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dd = d.getDate().toString().padStart(2, '0');
  const MMM = months[d.getMonth()];
  const yyyy = d.getFullYear();
  const HH = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');

  return `${dd} ${MMM} ${yyyy}, ${HH}:${mm}`;
}