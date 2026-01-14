import { useParams, useNavigate } from 'react-router-dom';
import { useVocabData } from './hooks/useVocabData';
import { useVocabProgress } from './hooks/useVocabProgress';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';

export const ReviewSession = () => {
  const { topicId, partIndex } = useParams();
  const navigate = useNavigate();
  const { loading, error, getParts } = useVocabData();

  const normalizedTopicId = topicId ?? '';
  const idx = Number(partIndex ?? '0');
  const parts = normalizedTopicId ? getParts(normalizedTopicId) : [];
  const part = parts[idx];
  const { setReviewDone } = useVocabProgress(normalizedTopicId);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-600">Lỗi dữ liệu</div>;
  if (!part) return <div className="p-4">Không tìm thấy phần</div>;

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const checkAllCorrect = () => {
    return part.words.every((w) => (answers[w.id]?.trim() || '').toLowerCase() === w.meaningVi.trim().toLowerCase());
  };

  const submit = () => {
    setSubmitted(true);
    if (checkAllCorrect()) {
      setReviewDone(idx, true);
      navigate(`/learning/${normalizedTopicId}/part/${idx + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-white-97 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-15 mb-2">Ôn tập • Part {idx + 1}</h2>
        <p className="text-gray-40 mb-4">Điền nghĩa tiếng Việt tương ứng cho từng từ</p>

        <div className="space-y-4">
          {part.words.map((w) => {
            const correct = (answers[w.id]?.trim() || '').toLowerCase() === w.meaningVi.trim().toLowerCase();
            return (
              <div key={w.id} className="p-4 rounded-lg border border-white-90 bg-white">
                <p className="text-gray-15 font-semibold">{w.termEn}</p>
                <p className="text-sm text-gray-40 mb-2">{w.definitionEn}</p>
                <input
                  value={answers[w.id] || ''}
                  onChange={(e) => handleChange(w.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-gray-15 border-white-90 bg-white-99 focus:outline-none focus:ring-1 focus:ring-mint-50"
                  placeholder="Nhập nghĩa tiếng Việt"
                />
                {submitted && (
                  <p className={`mt-2 text-sm ${correct ? 'text-mint-50' : 'text-red-600'}`}>
                    {correct ? 'Chính xác' : 'Chưa chính xác'}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="primary" onClick={submit}>Nộp bài</Button>
        </div>
      </div>
    </div>
  );
};
