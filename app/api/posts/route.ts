import { type NextRequest, NextResponse } from 'next/server';

import matter from 'gray-matter';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CONTENT_TYPES = {
  snippet: 'snippets',
  post: 'blog',
} as const;

type ContentType = keyof typeof CONTENT_TYPES;

function generateFileName(title: string): string {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}.mdx`;
}

function getFilePath(contentType: ContentType, id: string): string {
  return path.join(
    process.cwd(),
    'data',
    CONTENT_TYPES[contentType],
    `${id}.mdx`,
  );
}

async function handleRequest(
  req: NextRequest,
  method: 'GET' | 'POST' | 'DELETE',
) {
  const url = new URL(req.url);
  const contentType = url.searchParams.get('type') as ContentType;
  const id = url.searchParams.get('id');

  if (!contentType || !CONTENT_TYPES[contentType]) {
    return NextResponse.json(
      { error: 'Invalid content type' },
      { status: 400 },
    );
  }

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    switch (method) {
      case 'GET':
        return await handleGet(contentType, id);
      case 'POST':
        return await handlePost(req, contentType, id);
      case 'DELETE':
        return await handleDelete(contentType, id);
      default:
        return NextResponse.json(
          { error: 'Method not allowed' },
          { status: 405 },
        );
    }
  } catch (error) {
    console.error(`Error in ${method} function:`, error);
    return NextResponse.json(
      { success: false, error: `Operation failed: ${error}` },
      { status: 500 },
    );
  }
}

async function handleGet(contentType: ContentType, id: string) {
  const filePath = getFilePath(contentType, id);
  const fileContents = await readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return NextResponse.json({ ...data, content });
}

async function handlePost(
  req: NextRequest,
  contentType: ContentType,
  id: string | null,
) {
  const { content: fileContent } = await req.json();
  const { data: frontmatter, content } = matter(fileContent);

  frontmatter.lastmod = frontmatter.lastmod || frontmatter.date;
  frontmatter.draft = frontmatter.draft ?? false;
  frontmatter.layout = frontmatter.layout || 'PostSimple';

  const mdxContent = matter.stringify(content, frontmatter);

  const fileName =
    id && id !== 'new' ? `${id}.mdx` : generateFileName(frontmatter.title);
  const filePath = getFilePath(contentType, fileName.replace('.mdx', ''));

  await writeFile(filePath, mdxContent);

  return NextResponse.json({
    success: true,
    fileName: path.basename(filePath),
  });
}

async function handleDelete(contentType: ContentType, id: string) {
  const filePath = getFilePath(contentType, id);
  await unlink(filePath);
  return NextResponse.json({
    success: true,
    message: `${contentType} deleted successfully`,
  });
}

export async function GET(req: NextRequest) {
  return handleRequest(req, 'GET');
}

export async function POST(req: NextRequest) {
  return handleRequest(req, 'POST');
}

export async function DELETE(req: NextRequest) {
  return handleRequest(req, 'DELETE');
}
