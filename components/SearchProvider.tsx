'use client';

import { useRouter } from 'next/navigation';

import { Blog, Snippets } from 'contentlayer/generated';
import { KBarSearchProvider } from 'pliny/search/KBar';

export const SearchProvider = ({ children }) => {
  const router = useRouter();
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          {
            id: 'homepage',
            name: 'Homepage',
            keywords: 'homepage',
            shortcut: ['h'],
            section: 'Home',
            perform: () => router.push('/'),
          },
          {
            id: 'projects',
            name: 'Projects',
            keywords: 'projects',
            shortcut: ['p'],
            section: 'Home',
            perform: () => router.push('/projects'),
          },
          {
            id: 'blogs',
            name: 'Blogs',
            keywords: 'blogs',
            shortcut: ['b'],
            section: 'Home',
            perform: () => router.push('/blog'),
          },
          {
            id: 'tags',
            name: 'Tags',
            keywords: 'tags',
            shortcut: ['t'],
            section: 'Home',
            perform: () => router.push('/tags'),
          },
          {
            id: 'projects',
            name: 'Projects',
            keywords: 'projects',
            shortcut: ['p'],
            section: 'Home',
            perform: () => router.push('/projects'),
          },
          {
            id: 'resume',
            name: 'Resume',
            keywords: 'resume',
            shortcut: ['r'],
            section: 'Home',
            perform: () => router.push('/resume'),
          },
          {
            id: 'about',
            name: 'About',
            keywords: 'about',
            shortcut: ['p'],
            section: 'Home',
            perform: () => router.push('/about'),
          },
          {
            id: 'signin',
            name: 'Sign In',
            keywords: '',
            shortcut: ['l'],
            section: 'Home',
            perform: () => router.push('/auth'),
          },
          {
            id: 'snippets',
            name: 'Snippets',
            keywords: 'snippets',
            shortcut: ['s'],
            section: 'Home',
            perform: () => router.push('/snippets'),
          },
          {
            id: 'uses',
            name: 'Uses',
            keywords: 'uses',
            shortcut: ['u'],
            section: 'Home',
            perform: () => router.push('/uses'),
          },
          {
            id: 'journey',
            name: 'Journey',
            keywords: 'journey',
            shortcut: ['j'],
            section: 'Home',
            perform: () => router.push('/journey'),
          },
          {
            id: 'contact',
            name: 'Contact',
            keywords: 'contact',
            shortcut: ['u'],
            section: 'Home',
            perform: () => router.push('/contact'),
          },
        ],
        onSearchDocumentsLoad(json) {
          const blogResults = json.map((post: Blog) => ({
            id: post.path,
            name: post.title,
            keywords: post.body,
            section: 'Blog',
            subtitle: post.tags.join(', '),
            perform: () => router.push('/' + post.path),
          }));

          const snippetResults = json.map((snippet: Snippets) => ({
            id: snippet.path,
            name: snippet.title,
            keywords: snippet.body,
            section: 'Blog and Snippets',
            subtitle: snippet.tags.join(', '),
            perform: () => router.push('/' + snippet.path),
          }));

          return [...blogResults, ...snippetResults];
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  );
};
