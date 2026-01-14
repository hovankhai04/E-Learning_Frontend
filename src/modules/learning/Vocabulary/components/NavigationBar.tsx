import { Button } from '../../../../components/ui/Button';

type Props = {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onReview?: () => void;
  showReview?: boolean;
};

export const NavigationBar = ({ canPrev, canNext, onPrev, onNext, onReview, showReview }: Props) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <Button variant="outline" disabled={!canPrev} onClick={onPrev}>Quay lại</Button>
      <div className="flex gap-3">
        {showReview && onReview && (
          <Button variant="secondary" onClick={onReview}>Ôn tập</Button>
        )}
        <Button variant="primary" disabled={!canNext} onClick={onNext}>Tiếp tục</Button>
      </div>
    </div>
  );
};

