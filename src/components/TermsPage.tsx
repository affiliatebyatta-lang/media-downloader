/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { FileText, AlertTriangle, ShieldCheck, Scale, Info } from "lucide-react";

export default function TermsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-8 text-left"
      id="terms-page-container"
    >
      <div className="glass-card-light dark:glass-card-dark rounded-3xl p-6 sm:p-10 relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Title */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-pink-500/10 text-pink-500 dark:text-pink-400">
            <Scale className="w-3.5 h-3.5" />
            <span>Operational Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight dark:text-white text-slate-950">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-500">
            Last Updated: July 14, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 dark:text-slate-300 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-lg font-bold dark:text-white text-slate-950 flex items-center gap-2">
              <Info className="w-5 h-5 text-pink-500" />
              <span>1. Intellectual Property & Fair Use</span>
            </h2>
            <p>
              Pin Media is a utility tool designed solely to help users download and backup their own publicly shared Pinterest media elements for personal, offline, and educational use.
            </p>
            <p>
              We do not host, store, or re-publish any of the video, image, or GIF assets extracted. All media files are directly stored on Pinterest servers. You must respect the intellectual property rights of original owners and content creators. Downloading copyrighted materials for commercial distribution without explicit permission is strictly prohibited.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold dark:text-white text-slate-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>2. Acceptable Use Policy</span>
            </h2>
            <p>
              You agree to use Pin Media only for lawful purposes. You are strictly forbidden from abusing our scraping services, spamming API routes, performing brute-force extraction, or using automated scripts to bypass security boundaries.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold dark:text-white text-slate-950 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-pink-500" />
              <span>3. Disclaimer of Warranties</span>
            </h2>
            <p>
              Pin Media is provided on an "as-is" and "as-available" basis, without any warranties or guarantees of any kind, either express or implied. Pinterest constantly updates its platform systems, and we do not guarantee that our tools will always remain active, error-free, or fully functional at all times.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold dark:text-white text-slate-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>4. Liability Limitation</span>
            </h2>
            <p>
              Under no circumstances shall the developer or team of Pin Media be liable for any indirect, incidental, consequential, or punitive damages resulting from your access to, use of, or download files from our service.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
