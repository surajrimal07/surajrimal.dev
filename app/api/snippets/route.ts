import { NextRequest, NextResponse } from 'next/server';

import { readFile, unlink, writeFile } from 'fs/promises';
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
    const { id, content: fileContent } = await req.json();

    const { data: frontmatter, content } = matter(fileContent);

    // provide these value in ui later
    frontmatter.lastmod = frontmatter.lastmod || frontmatter.date;
    frontmatter.draft =
      frontmatter.draft !== undefined ? frontmatter.draft : false;
    frontmatter.layout = frontmatter.layout || 'PostSimple';

    const mdxContent = matter.stringify(content, frontmatter);

    let filePath;
    if (id && id !== 'new') {
      filePath = path.join(process.cwd(), 'data', 'snippets', `${id}.mdx`);
    } else {
      const fileName = generateFileName(frontmatter.title);
      filePath = path.join(process.cwd(), 'data', 'snippets', fileName);
    }

    await writeFile(filePath, mdxContent);

    return NextResponse.json({
      success: true,
      fileName: path.basename(filePath),
    });
  } catch (error) {
    console.error('Error in POST function:', error);
    return NextResponse.json(
      { success: false, error: `Failed to save the snippet: ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Snippets ID is required' },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'snippets', `${id}.mdx`);
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

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Snippet ID is required' },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), 'data', `${id}.mdx`);

    console.log('Deleting snippet:', filePath);

    try {
      await readFile(filePath, 'utf8');
    } catch (error) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    await unlink(filePath);

    return NextResponse.json({
      success: true,
      message: 'Snippet deleted successfully',
    });
  } catch (error) {
    console.error('Error in DELETE function:', error);
    return NextResponse.json(
      { success: false, error: `Failed to delete the snippet: ${error}` },
      { status: 500 }
    );
  }
}
