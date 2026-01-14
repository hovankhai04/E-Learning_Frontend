type Props = {
  total: number;
  learned: number;
};

export const ProgressBar = ({ total, learned }: Props) => {
  const pct = total ? Math.min(100, Math.round((learned / total) * 100)) : 0;
  return (
    <div className="w-full h-2 bg-white-90 rounded-full overflow-hidden">
      <div className="h-full bg-mint-50" style={{ width: `${pct}%` }} />
    </div>
  );
};

