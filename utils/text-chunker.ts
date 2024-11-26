interface ChunkOptions {
  maxChunkLength?: number;
  overlapSize?: number;
}

export function chunkText(text: string, options: ChunkOptions = {}) {
  const { maxChunkLength = 512, overlapSize = 50 } = options;

  const sentences = text.split(/[.!?]+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (!trimmedSentence) continue;

    if (currentChunk.length + trimmedSentence.length > maxChunkLength) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        // Keep last part for overlap
        currentChunk = currentChunk.split(' ').slice(-overlapSize).join(' ');
      }
    }
    currentChunk += (currentChunk ? ' ' : '') + trimmedSentence;
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}
