// import { generateSitemap } from 'pliny/utils/generate-sitemap.js';
// import siteMetadata from '../data/siteMetadata.js';
// import { allBlogs } from '../.contentlayer/generated/index.mjs';

// const sitemap = () => {
//   generateSitemap(siteMetadata.siteUrl, allBlogs);
//   console.log('Sitemap generated...');
// };
// export default sitemap;


import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
