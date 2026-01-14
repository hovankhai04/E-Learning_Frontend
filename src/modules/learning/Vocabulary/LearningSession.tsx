import { useParams, useNavigate } from 'react-router-dom';
import { useVocabData } from './hooks/useVocabData';
import { useVocabProgress } from './hooks/useVocabProgress';
import { Flashcard } from './components/Flashcard';
import { NavigationBar } from './components/NavigationBar';
import { ProgressBar } from './components/ProgressBar';

export const LearningSession = () => {
  const { topicId, partIndex } = useParams();
  const navigate = useNavigate();
  const { loading, error, getParts } = useVocabData();

  const normalizedTopicId = topicId ?? '';
  const idx = Number(partIndex ?? '0');
  const parts = normalizedTopicId ? getParts(normalizedTopicId) : [];
  const part = parts[idx];

  const { getPartProgress, markLearned } = useVocabProgress(normalizedTopicId);
  const progress = getPartProgress(idx);
  const learnedCount = progress.learnedWordIds.length;

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-600">Lỗi dữ liệu</div>;
  if (!part) return <div className="p-4">Không tìm thấy phần</div>;

  const onLearned = (wordId: string) => {
    markLearned(idx, wordId);
  };

  const goPrev = () => navigate(`/learning/${normalizedTopicId}/part/${Math.max(0, idx - 1)}`);
  const goNext = () => navigate(`/learning/${normalizedTopicId}/part/${Math.min(parts.length - 1, idx + 1)}`);
  const goReview = () => navigate(`/learning/${normalizedTopicId}/part/${idx}/review`);

  return (
    <div className="min-h-screen bg-white-97 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-15 mb-2">Học từ vựng • Part {idx + 1}</h2>
        <p className="text-gray-40 mb-4">Topic: {topicId}</p>
        <ProgressBar total={10} learned={learnedCount} />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {part.words.map((w) => (
            <Flashcard key={w.id} word={w} onLearned={onLearned} />
          ))}
        </div>

        <NavigationBar
          canPrev={idx > 0}
          canNext={idx < parts.length - 1}
          onPrev={goPrev}
          onNext={goNext}
          onReview={goReview}
          showReview={learnedCount === 10}
        />
      </div>
    </div>
  );
};
