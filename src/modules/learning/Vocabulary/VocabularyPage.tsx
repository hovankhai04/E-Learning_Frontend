import { useNavigate } from 'react-router-dom';
import { useVocabData } from './hooks/useVocabData';
import { useVocabProgress } from './hooks/useVocabProgress';
import { TopicAccordion } from './components/TopicAccordion';
import { PartList } from './components/PartList';
import type { Topic } from './types';

export const VocabularyPage = () => {
  const navigate = useNavigate();
  const { topics, loading, error, getParts } = useVocabData();

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-600">Lỗi dữ liệu</div>;

  const PartListWithProgress = ({ topic }: { topic: Topic }) => {
    const { getPartProgress } = useVocabProgress(topic.id);
    const parts = getParts(topic.id);
    const getLearnedCount = (idx: number) => getPartProgress(idx).learnedWordIds.length;
    const onStartPart = (idx: number) => navigate(`/learning/${topic.id}/part/${idx}`);
    return <PartList parts={parts} getLearnedCount={getLearnedCount} onStartPart={onStartPart} />;
  };

  return (
    <div className="min-h-screen bg-white-97 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-15 mb-2">English Vocabulary by Topic</h1>
        <p className="text-gray-40 mb-6">Chọn Topic để bắt đầu học theo từng Part</p>
        <TopicAccordion topics={topics} renderPartList={(t) => <PartListWithProgress topic={t} />} />
      </div>
    </div>
  );
};
