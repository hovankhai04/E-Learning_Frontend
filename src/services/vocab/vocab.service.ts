import { authService } from "@/services/auth/auth.service";
import type { ApiMessageResponse } from "@/services/auth/auth.types";

export type TopicProgress = {
  name: string;
  totalWords: number;
  learnedCount: number;
  progressPercentage?: number;
};

export type VocabEntry = {
  word: string;
  topics?: string[];
  entries?: Array<{
    word_vi?: string;
    definition_vi?: string;
    definition_en?: string;
    phonetic?: string;
    audio?: string;
    example?: string;
    class?: string;
    cefr?: string;
  }>;
  wordKey?: string;
};

const unwrap = <T>(payload: unknown): T | null => {
  if (!payload || typeof payload !== "object") return null;
  const bucket = payload as Record<string, unknown>;
  return (
    (bucket.result as T | undefined) ??
    (bucket.data as T | undefined) ??
    (bucket as unknown as T) ??
    null
  );
};

export const vocabService = {
  async getTopics(): Promise<TopicProgress[]> {
    const client = authService.getHttpClient();
    const res = await client.get<ApiMessageResponse>("/vocabs/topics");
    console.log(res.data);
    return unwrap<TopicProgress[]>(res.data) ?? [];
  },
  async getNewWords(params: { topic: string; level?: string; limit?: number }): Promise<VocabEntry[]> {
    const client = authService.getHttpClient();
    const res = await client.get<ApiMessageResponse>("/vocabs/new-words", {
      params: { topic: params.topic, level: params.level, limit: params.limit ?? 10 },
    });
    const data = unwrap<VocabEntry | VocabEntry[]>(res.data);
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  },
  async getReviewDeck(topic?: string): Promise<VocabEntry[]> {
    const client = authService.getHttpClient();
    const res = await client.get<ApiMessageResponse>("/vocabs/review-deck", {
      params: topic ? { topic } : undefined,
    });
    const data = unwrap<VocabEntry[]>(res.data);
    return data ?? [];
  },
  async submitAnswer(payload: { wordKey: string; quality: number }) {
    const client = authService.getHttpClient();
    const res = await client.post<ApiMessageResponse>("/vocabs/answer", payload);
    return unwrap<Record<string, unknown>>(res.data);
  },
};

