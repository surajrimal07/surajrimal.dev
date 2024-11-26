import { QdrantClient } from '@qdrant/js-client-rest';
import 'dotenv/config';

import { personalContent } from '@/data/personal-content';
import { getEmbeddings } from '@/lib/embeddings';
import { chunkText } from '@/utils/text-chunker';

const COLLECTION_NAME = 'suraj_blog_embeddings';

async function recreateCollection(client: QdrantClient) {
  try {
    // Try to delete existing collection
    try {
      await client.deleteCollection(COLLECTION_NAME);
      console.log('Deleted existing collection');
    } catch (error) {
      // Ignore error if collection doesn't exist
      console.log(`No existing collection to delete: ${error}`);
    }

    // Create new collection
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 1024,
        distance: 'Cosine',
      },
    });
    console.log('Collection created successfully');
  } catch (error) {
    console.error('Error recreating collection:', error);
    throw error;
  }
}

async function ingestContent() {
  const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });

  // Create collection if it doesn't exist
  await recreateCollection(qdrant);

  let pointId = 1; // Start with ID 1

  // Process each content section
  for (const [section, items] of Object.entries(personalContent)) {
    for (const item of items) {
      // Split content into chunks
      const chunks = chunkText(item.content);

      for (const [index, chunk] of chunks.entries()) {
        try {
          // Get embeddings for chunk
          const embedding = await getEmbeddings(chunk);

          // Store in Qdrant with numeric ID
          await qdrant.upsert(COLLECTION_NAME, {
            wait: true,
            points: [
              {
                id: pointId, // Use numeric ID
                vector: embedding,
                payload: {
                  content: chunk,
                  metadata: {
                    ...item.metadata,
                    section,
                    chunk_index: index,
                    total_chunks: chunks.length,
                    original_id: `${section}-${index}`, // Keep original ID in payload if needed
                  },
                },
              },
            ],
          });

          console.log(
            `Ingested chunk ${index + 1}/${chunks.length} of ${section} (ID: ${pointId})`
          );
          pointId++; // Increment ID for next point
        } catch (error) {
          console.error(
            `Error ingesting chunk ${index + 1} of ${section}:`,
            error
          );
          // Continue with next chunk even if one fails
        }
      }
    }
  }

  console.log('Content ingestion complete!');
}

// Run the ingestion
ingestContent().catch(console.error);
