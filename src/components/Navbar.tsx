/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Download, Sun, Moon, History, HelpCircle, Mail, Sparkles, LayoutDashboard } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ darkMode, toggleTheme, currentPage, setCurrentPage }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: <Download className="w-4 h-4 text-pink-400" /> },
    { id: "about", label: "About", icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4 text-pink-400" /> },
    { id: "admin", label: "Admin", icon: <LayoutDashboard className="w-4 h-4 text-cyan-400" /> }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 dark:bg-[#0a021a]/60 bg-white/60 dark:border-white/10 border-slate-200/40" id="app-navbar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => {
              setCurrentPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} 
            id="navbar-brand"
          >
            <div className="bg-gradient-to-tr from-pink-500 to-rose-600 p-2 rounded-xl text-white shadow-md shadow-pink-500/20 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Pin Media
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1 sm:gap-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? "bg-pink-500/10 text-pink-500 dark:text-pink-400"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10"
                  }`}
                  id={`nav-btn-${item.id}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all border dark:border-white/10 border-slate-200 bg-white dark:bg-white/5 text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm ml-1"
              aria-label="Toggle visual theme"
              id="theme-toggle-btn"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 sm:w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
