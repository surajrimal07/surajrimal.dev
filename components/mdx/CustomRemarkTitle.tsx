import { visit } from 'unist-util-visit';

export function customRemarkCodeTitles() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      console.log('node', node);
      if (!node.lang) return;

      // Don't modify if it's already in the correct format
      if (node.lang.includes(':')) return;

      const langMatch = node.lang.match(/language-([\w-]+)/);
      if (langMatch) {
        const language = langMatch[1];
        const colonIndex = node.lang.indexOf(':');
        const fileName =
          colonIndex !== -1 ? node.lang.slice(colonIndex + 1).trim() : '';

        node.lang = fileName
          ? `language-${language}:${fileName}`
          : `language-${language}`;
      }
    });
  };
}
