/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Heart, Download } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "privacy", label: "Privacy Policy" },
    { id: "terms", label: "Terms of Service" },
    { id: "contact", label: "Contact Support" },
    { id: "admin", label: "Admin Portal" }
  ];

  return (
    <footer className="w-full mt-auto border-t dark:border-white/10 border-slate-200/80 transition-colors duration-300 dark:bg-[#0a021a]/60 bg-slate-50/60 py-10" id="app-footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Branding */}
        <div 
          className="flex items-center justify-center gap-2 cursor-pointer" 
          onClick={() => {
            setCurrentPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          id="footer-branding"
        >
          <div className="bg-gradient-to-tr from-pink-500 to-rose-600 p-1.5 rounded-lg text-white">
            <Download className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-base tracking-tight dark:text-white text-slate-950">
            Pin Media Downloader
          </span>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentPage(link.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-pink-500 transition-colors cursor-pointer"
              id={`footer-link-${link.id}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-sans max-w-xl mx-auto leading-relaxed" id="footer-disclaimer">
          <strong>Disclaimer:</strong> Pin Media is an independent scraper and utility tool. We are not associated, affiliated, endorsed, or officially connected with Pinterest Inc., or any of its subsidiaries or affiliates. All Pinterest graphics, logos, and trademarks are the property of Pinterest Inc. We respect intellectual property rights; please obtain permission from owners before downloading copyrighted content.
        </p>

        {/* Bottom Credits */}
        <div className="pt-4 border-t dark:border-white/5 border-slate-200/40 text-xs text-slate-500 dark:text-slate-400 font-sans flex flex-col sm:flex-row items-center justify-between gap-4" id="footer-credits-row">
          <span>&copy; {currentYear} Pin Media. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> using Express, React & Gemini AI
          </span>
        </div>
      </div>
    </footer>
  );
}
