import { useRef, useState } from "react"
import { SpeakingWord } from "../data/words.mock"
import Recorder from "./Recorder"

const PAGE_SIZE = 10

export default function VocabSection({ words }: { words: SpeakingWord[] }) {
  const [page, setPage] = useState(1)
  const [playingId, setPlayingId] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const totalPages = Math.ceil(words.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const currentWords = words.slice(start, start + PAGE_SIZE)

  const handlePlay = (word: SpeakingWord) => {
    if (!audioRef.current) return

    // click lại chính nó → pause
    if (playingId === word.id) {
      audioRef.current.pause()
      setPlayingId(null)
      return
    }

    audioRef.current.src = word.audio
    audioRef.current.play()
    setPlayingId(word.id)
  }

  return (
    <div className="vocab-section">
      {/* audio chung cho toàn page */}
      <audio
        ref={audioRef}
        onEnded={() => setPlayingId(null)}
      />

      <ul className="word-list">
        {currentWords.map((w) => (
          <li key={w.id} className="word-item">
            <div className="word-info">
              <strong>{w.word}</strong> <span>{w.ipa}</span>
              <p>{w.meaning}</p>
            </div>

            <div className="actions">
              {/* ▶ / ⏸ phát audio gốc */}
              <button
                className="play-btn"
                onClick={() => handlePlay(w)}
              >
                {playingId === w.id ? "⏸" : "▶"}
              </button>

              {/* 🎤 + 🔊 nằm trong Recorder, nhận wordId */}
              <Recorder wordId={w.id} />
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ◀
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          ▶
        </button>
      </div>
    </div>
  )
}
