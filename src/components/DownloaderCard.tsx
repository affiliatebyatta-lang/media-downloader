/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link2, ArrowRight, Clipboard, Trash2, HelpCircle } from "lucide-react";

interface DownloaderCardProps {
  onSubmit: (url: string, format: "auto" | "video" | "image") => void;
  isLoading: boolean;
  addToast: (text: string, type: "success" | "error" | "info") => void;
}

export default function DownloaderCard({ onSubmit, isLoading, addToast }: DownloaderCardProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [format, setFormat] = useState<"auto" | "video" | "image">("auto");

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text);
          setError("");
          addToast("Pasted from clipboard!", "success");
        }
      } else {
        addToast("Clipboard access is blocked or unsupported in this browser.", "info");
      }
    } catch (err) {
      addToast("Clipboard paste failed. Please paste manually.", "info");
    }
  };

  const validatePinterestUrl = (input: string): boolean => {
    const cleaned = input.trim();
    if (!cleaned) return false;
    // Standard Pinterest links or short URLs
    const pinterestRegex = /^(https?:\/\/)?([a-z0-9-]+\.)?pinterest\.[a-z]{2,}(\/.*)?$/i;
    const pinItRegex = /^(https?:\/\/)?pin\.it\/[a-z0-9]+/i;
    return pinterestRegex.test(cleaned) || pinItRegex.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please paste or type a Pinterest URL first");
      addToast("Please enter a URL", "error");
      return;
    }

    if (!validatePinterestUrl(url)) {
      setError("Please enter a valid Pinterest URL (e.g., pinterest.com/pin/... or pin.it/...)");
      addToast("Invalid Pinterest URL format", "error");
      return;
    }

    onSubmit(url.trim(), format);
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    setError("");
    addToast("Sample URL loaded!", "success");
  };

  const clearInput = () => {
    setUrl("");
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mb-12" id="downloader-card-container">
      <div className="glass-card-light dark:glass-card-dark p-6 sm:p-8 rounded-3xl relative overflow-hidden transition-all duration-300">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-4" id="downloader-form">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pinterest-url-input" className="text-xs sm:text-sm font-semibold tracking-wide dark:text-white/70 text-slate-700 uppercase">
              Paste Pinterest Pin Link
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-slate-400 pointer-events-none">
                <Link2 className="w-5 h-5 text-pink-400" />
              </div>
              <input
                id="pinterest-url-input"
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError("");
                }}
                disabled={isLoading}
                placeholder="https://pinterest.com/pin/1234567890/ or https://pin.it/abc1234"
                className="w-full pl-12 pr-28 py-4 sm:py-5 bg-slate-50 dark:bg-white/5 text-slate-950 dark:text-white border dark:border-white/20 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500/50 text-sm sm:text-base font-sans transition-all duration-200 placeholder:text-slate-400"
              />
              {/* Quick helper buttons inside input bar */}
              <div className="absolute right-2 flex items-center gap-1">
                {url ? (
                  <button
                    type="button"
                    onClick={clearInput}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    title="Clear link"
                    id="clear-input-btn"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 transition-all"
                    title="Paste from clipboard"
                    id="paste-clipboard-btn"
                  >
                    <Clipboard className="w-3.5 h-3.5 text-pink-400" />
                    <span className="hidden sm:inline">Paste</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Validation error */}
          {error && (
            <p className="text-xs sm:text-sm text-red-500 font-sans font-medium mt-1 flex items-center gap-1" id="url-validation-error">
              <span>●</span> {error}
            </p>
          )}

          {/* Preferred Download Option / Format Mode Selector */}
          <div className="flex flex-col gap-2 pt-2 pb-1" id="download-format-selector-section">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold tracking-wide dark:text-white/70 text-slate-700 uppercase">
                Download Format / Option
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500">
                {format === "auto" && "✨ Auto-detect highest quality"}
                {format === "video" && "🎬 Force conversion to MP4 video"}
                {format === "image" && "🖼️ Force high-res JPG extraction"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-900/40 p-1 rounded-2xl border dark:border-white/10 border-slate-200/60">
              <button
                type="button"
                onClick={() => setFormat("auto")}
                className={`py-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  format === "auto"
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/10"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
                title="Auto detect the original Pinterest content format"
                id="format-btn-auto"
              >
                <span>Auto-Detect</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat("video")}
                className={`py-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  format === "video"
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/10"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
                title="Ensure a Video MP4 download is available"
                id="format-btn-video"
              >
                <span>🎬 Video MP4</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat("image")}
                className={`py-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  format === "image"
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/10"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
                title="Download original JPG high quality static image"
                id="format-btn-image"
              >
                <span>🖼️ Image JPG</span>
              </button>
            </div>
          </div>

          {/* Large Action Download Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-2xl font-display font-bold text-base sm:text-lg flex items-center justify-center gap-2 text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] active:scale-[0.98] transition-all cursor-pointer ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            id="download-submit-btn"
          >
            {isLoading ? (
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Extracting Media Links...</span>
              </div>
            ) : (
              <>
                <span>Fetch Downloads</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Example Sample links */}
        <div className="mt-6 pt-5 border-t dark:border-slate-800/80 border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
            <HelpCircle className="w-4 h-4 text-pink-500" />
            <span>Don't have a URL? Try these examples:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSampleClick("https://www.pinterest.com/pin/687432322306782803/")}
              className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold border border-rose-500/15 cursor-pointer"
              id="btn-sample-video"
            >
              🎬 Video Pin
            </button>
            <button
              onClick={() => handleSampleClick("https://www.pinterest.com/pin/1118155807490089066/")}
              className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/15 cursor-pointer"
              id="btn-sample-image"
            >
              🖼️ Image Pin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
