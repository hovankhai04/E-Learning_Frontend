import { useEffect, useState } from 'react';
import type { Topic, Part } from '../types';
import { makeParts } from '../utils/partition';

export function useVocabData() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/fakedata.json')
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        const parsed: Topic[] = data.topics;
        setTopics(parsed);
        setLoading(false);
      })
      .catch((e) => {
        if (!active) return;
        setError(String(e));
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const getParts = (topicId: string): Part[] => {
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return [];
    return makeParts(topicId, topic.words);
  };

  return { topics, loading, error, getParts };
}

