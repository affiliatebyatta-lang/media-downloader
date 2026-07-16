/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MediaMetadata } from "../types";
import { Download, Copy, Share2, Sparkles, Check, RefreshCw, Film, Image as ImageIcon, FileWarning, Heart, Play } from "lucide-react";
import { motion } from "motion/react";

interface ResultCardProps {
  metadata: MediaMetadata;
  onClear: () => void;
  addToast: (text: string, type: "success" | "error" | "info") => void;
}

export default function ResultCard({ metadata, onClear, addToast }: ResultCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  const videoOption = metadata.downloads.find(item => item.type.startsWith("video/"));

  React.useEffect(() => {
    setImageError(false);
    setIsPlaying(false);
  }, [metadata.sourceUrl]);
  
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    try {
      const favs = localStorage.getItem("pin_favorites");
      if (favs) {
        const parsed = JSON.parse(favs);
        return parsed.some((item: any) => item.sourceUrl === metadata.sourceUrl);
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  });

  const toggleFavorite = () => {
    try {
      const favsStr = localStorage.getItem("pin_favorites") || "[]";
      let favs = JSON.parse(favsStr);
      if (isFavorite) {
        favs = favs.filter((item: any) => item.sourceUrl !== metadata.sourceUrl);
        setIsFavorite(false);
        addToast("Removed from favorites", "info");
      } else {
        const newFav = {
          id: Date.now().toString(),
          title: metadata.title,
          thumbnail: metadata.thumbnail,
          sourceUrl: metadata.sourceUrl,
          timestamp: Date.now(),
          mediaType: metadata.mediaType,
          downloads: metadata.downloads
        };
        favs.push(newFav);
        setIsFavorite(true);
        addToast("Saved to favorites!", "success");
      }
      localStorage.setItem("pin_favorites", JSON.stringify(favs));
      // Dispatch custom event to trigger reloading lists
      window.dispatchEvent(new Event("favorites_updated"));
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    addToast("Download link copied to clipboard!", "success");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleShare = async () => {
    setIsSharing(true);
    const shareUrl = metadata.sourceUrl;
    const shareTitle = `Download Pinterest Media: ${metadata.title}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Check out this Pinterest downloader link for "${metadata.title}"`,
          url: window.location.href,
        });
        addToast("Shared successfully!", "success");
      } catch (err) {
        console.log("Share cancelled or failed", err);
      } finally {
        setIsSharing(false);
      }
    } else {
      // Fallback: Copy share link
      navigator.clipboard.writeText(window.location.href);
      addToast("App link copied to clipboard for sharing!", "success");
      setIsSharing(false);
    }
  };

  // Build the force-download link via our Express backend proxy
  const getProxyDownloadUrl = (url: string, quality: string) => {
    const fileName = metadata.title
      ? metadata.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)
      : "pinterest-download";
    const qualityTag = quality.toLowerCase().replace(/\s+/g, "-");
    return `/api/proxy?url=${encodeURIComponent(url)}&name=${encodeURIComponent(`${fileName}-${qualityTag}`)}`;
  };

  const handleDownloadClick = async (e: React.MouseEvent, url: string, quality: string, index: number) => {
    e.preventDefault();
    if (downloadingIndex !== null) return;
    
    setDownloadingIndex(index);
    const proxyUrl = getProxyDownloadUrl(url, quality);
    
    addToast("Preparing your download...", "info");
    
    try {
      // Fast check to see if the proxy endpoint exists on this host (handles 404 NOT_FOUND on static/sub-hosting)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 seconds timeout
      
      const checkRes = await fetch(proxyUrl, {
        method: "HEAD",
        signal: controller.signal
      }).catch(() => null);
      
      clearTimeout(timeoutId);
      
      if (checkRes && checkRes.ok) {
        // Proxy works! Open in current window to trigger instant browser download headers
        window.location.href = proxyUrl;
        addToast("Download started successfully!", "success");
      } else {
        // Fallback: If 404/NOT_FOUND or failed (static hostings like Vercel, Netlify, Github Pages)
        console.warn("Proxy endpoint is not available on this hosting. Falling back to direct URL.");
        addToast("Opening direct file. Right-click or hold-to-save on mobile!", "info");
        window.open(url, "_blank");
      }
    } catch (err) {
      console.error("Proxy check failed, opening direct URL", err);
      addToast("Opening direct file. Right-click or hold-to-save on mobile!", "info");
      window.open(url, "_blank");
    } finally {
      setDownloadingIndex(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 mb-16"
      id="download-results-container"
    >
      <div className="glass-card-light dark:glass-card-dark rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Header Indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b dark:border-slate-800/80 border-slate-200/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-xs font-semibold tracking-wider dark:text-green-400 text-green-600 uppercase">
              Ready to Download
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                isFavorite
                  ? "bg-pink-500/10 border-pink-500/30 text-pink-500 hover:bg-pink-500/20"
                  : "bg-slate-100 hover:bg-slate-200 border-transparent text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300"
              }`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              id="btn-favorite-toggle"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-pink-500 text-pink-500" : ""}`} />
              <span>{isFavorite ? "Saved" : "Save Pin"}</span>
            </button>
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 text-slate-700 transition-all cursor-pointer"
              id="btn-download-another"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Convert Another</span>
            </button>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Side: Thumbnail Preview */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group rounded-2xl overflow-hidden shadow-md border dark:border-slate-800 border-slate-200 aspect-square w-full max-w-[280px] bg-slate-900/10 flex items-center justify-center">
              {isPlaying && videoOption ? (
                <video
                  src={videoOption.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-slate-950"
                  id="result-media-video"
                />
              ) : (
                <>
                  {!imageError && metadata.thumbnail ? (
                    <img
                      src={metadata.thumbnail}
                      alt={metadata.title || "Pinterest Thumbnail"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => setImageError(true)}
                      id="result-media-thumbnail"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-rose-600/20 flex flex-col items-center justify-center p-6 text-center animate-pulse">
                      {metadata.mediaType === "video" ? (
                        <Film className="w-14 h-14 text-pink-500/80 mb-2.5" />
                      ) : (
                        <ImageIcon className="w-14 h-14 text-pink-500/80 mb-2.5" />
                      )}
                      <span className="text-xs font-bold tracking-wide dark:text-pink-400 text-pink-600 uppercase">
                        Preview Loaded
                      </span>
                    </div>
                  )}

                  {/* Play Overlay Button for Video */}
                  {videoOption && (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors flex items-center justify-center cursor-pointer group/btn"
                      title="Play Video Preview"
                      id="play-video-overlay-btn"
                    >
                      <div className="w-16 h-16 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 transition-all transform group-hover/btn:scale-110 active:scale-95 duration-300">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                    </button>
                  )}

                  <div className="absolute bottom-3 left-3 bg-pink-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold uppercase flex items-center gap-1 shadow-md">
                    {metadata.mediaType === "video" ? (
                      <Film className="w-3.5 h-3.5" />
                    ) : (
                      <ImageIcon className="w-3.5 h-3.5" />
                    )}
                    <span className="font-bold tracking-wider">{metadata.mediaType}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Side: Metadata and Download Buttons */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3 text-left">
              <h2 className="text-xl sm:text-2xl font-display font-bold dark:text-white text-slate-950 tracking-tight leading-snug" id="result-media-title">
                {metadata.title || "Pinterest Scraped Media"}
              </h2>
              {metadata.description && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans line-clamp-3 leading-relaxed" id="result-media-desc">
                  {metadata.description}
                </p>
              )}
            </div>

            {/* Download Options Box */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider dark:text-slate-400 text-slate-600 block text-left">
                Available Downloads:
              </span>
              <div className="space-y-2.5" id="download-options-list">
                {metadata.downloads.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border dark:bg-slate-900/40 bg-slate-50 dark:border-slate-800 border-slate-200/80 gap-3"
                    id={`download-option-row-${index}`}
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center">
                        <Download className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold dark:text-white text-slate-950 block">
                          {item.quality}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                          {item.type.split("/")[1]} • {item.type.split("/")[0]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {/* Force Download Button with resilient fallback to avoid NOT_FOUND errors */}
                      <button
                        onClick={(e) => handleDownloadClick(e, item.url, item.quality, index)}
                        disabled={downloadingIndex === index}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] rounded-lg shadow transition-all duration-150 active:scale-95 text-center cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                        title="Download file directly to your device"
                        id={`btn-direct-download-${index}`}
                      >
                        <Download className={`w-3.5 h-3.5 ${downloadingIndex === index ? "animate-bounce" : ""}`} />
                        <span>{downloadingIndex === index ? "Checking..." : "Download"}</span>
                      </button>

                      {/* Copy Link */}
                      <button
                        onClick={() => copyToClipboard(item.url, index)}
                        className="p-2 border dark:border-slate-800 border-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-lg dark:text-slate-300 text-slate-600 transition-colors"
                        title="Copy direct file URL"
                        id={`btn-copy-url-${index}`}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-4 border-t dark:border-white/10 border-slate-200/60 w-full">
              <button
                onClick={handleShare}
                disabled={isSharing}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl border dark:border-white/10 border-slate-200 dark:text-slate-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                id="btn-share-results"
              >
                <Share2 className="w-4 h-4 text-pink-400" />
                <span>Share Downloader</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tip Banner */}
        <div className="mt-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-800 dark:text-cyan-300 text-left flex items-start gap-2">
          <Sparkles className="w-4 h-4 flex-shrink-0 text-cyan-500 mt-0.5" />
          <span>
            <strong>Pro Tip:</strong> We process and fetch the highest resolution available on Pinterest servers. Download is proxied directly to trigger an instant browser save dialog.
          </span>
        </div>
      </div>
    </motion.div>
  );
}
