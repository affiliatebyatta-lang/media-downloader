/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Shield, Lock, Eye, Server, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-8 text-left"
      id="privacy-page-container"
    >
      <div className="glass-card-light dark:glass-card-dark rounded-3xl p-6 sm:p-10 relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Title */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight dark:text-white text-slate-950">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-500">
            Last Updated: July 14, 2026
          </p>
        </div>

        {/* Info Grid */}
        <div className="space-y-6 dark:text-slate-300 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-lg font-bold dark:text-white text-slate-950 flex items-center gap-2">
              <Lock className="w-5 h-5 text-pink-500" />
              <span>1. Information We Do Not Collect</span>
            </h2>
            <p>
              Pin Media operates under a strict privacy-first policy. We do not require you to create an account, register, or provide any personal data (such as emails, names, or credentials) to use our downloader.
            </p>
            <p>
              We do not track or store your download logs on local database installations associated with any personal user profile. The history list displayed on our website is stored strictly on your own device's <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-pink-400 font-mono">localStorage</code> and never transmitted back to our servers.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold dark:text-white text-slate-950 flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              <span>2. Technical Server Processing Logs</span>
            </h2>
            <p>
              When you paste a Pinterest URL, our servers fetch the Pinterest website metadata programmatically to locate the original media files. These requests are anonymous, and we do not store raw IP addresses or client identifiers. In-memory general download counts are logged solely to calculate operational health statistics for our active developer panels.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold dark:text-white text-slate-950 flex items-center gap-2">
              <Eye className="w-5 h-5 text-pink-500" />
              <span>3. External Services & Advertisements</span>
            </h2>
            <p>
              Our application uses Gemini APIs to parse layout details on failure. This is completed server-to-server and is totally secure, containing no user identity details whatsoever.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold dark:text-white text-slate-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>4. Changes to This Policy</span>
            </h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Any changes will be updated on this page with an updated timestamp. Your continued use of Pin Media constitutes your agreement to the privacy parameters.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
