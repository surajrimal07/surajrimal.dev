export function timeAgo(timestamp: Date, locale: string = 'en'): string {
  const now = new Date();
  const diffInSeconds = (now.getTime() - timestamp.getTime()) / 1000;

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
  } else if (diffInSeconds >= thresholds.month) {
    return rtf.format(-Math.floor(diffInSeconds / thresholds.month), 'month');
  } else if (diffInSeconds >= thresholds.day) {
    return rtf.format(-Math.floor(diffInSeconds / thresholds.day), 'day');
  } else if (diffInSeconds >= thresholds.hour) {
    return rtf.format(-Math.floor(diffInSeconds / thresholds.hour), 'hour');
  } else if (diffInSeconds >= thresholds.minute) {
    return rtf.format(-Math.floor(diffInSeconds / thresholds.minute), 'minute');
  } else {
    return rtf.format(-Math.floor(diffInSeconds), 'second');
  }
}
