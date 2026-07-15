/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Video, Image, Play } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="relative text-center py-10 sm:py-16 px-4" id="hero-section">
      {/* Decorative blurred blob backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-red/10 dark:bg-brand-red/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-rose-500/10 dark:bg-rose-500/15 rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Modern Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold tracking-wide uppercase border border-rose-500/20 mb-6"
        id="hero-badge"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Free • Safe • Ultra HD Downloads</span>
      </motion.div>

      {/* Main Display Typography */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight dark:text-white text-slate-950 max-w-4xl mx-auto leading-[1.1] mb-6"
        id="hero-title"
      >
        Download{" "}
        <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Pinterest Media
        </span>{" "}
        Instantly
      </motion.h1>

      {/* Subtitle Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans font-light leading-relaxed mb-8"
        id="hero-subtitle"
      >
        Save your favorite creative inspiration in highest original quality. Paste any Pinterest link to download videos in MP4 HD, source images, or high-frame-rate GIFs. No signup required.
      </motion.p>

      {/* Quick Feature Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium"
        id="hero-features-grid"
      >
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl dark:bg-slate-900/60 bg-slate-100 border dark:border-slate-800/80 border-slate-200">
          <Video className="w-4 h-4 text-brand-red" />
          <span>HD Videos (MP4)</span>
        </div>
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl dark:bg-slate-900/60 bg-slate-100 border dark:border-slate-800/80 border-slate-200">
          <Image className="w-4 h-4 text-rose-500" />
          <span>Original High-Res Images</span>
        </div>
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl dark:bg-slate-900/60 bg-slate-100 border dark:border-slate-800/80 border-slate-200">
          <Play className="w-4 h-4 text-amber-500" />
          <span>Animated GIFs</span>
        </div>
      </motion.div>
    </div>
  );
}
