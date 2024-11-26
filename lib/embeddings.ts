import { QdrantClient } from '@qdrant/js-client-rest';
import OpenAI from 'openai';

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

const openAIClient = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL!,
  apiKey: process.env.OPENAI_API_KEY!,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
});

export async function getEmbeddings(
  text: string,
  retries = 3
): Promise<number[]> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await openAIClient.embeddings.create({
        model: 'mistral-embed',
        input: text,
      });
      return result.data[0].embedding;
    } catch (error: any) {
      console.error(
        `🔴 Embedding attempt ${i + 1} failed:`,
        error.status,
        error.message
      );
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Failed to get embeddings after all retries');
}

export async function searchSimilarDocs(embedding: number[]): Promise<string> {
  try {
    const search = await qdrant.search('suraj_blog_embeddings', {
      vector: embedding,
      limit: 5,
    });

    return search.map((hit) => hit.payload?.content as string).join('\n');
  } catch (error) {
    console.error('🔴 Search error:', error);
    return '';
  }
}
