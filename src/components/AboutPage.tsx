/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Sparkles, Shield, Cpu, Zap, Download, RefreshCw } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-pink-400" />,
      title: "AI-Powered Scraper Fallback",
      description: "When standard CSS selectors and meta extraction fail due to Pinterest layout changes, our system fallback executes Gemini 3.5-Flash to dynamically parse raw DOM scripts and restore 100% extraction success."
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: "Immediate No-CORS Proxy",
      description: "Avoid standard browser security restrictions and 'Open in Tab' behaviors. Our high-performance node proxy streams binary data directly, forcing local 'Save As' dialogs for images and videos."
    },
    {
      icon: <Shield className="w-6 h-6 text-pink-400" />,
      title: "Enterprise Grade & Safe",
      description: "We never request or store your Pinterest account credentials. No tracking cookies are kept, ensuring your downloads are 100% private, safe, and anonymous."
    },
    {
      icon: <Download className="w-6 h-6 text-cyan-400" />,
      title: "Highest Available Resolutions",
      description: "Automatically analyzes metadata arrays to locate the highest resolution original file, upscaling standard previews into crisp, high-definition 1080p MP4s and original JPGs."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-8 text-left"
      id="about-page-container"
    >
      <div className="glass-card-light dark:glass-card-dark rounded-3xl p-6 sm:p-10 relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Title */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-pink-500/10 text-pink-500 dark:text-pink-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Pin Media</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight dark:text-white text-slate-950">
            The Ultimate Media Downloader
          </h1>
          <p className="text-sm sm:text-base dark:text-slate-300 text-slate-600 leading-relaxed max-w-2xl">
            Pin Media is a high-performance web service built specifically to make downloading, preserving, and offline-backing up your favorite Pinterest assets fast, secure, and straightforward.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {features.map((feature, i) => (
            <div key={i} className="p-5 rounded-2xl border dark:border-white/10 border-slate-200/80 bg-slate-50/50 dark:bg-white/5 space-y-3">
              <div className="p-2.5 rounded-xl bg-pink-500/5 w-fit border dark:border-white/5 border-slate-200">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold dark:text-white text-slate-900">{feature.title}</h3>
              <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Architecture */}
        <div className="pt-6 border-t dark:border-white/10 border-slate-200/80 space-y-4">
          <h2 className="text-xl font-display font-bold dark:text-white text-slate-950 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Under the Hood Architecture</span>
          </h2>
          <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
            Unlike standard frontend browser-only tools that get blocked by CORS and Pinterest's asset protections, Pin Media routes download requests through a fully compliant node service. It parses target pins in a sandbox, extracting direct asset paths, and serving them via a optimized chunked stream to minimize server load while ensuring blistering download speeds.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
