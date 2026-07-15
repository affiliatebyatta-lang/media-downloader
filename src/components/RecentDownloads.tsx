/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { RecentDownload } from "../types";
import { Trash2, History, Film, Image as ImageIcon, ArrowUpRight, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

interface RecentDownloadsProps {
  history: RecentDownload[];
  onSelect: (item: RecentDownload) => void;
  onClearHistory: () => void;
}

export default function RecentDownloads({ history, onSelect, onClearHistory }: RecentDownloadsProps) {
  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});

  if (history.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center" id="recent-downloads">
        <div className="glass-card-light dark:glass-card-dark rounded-2xl p-8 flex flex-col items-center justify-center border-dashed">
          <div className="p-3.5 bg-slate-100 dark:bg-slate-900 rounded-2xl text-slate-400 dark:text-slate-500 mb-3.5">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold dark:text-white text-slate-950 mb-1">
            No download history yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-xs">
            Paste a Pinterest link above to download media. Your download history will be securely stored here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-left scroll-mt-20" id="recent-downloads">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-pink-500" />
          <h2 className="text-lg sm:text-xl font-display font-bold dark:text-white text-slate-950">
            Recent Downloads
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold font-sans bg-rose-500/10 text-rose-600 dark:text-rose-400">
            {history.length}
          </span>
        </div>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-1 text-xs font-semibold text-red-500 dark:text-red-400 hover:underline cursor-pointer"
          title="Clear all saved history"
          id="btn-clear-history"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      {/* Grid of history cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="recent-downloads-grid">
        {history.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => onSelect(item)}
            className="group glass-card-light dark:glass-card-dark rounded-2xl p-3.5 flex gap-3.5 items-center cursor-pointer hover:border-pink-500/30 dark:hover:border-pink-500/40 transition-all hover:shadow-md hover:translate-y-[-2px] relative overflow-hidden"
            id={`recent-download-item-${item.id}`}
          >
            {/* Image Thumbnail */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border dark:border-slate-800 border-slate-200 bg-slate-950/5 flex items-center justify-center">
              {!failedImages[item.id] && item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setFailedImages(prev => ({ ...prev, [item.id]: true }))}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-rose-600/20 flex items-center justify-center">
                  {item.mediaType === "video" ? (
                    <Film className="w-5 h-5 text-pink-500/70" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-pink-500/70" />
                  )}
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <PlayCircle className="w-5 h-5 text-white animate-pulse" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5 flex items-center gap-1">
                {item.mediaType === "video" ? (
                  <Film className="w-3 h-3 text-pink-500" />
                ) : (
                  <ImageIcon className="w-3 h-3 text-cyan-400" />
                )}
                <span>{item.mediaType}</span>
              </span>
              <h3 className="text-xs sm:text-sm font-semibold dark:text-white text-slate-950 truncate pr-4 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-sans mt-0.5">
                {new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Link indicator */}
            <div className="absolute top-3.5 right-3.5 text-slate-400 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
