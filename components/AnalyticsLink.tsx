import siteMetadata from '@/data/siteMetadata';
import usePlaySound from './PlaySound';

const AnalyticsLink = () => {
  const { playSound } = usePlaySound({ filePath: '/static/sounds/open.mp3', volume: 0.7 });

  const handleClick = () => {
    playSound();
    window.open(siteMetadata.analyticsURL, '_blank');
  };
  
  return (
    <div>
      <button
        aria-label="Open analytics"
        type="button"
        className="rounded"
        data-umami-event="nav-analytics"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hover:text-red-500 hover:dark:text-red-500"
          style={{ width: '1.5em', height: '1.5em' }}
          fill="currentColor"
          overflow="hidden"
          viewBox="0 0 1024 1024"
        >
          <path d="M213.333 512a42.667 42.667 0 00-42.666 42.667V896A42.667 42.667 0 00256 896V554.667A42.667 42.667 0 00213.333 512zM426.667 85.333A42.667 42.667 0 00384 128v768a42.667 42.667 0 0085.333 0V128a42.667 42.667 0 00-42.666-42.667zm426.666 597.334a42.667 42.667 0 00-42.666 42.666V896A42.667 42.667 0 00896 896V725.333a42.667 42.667 0 00-42.667-42.666zM640 341.333A42.667 42.667 0 00597.333 384v512a42.667 42.667 0 0085.334 0V384A42.667 42.667 0 00640 341.333z"></path>
        </svg>
      </button>
    </div>
  );
};

export default AnalyticsLink;
