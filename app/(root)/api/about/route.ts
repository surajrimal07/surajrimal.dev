import { type NextRequest, NextResponse } from 'next/server';

import { readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_TYPES = {
  default: 'default',
  resume: 'resume',
  usage: 'usage',
} as const;

type ContentType = keyof typeof CONTENT_TYPES;

function getFilePath(contentType: ContentType): string {
  return path.join(process.cwd(), 'data', 'authors', `${contentType}.mdx`);
}

async function handleRequest(
  req: NextRequest,
  method: 'GET' | 'POST' | 'DELETE',
) {
  const url = new URL(req.url);
  const contentType = url.searchParams.get('type') as ContentType;

  if (!contentType || !CONTENT_TYPES[contentType]) {
    return NextResponse.json(
      { error: 'Invalid content type' },
      { status: 400 },
    );
  }

  if (method !== 'POST' && !contentType) {
    return NextResponse.json(
      { error: 'ContentType is required' },
      { status: 400 },
    );
  }

  try {
    switch (method) {
      case 'GET':
        return await handleGet(contentType);
      case 'POST':
        return await handlePost(req, contentType);
      case 'DELETE':
        return await handleDelete(contentType);
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

async function handleGet(contentType: ContentType) {
  const filePath = getFilePath(contentType);

  console.log('filePath', filePath);

  const fileContents = await readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return NextResponse.json({ ...data, content });
}

async function handlePost(req: NextRequest, contentType: ContentType) {
  const { content: fileContent } = await req.json();

  const { data: frontmatter, content } = matter(fileContent);

  const mdxContent = matter.stringify(content, frontmatter);

  const filePath = getFilePath(contentType);

  await writeFile(filePath, mdxContent);

  return NextResponse.json({
    success: true,
    fileName: path.basename(filePath),
  });
}

async function handleDelete(contentType: ContentType) {
  const filePath = getFilePath(contentType);
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
