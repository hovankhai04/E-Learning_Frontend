import type { VocabWord, Part } from '../types';

export function makeParts(topicId: string, words: VocabWord[]): Part[] {
  const size = 10;
  const partsCount = Math.ceil(words.length / size);
  return Array.from({ length: partsCount }, (_, i) => {
    const start = i * size;
    const end = start + size;
    return {
      topicId,
      index: i,
      words: words.slice(start, end),
    };
  });
}

