import React, { useState, useEffect } from 'react';
import { Volume2, X, RotateCcw, Play, Pause, RotateCw, RefreshCw } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-lg bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl p-6 flex flex-col gap-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-white" />
            <span className="text-base font-semibold text-white">Executive Audio Briefing</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Visualizer Waveform Simulation */}
        <div className="flex flex-col items-center justify-center p-6 bg-[#101014] rounded-xl border border-[#27272A] gap-4">
          <div className="flex items-center gap-1.5 h-16 w-full justify-center">
            {[40, 65, 30, 80, 95, 50, 70, 35, 90, 60, 85, 45, 100, 75, 40, 85, 55, 65, 30, 95, 45, 70].map(
              (height, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    i <= (progress / 100) * 22
                      ? 'bg-zinc-200'
                      : 'bg-zinc-700'
                  } ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{ height: isPlaying ? `${Math.max(15, (height * (i % 2 === 0 ? 1 : 0.7)))}%` : '20%' }}
                />
              )
            )}
          </div>

          <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400">
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
            className="w-full accent-zinc-200 cursor-pointer"
          />
        </div>

        {/* Audio Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1.0, 1.25, 1.5, 2.0].map((rate) => (
              <button
                key={rate}
                onClick={() => setPlaybackRate(rate)}
                className={`px-2 py-1 rounded text-xs font-mono transition ${
                  playbackRate === rate
                    ? 'bg-zinc-100 text-black font-semibold'
                    : 'bg-[#101014] text-zinc-400 hover:text-zinc-200 border border-[#27272A]'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setProgress(Math.max(0, progress - 10))}
              className="p-2 rounded-full hover:bg-[#101014] text-zinc-400 hover:text-white transition"
              title="Back 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition shadow-lg"
            >
              {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black ml-0.5" />}
            </button>
            <button
              onClick={() => setProgress(Math.min(100, progress + 10))}
              className="p-2 rounded-full hover:bg-[#101014] text-zinc-400 hover:text-white transition"
              title="Forward 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              setIsPlaying(false);
              setProgress(0);
            }}
            className="p-2 rounded hover:bg-[#101014] text-zinc-400 hover:text-white transition"
            title="Restart"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Live Audio Transcript */}
        <div className="p-3 bg-[#101014] rounded-xl text-xs text-zinc-400 leading-relaxed border border-[#27272A]">
          <span className="text-zinc-200 font-medium">Transcript Preview: </span>
          "Good morning. Overnight engineering activity closed 14 blockers on the Q3 infrastructure migration. Alex Rivera and Sarah Jenkins reached consensus on Redis zero-downtime replication..."
        </div>
      </div>
    </div>
  );
};
