/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, CheckCircle, User, MessageSquare, HelpCircle } from "lucide-react";

interface ContactPageProps {
  addToast: (text: string, type?: "success" | "error" | "info") => void;
}

export default function ContactPage({ addToast }: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Query");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addToast("Please fill in all required fields", "error");
      return;
    }

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      addToast("Your support message has been sent successfully!", "success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto px-4 py-8 text-left"
      id="contact-page-container"
    >
      <div className="glass-card-light dark:glass-card-dark rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-pink-500/10 text-pink-500 mb-2">
            <Mail className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight dark:text-white text-slate-950">
            Contact Support
          </h1>
          <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-500">
            Have questions or encountered an extraction issue? Send us a line.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-6 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-center space-y-4"
              id="contact-success-state"
            >
              <CheckCircle className="w-12 h-12 text-pink-500 mx-auto animate-bounce" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold dark:text-white text-slate-900">Message Dispatched</h3>
                <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600">
                  Thank you! Our technical team has received your message and will review it within 24 hours.
                </p>
              </div>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
              id="contact-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold dark:text-white/70 text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-pink-400" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 text-slate-950 dark:text-white border dark:border-white/15 border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500/50 text-xs sm:text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold dark:text-white/70 text-slate-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-pink-400" />
                    <span>Your Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 text-slate-950 dark:text-white border dark:border-white/15 border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500/50 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold dark:text-white/70 text-slate-700 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                  <span>Subject</span>
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-[#1a0b36] text-slate-900 dark:text-white border dark:border-white/15 border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500/50 text-xs sm:text-sm cursor-pointer"
                >
                  <option value="General Query">General Query</option>
                  <option value="Bug Report">Extraction Failure / Bug Report</option>
                  <option value="Business Inquiry">API Access / Partnerships</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold dark:text-white/70 text-slate-700 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-pink-400" />
                  <span>Your Message *</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us details about your request..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 text-slate-950 dark:text-white border dark:border-white/15 border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500/50 text-xs sm:text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
