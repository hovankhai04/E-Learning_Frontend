type Props = {
  audioUrl?: string;
};

export const AudioButton = ({ audioUrl }: Props) => {
  const play = () => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audio.play().catch(() => {});
  };
  return (
    <button
      onClick={play}
      className="px-3 py-2 text-sm bg-white-95 text-gray-15 rounded-lg hover:bg-white-90 transition-colors font-semibold border border-white-90"
      aria-label="Phát âm"
      disabled={!audioUrl}
    >
      Phát âm
    </button>
  );
};

