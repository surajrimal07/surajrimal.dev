'use server';

import crypto from 'node:crypto';

import { supabase } from '@/utils/supabase/client';

const CACHE_FOLDER = 'cache-image';
const BUCKET_NAME = process.env.SUPABASE_BUCKET!;

function getFileExtension(url: string): string {
  const urlExtension = url.split('.').pop()?.toLowerCase();
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

  return validExtensions.includes(urlExtension || '') ? urlExtension! : 'jpg';
}

export async function cacheAndServeImage(originalUrl: string): Promise<string> {
  const hash = crypto.createHash('md5').update(originalUrl).digest('hex');
  const extension = getFileExtension(originalUrl);
  const cachedFilename = `${CACHE_FOLDER}/${hash}.${extension}`;

  try {
    // Check if the file exists in Supabase storage
    const { data: existingFile } = await supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(cachedFilename);

    if (existingFile?.publicUrl) {
      return existingFile.publicUrl;
    }

    const { error: downloadError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(cachedFilename);

    if (downloadError && !downloadError.message.includes('not found')) {
      throw downloadError;
    }

    // Download the image
    const response = await fetch(originalUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the image from URL: ${response.statusText}`
      );
    }
    const arrayBuffer = await response.arrayBuffer();

    // Upload the image to Supabase
    const contentType = `image/${extension === 'svg' ? 'svg+xml' : extension}`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(cachedFilename, new Uint8Array(arrayBuffer), {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get and return the public URL
    const { data: uploadedFile } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(cachedFilename);

    if (!uploadedFile?.publicUrl) {
      throw new Error('Failed to retrieve public URL after upload.');
    }

    return uploadedFile.publicUrl;
  } catch (error) {
    console.error(`Error caching image from URL "${originalUrl}":`, error);
    throw error;
  }
}
