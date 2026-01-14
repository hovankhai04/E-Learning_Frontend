import { useState } from 'react';
import type { VocabWord } from '../types';
import { AudioButton } from './AudioButton';

type Props = {
  word: VocabWord;
  onLearned: (wordId: string) => void;
};

export const Flashcard = ({ word, onLearned }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const [learnedOnce, setLearnedOnce] = useState(false);

  const handleFlip = () => {
    const next = !flipped;
    setFlipped(next);
    if (next && !learnedOnce) {
      setLearnedOnce(true);
      onLearned(word.id);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative perspective-[1000px] h-64" onClick={handleFlip} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleFlip(); }}>
        <div className={`relative w-full h-full transition-transform duration-500 transform-3d ${flipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute inset-0 backface-hidden rounded-lg border border-white-90 bg-white p-6 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-40">{word.pos} • {word.phonetic}</p>
              <h3 className="text-2xl font-bold text-gray-15 mt-2">{word.termEn}</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-40">Nhấn để lật thẻ</p>
              <AudioButton audioUrl={word.audioUrl} />
            </div>
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg border border-white-90 bg-white p-6">
            <h4 className="text-lg font-bold text-gray-15 mb-2">{word.meaningVi}</h4>
            <div className="space-y-2">
              {word.examples.slice(0, 2).map((ex, i) => (
                <p key={i} className="text-sm text-gray-40">• {ex}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-40">Đã học: {learnedOnce ? '✓' : '—'}</div>
    </div>
  );
};

