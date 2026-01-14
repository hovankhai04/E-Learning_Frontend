export type VocabWord = {
  id: string;
  termEn: string;
  pos: string;
  phonetic: string;
  audioUrl?: string;
  definitionEn: string;
  meaningVi: string;
  examples: string[];
};

export type Topic = {
  id: string;
  name: string;
  level: string;
  words: VocabWord[];
};

export type Part = {
  topicId: string;
  index: number;
  words: VocabWord[];
};

export type PartProgress = {
  learnedWordIds: string[];
  reviewDone: boolean;
};

export type TopicProgress = {
  [partIndex: number]: PartProgress;
};

