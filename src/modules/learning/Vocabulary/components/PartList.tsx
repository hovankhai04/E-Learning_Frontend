import type { Part } from '../types';
import { Button } from '../../../../components/ui/Button';

type Props = {
  parts: Part[];
  getLearnedCount: (partIndex: number) => number;
  onStartPart: (partIndex: number) => void;
};

export const PartList = ({ parts, getLearnedCount, onStartPart }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {parts.map((p) => {
        const learned = getLearnedCount(p.index);
        return (
          <div key={p.index} className="p-4 rounded-lg bg-white-95 border border-white-90">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-15">Part {p.index + 1}</h4>
                <p className="text-sm text-gray-40">
                  {learned}/10 từ đã học
                </p>
              </div>
              <Button variant="primary" onClick={() => onStartPart(p.index)}>
                Học
              </Button>
            </div>
            <div className="mt-3 h-2 bg-white-90 rounded-full overflow-hidden">
              <div
                className="h-full bg-mint-50"
                style={{ width: `${(learned / 10) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

