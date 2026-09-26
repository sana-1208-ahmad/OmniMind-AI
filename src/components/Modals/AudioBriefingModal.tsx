import React, { useState, useEffect } from 'react';

interface AudioBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioBriefingModal: React.FC<AudioBriefingModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(24);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500 / playbackRate);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackRate]);

  if (!isOpen) return null;

  const currentSeconds = Math.floor((progress / 100) * 180);
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-lg bg-surface-container-low border border-[#27272A] rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-lg animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-space-sm border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">volume_up</span>
            <span className="text-headline-sm font-semibold text-primary">Executive Audio Briefing</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:text-primary transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Audio Visualizer Waveform Simulation */}
        <div className="flex flex-col items-center justify-center p-6 bg-surface-container rounded-xl border border-[#27272A] gap-4">
          <div className="flex items-center gap-1.5 h-16 w-full justify-center">
            {[40, 65, 30, 80, 95, 50, 70, 35, 90, 60, 85, 45, 100, 75, 40, 85, 55, 65, 30, 95, 45, 70].map(
              (height, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    i <= (progress / 100) * 22
                      ? 'bg-primary'
                      : 'bg-surface-container-highest'
                  } ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{ height: isPlaying ? `${Math.max(15, (height * (i % 2 === 0 ? 1 : 0.7)))}%` : '20%' }}
                />
              )
            )}
          </div>

          <div className="w-full flex items-center justify-between text-xs font-code text-on-surface-variant">
            <span>{formatTime(currentSeconds)}</span>
            <span>03:00</span>
          </div>

          {/* Progress scrubber */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </div>

        {/* Audio Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1.0, 1.25, 1.5, 2.0].map((rate) => (
              <button
                key={rate}
                onClick={() => setPlaybackRate(rate)}
                className={`px-2 py-1 rounded text-xs font-code transition ${
                  playbackRate === rate
                    ? 'bg-primary text-on-primary font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setProgress(Math.max(0, progress - 10))}
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition"
              title="Back 15s"
            >
              <span className="material-symbols-outlined text-[20px]">replay_10</span>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-fixed-dim transition shadow-lg"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <button
              onClick={() => setProgress(Math.min(100, progress + 10))}
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition"
              title="Forward 10s"
            >
              <span className="material-symbols-outlined text-[20px]">forward_10</span>
            </button>
          </div>

          <button
            onClick={() => {
              setIsPlaying(false);
              setProgress(0);
            }}
            className="p-2 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition"
            title="Restart"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>
        </div>

        {/* Live Audio Transcript */}
        <div className="p-3 bg-surface-container rounded-xl text-xs text-on-surface-variant leading-relaxed">
          <span className="text-primary font-medium">Transcript Preview: </span>
          "Good morning. Overnight engineering activity closed 14 blockers on the Q3 infrastructure migration. Alex Rivera and Sarah Jenkins reached consensus on Redis zero-downtime replication..."
        </div>
      </div>
    </div>
  );
};
