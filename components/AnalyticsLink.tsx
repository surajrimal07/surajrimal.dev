import siteMetadata from '@/data/siteMetadata';

const AnalyticsLink = () => {
  return (
    <button
      aria-label="Open analytics"
      type="button"
      className="ml-1 mr-1 h-8 w-16 rounded p-1 hover:bg-gray-200 dark:hover:bg-primary sm:ml-4"
      data-umami-event="nav-analytics"
      onClick={() => window.open(siteMetadata.analyticsURL, '_blank')}
    >
      Analytics
    </button>
  );
};

export default AnalyticsLink;
