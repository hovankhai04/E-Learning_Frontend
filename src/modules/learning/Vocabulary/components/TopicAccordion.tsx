import { useState } from 'react';
import type { Topic } from '../types';
import type { ReactElement } from 'react';

type Props = {
  topics: Topic[];
  renderPartList: (topic: Topic) => ReactElement;
};

export const TopicAccordion = ({ topics, renderPartList }: Props) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {topics.map((t) => {
        const isOpen = openId === t.id;
        return (
          <div key={t.id} className="bg-white rounded-lg border border-white-90">
            <button
              className="w-full flex justify-between items-center p-4 text-gray-15 font-semibold"
              aria-expanded={isOpen}
              aria-controls={`panel-${t.id}`}
              onClick={() => setOpenId(isOpen ? null : t.id)}
            >
              <span>{t.name} • Level {t.level}</span>
              <span className="text-mint-50">{isOpen ? '−' : '+'}</span>
            </button>
            <div
              id={`panel-${t.id}`}
              className={`${isOpen ? 'block' : 'hidden'} border-t border-white-90 p-4 bg-white-95`}
            >
              {renderPartList(t)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
