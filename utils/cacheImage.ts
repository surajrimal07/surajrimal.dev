'use server';

import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), 'public', 'image-cache');

export async function cacheAndServeImage(originalUrl: string): Promise<string> {
  // Create a hash of the original URL to use as the filename
  const hash = crypto.createHash('md5').update(originalUrl).digest('hex');
  const cachedFilename = `${hash}.jpg`;
  const cachedPath = path.join(CACHE_DIR, cachedFilename);

  try {
    // Check if the file already exists in the cache
    await fs.access(cachedPath);
    // If it exists, return the cached URL
    return `/image-cache/${cachedFilename}`;
  } catch (error) {
    // If the file doesn't exist, download and cache it
    console.log(`Error occured while caching image ${originalUrl}: ${error}`);
    const response = await fetch(originalUrl);
    const arrayBuffer = await response.arrayBuffer();

    // // Ensure the cache directory exists
    // await fs.mkdir(CACHE_DIR, { recursive: true });

    // Write the image to the cache
    await fs.writeFile(cachedPath, new Uint8Array(arrayBuffer));

    // Return the cached URL
    return `/image-cache/${cachedFilename}`;
  }
}
