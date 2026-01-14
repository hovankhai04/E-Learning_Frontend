import { useEffect, useState } from 'react';
import type { TopicProgress } from '../types';

const KEY_PREFIX = 'vocabProgress:';

function readProgress(topicId: string): TopicProgress {
  const raw = localStorage.getItem(KEY_PREFIX + topicId);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as TopicProgress;
  } catch {
    return {};
  }
}

function writeProgress(topicId: string, progress: TopicProgress) {
  localStorage.setItem(KEY_PREFIX + topicId, JSON.stringify(progress));
}

export function useVocabProgress(topicId: string) {
  const [progress, setProgress] = useState<TopicProgress>({});

  useEffect(() => {
    setProgress(readProgress(topicId));
  }, [topicId]);

  const markLearned = (partIndex: number, wordId: string) => {
    setProgress((prev) => {
      const updated: TopicProgress = { ...prev };
      const part = updated[partIndex] ?? { learnedWordIds: [], reviewDone: false };
      if (!part.learnedWordIds.includes(wordId)) {
        part.learnedWordIds = [...part.learnedWordIds, wordId];
      }
      updated[partIndex] = part;
      writeProgress(topicId, updated);
      return updated;
    });
  };

  const setReviewDone = (partIndex: number, done: boolean) => {
    setProgress((prev) => {
      const updated: TopicProgress = { ...prev };
      const part = updated[partIndex] ?? { learnedWordIds: [], reviewDone: false };
      part.reviewDone = done;
      updated[partIndex] = part;
      writeProgress(topicId, updated);
      return updated;
    });
  };

  const getPartProgress = (partIndex: number) => progress[partIndex] ?? { learnedWordIds: [], reviewDone: false };

  return { progress, markLearned, setReviewDone, getPartProgress };
}

