import React, { useState, useEffect } from 'react';
import {
  WifiOff,
  RefreshCw,
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Terminal,
} from 'lucide-react';
import { ActiveView } from '../Navigation/Sidebar';

interface SwytchcodeStatusToastProps {
  isOffline: boolean;
  onReconnect: () => Promise<void> | void;
  onDismiss: () => void;
  onNavigate?: (view: ActiveView) => void;
}

export const SwytchcodeStatusToast: React.FC<SwytchcodeStatusToastProps> = ({
  isOffline,
  onReconnect,
  onDismiss,
  onNavigate,
}) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnectedSuccess, setReconnectedSuccess] = useState(false);

  useEffect(() => {
    if (!isOffline) {
      setReconnecting(false);
      setReconnectedSuccess(false);
    }
  }, [isOffline]);

  if (!isOffline && !reconnectedSuccess) return null;

  const handleReconnectClick = async () => {
    setReconnecting(true);
    try {
      if (onReconnect) {
        await onReconnect();
      }
      setReconnectedSuccess(true);
      setTimeout(() => {
        setReconnectedSuccess(false);
        onDismiss();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setReconnecting(false);
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm sm:max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-200 select-none"
    >
      <div className="bg-[#18181B] bg-opacity-95 backdrop-blur-md border border-[#27272A] rounded-xl shadow-2xl p-4 flex flex-col gap-3 text-zinc-100">
        {/* Top Header with Status Icon & Close */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                reconnectedSuccess
                  ? 'bg-emerald-950/70 border-emerald-800 text-emerald-400'
                  : 'bg-amber-950/60 border-amber-800/60 text-amber-400'
              }`}
            >
              {reconnectedSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-amber-400" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-semibold text-white tracking-tight">
                  {reconnectedSuccess
                    ? 'Swytchcode CLI Restored'
                    : 'Swytchcode CLI Connection Interrupted'}
                </h4>
                {!reconnectedSuccess && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                {reconnectedSuccess
                  ? 'Daemon handshake OK (PID 4108 active)'
                  : 'Daemon offline (PID 4108 unreachable)'}
              </p>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition shrink-0"
            title="Dismiss notice"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message body */}
        <p className="text-xs text-zinc-300 leading-relaxed pl-10">
          {reconnectedSuccess
            ? 'All 5 ingestion pipelines (Slack, Drive, Notion, Box, Gmail) are synchronized.'
            : 'Multi-tool agent synchronization is paused. Real-time Slack threads, Notion pages, and Drive index updates may be delayed.'}
        </p>

        {/* Action Controls */}
        <div className="flex items-center justify-between pl-10 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
            <Terminal className="w-3 h-3 text-zinc-500" />
            <span>CLI v1.4.2</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => {
                  onNavigate('integrations');
                  onDismiss();
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#101014] hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#27272A] text-xs font-medium transition flex items-center gap-1"
              >
                <span>Diagnostics</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </button>
            )}

            {!reconnectedSuccess && (
              <button
                disabled={reconnecting}
                onClick={handleReconnectClick}
                className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition flex items-center gap-1.5 disabled:opacity-60 shadow-sm"
              >
                {reconnecting ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin text-black" />
                    <span>Reconnecting...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3 text-black" />
                    <span>Reconnect</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
