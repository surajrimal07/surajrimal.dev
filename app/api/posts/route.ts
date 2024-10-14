import { NextRequest, NextResponse } from 'next/server';

import { readFile, writeFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

function generateFileName(title: string) {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')}.mdx`;
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, date, tags, draft, summary } = await req.json();

    const frontmatter =
      `---\n` +
      `title: '${title}'\n` +
      `date: '${date}'\n` +
      `lastmod: '${date}'\n` +
      `tags: [${tags.map((tag: string) => `'${tag}'`).join(', ')}]\n` +
      `summary: '${summary}'\n` +
      `draft: ${draft}\n` +
      `layout: PostSimple\n` +
      `---\n\n`;

    const fullContent = frontmatter + content;
    const fileName = generateFileName(title);
    const filePath = path.join(process.cwd(), 'data', 'blog', fileName);

    await writeFile(filePath, fullContent);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Failed to save the post ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'blog', `${id}.mdx`);
    const fileContents = await readFile(filePath, 'utf8');

    const { data, content } = matter(fileContents);

    return NextResponse.json({ ...data, content });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to read the snippets: ${error}` },
      { status: 500 }
    );
  }
}
