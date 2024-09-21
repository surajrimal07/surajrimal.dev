// 'use client';

// import { updatePageViews } from '@/lib/pageView';
// import { useEffect, useState } from 'react';
// import AnimatedCounter from '../animata/text/counter';

// const PageView = () => {
//   const [blogView, setBlogView] = useState<number>(0);
//   const [blogShare, setBlogShare] = useState<number>(0);

//   useEffect(() => {
//     const fetchPageViews = async () => {
//       try {
//         const views = await updatePageViews(pathname);
//         setBlogView(views);
//       } catch (error) {
//         console.error('Failed to fetch page views:', error);
//       }
//     };

//     fetchPageViews();
//   }, [pathname]);

//   return (
//     <p>
//       {' '}
//       Page View <AnimatedCounter targetValue={blogView} />
//       Page Share <AnimatedCounter targetValue={blogShare} />
//     </p>
//   );
// };

// export default PageView;
