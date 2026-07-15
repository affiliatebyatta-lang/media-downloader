/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How do I download a Pinterest video, image, or GIF?",
      answer: "It is extremely simple! First, open Pinterest, navigate to the Pin you want to save, and copy its URL from the browser address bar or the share menu. Then, paste the copied link into the input field at the top of Pin Media, click 'Fetch Downloads', and select your desired format (Video, Image, or GIF) to save it directly to your device.",
    },
    {
      question: "Is this Pinterest downloader completely free to use?",
      answer: "Yes, 100% free! You don't need to create an account, register, or install any software. There are absolutely no daily limits, paywalls, or hidden charges. You can download as many Pinterest pins as you want.",
    },
    {
      question: "Can I download Pinterest videos in high-definition (HD) quality?",
      answer: "Absolutely! Our system accesses Pinterest's original media servers to extract the highest available quality, up to 1080p Full HD for videos, and original source resolution for images (by upscaling standard Pinterest images to their original '/originals/' folder file counterparts).",
    },
    {
      question: "Can I download private Pins or group boards?",
      answer: "No. Our scraper can only extract media from publicly accessible Pinterest pins. If a Pin is set to private, secret, or restricted to certain accounts, we cannot access or fetch its media for security and privacy reasons.",
    },
    {
      question: "Where are the downloaded files saved on my computer or smartphone?",
      answer: "By default, your browser saves all downloaded files inside your system's default 'Downloads' folder. On Windows or Mac, you can press Ctrl+J (or Cmd+Option+L) to open your browser downloads history and find your file instantly.",
    },
    {
      question: "Is it safe and secure to use Pin Media Downloader?",
      answer: "Yes! Pin Media Downloader is completely secure. We do not store any of your personal details or downloaded files on our servers. The entire extraction and download process is processed dynamically on-the-fly, and we use local browser storage (localStorage) only to keep your past download history visible to you.",
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 scroll-mt-20" id="faq-section">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Need Help?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold dark:text-white text-slate-950 tracking-tight flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-pink-500" />
          <span>Frequently Asked Questions</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-sans mt-2 max-w-lg mx-auto">
          Have questions about using our tool or need tips? Find answers below.
        </p>
      </div>

      <div className="space-y-4" id="faq-accordion-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="glass-card-light dark:glass-card-dark rounded-2xl overflow-hidden transition-all duration-200"
              id={`faq-item-${index}`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors cursor-pointer"
                id={`faq-btn-toggle-${index}`}
              >
                <span className="font-display font-semibold text-sm sm:text-base dark:text-white text-slate-950">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-pink-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans border-t dark:border-white/10 border-slate-200/50 leading-relaxed text-left">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
