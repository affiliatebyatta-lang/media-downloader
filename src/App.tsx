/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DownloaderCard from "./components/DownloaderCard";
import ResultCard from "./components/ResultCard";
import RecentDownloads from "./components/RecentDownloads";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import Toast, { ToastMessage } from "./components/Toast";
import { MediaMetadata, RecentDownload } from "./types";
import { Sparkles, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Subpages
import AboutPage from "./components/AboutPage";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import ContactPage from "./components/ContactPage";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Default to dark mode for modern visual feel
    const saved = localStorage.getItem("pin_theme");
    return saved !== null ? saved === "dark" : true;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [history, setHistory] = useState<RecentDownload[]>([]);

  // Load theme and download history on mount
  useEffect(() => {
    // Apply theme
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Load history
    const savedHistory = localStorage.getItem("pin_download_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error("Failed to parse history", err);
      }
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("pin_theme", next ? "dark" : "light");
      return next;
    });
  };

  const addToast = (text: string, type: "success" | "error" | "info" = "info") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Convert/Fetch Pinterest URL
  const handleFetchMedia = async (url: string, format: "auto" | "video" | "image" = "auto") => {
    setIsLoading(true);
    setMetadata(null);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, format }),
      });

      let data: any;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        const cleanText = text.length > 100 ? text.substring(0, 100) + "..." : text;
        throw new Error(cleanText || `Request failed with status ${response.status}`);
      }

      if (!response.ok || !data.success) {
        throw new Error(data?.error || "Failed to fetch media from Pinterest pin.");
      }

      // Success
      setMetadata(data);
      addToast("Successfully extracted Pinterest media links!", "success");

      // Save to download history
      const newHistoryItem: RecentDownload = {
        id: Date.now().toString(),
        title: data.title,
        thumbnail: data.thumbnail,
        sourceUrl: data.sourceUrl,
        timestamp: Date.now(),
        mediaType: data.mediaType,
        downloads: data.downloads,
      };

      setHistory((prev) => {
        // Prevent duplicates by checking source URL
        const filtered = prev.filter((item) => item.sourceUrl !== data.sourceUrl);
        const updated = [newHistoryItem, ...filtered].slice(0, 10); // Keep last 10 records
        localStorage.setItem("pin_download_history", JSON.stringify(updated));
        return updated;
      });

    } catch (err: any) {
      console.error("Downloader submission error:", err);
      addToast(err.message || "Extraction failed. Please make sure the Pin is public.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Select a recent download to view details instantly
  const handleSelectRecent = (item: RecentDownload) => {
    setMetadata({
      success: true,
      title: item.title,
      description: "",
      thumbnail: item.thumbnail,
      downloads: item.downloads,
      sourceUrl: item.sourceUrl,
      mediaType: item.mediaType,
    });
    addToast(`Loaded "${item.title}" from history`, "success");
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  // Clear local download history
  const handleClearHistory = () => {
    localStorage.removeItem("pin_download_history");
    setHistory([]);
    addToast("Download history cleared successfully.", "success");
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 font-sans dark:bg-[#0a021a] bg-rose-50/20 text-slate-900 dark:text-white relative overflow-hidden" id="app-root-container">
      {/* Animated Background Elements (Frosted Glass Glow Blobs) */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] dark:bg-purple-600/20 bg-purple-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[-50px] w-[400px] h-[400px] dark:bg-cyan-500/20 bg-pink-400/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Toast Notification Layer */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Navigation */}
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Layout Area */}
      <main className="flex-grow max-w-6xl w-full mx-auto pb-16 pt-4">
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Banner */}
              <Hero />

              {/* Downloader Form Card */}
              <DownloaderCard onSubmit={handleFetchMedia} isLoading={isLoading} addToast={addToast} />

              {/* Loading Skeletons */}
              {isLoading && (
                <div className="max-w-4xl mx-auto px-4 mb-16" id="skeleton-loader">
                  <div className="glass-card-light dark:glass-card-dark rounded-3xl p-6 sm:p-8 animate-pulse space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b dark:border-slate-800/80 border-slate-200/80">
                      <div className="h-5 bg-slate-300 dark:bg-slate-800 rounded w-1/4" />
                      <div className="h-5 bg-slate-300 dark:bg-slate-800 rounded w-16" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      <div className="md:col-span-5 flex justify-center">
                        <div className="w-[280px] aspect-square rounded-2xl bg-slate-300 dark:bg-slate-800" />
                      </div>
                      <div className="md:col-span-7 space-y-5">
                        <div className="h-6 bg-slate-300 dark:bg-slate-800 rounded w-3/4" />
                        <div className="h-4 bg-slate-300 dark:bg-slate-800 rounded w-full" />
                        <div className="h-4 bg-slate-300 dark:bg-slate-800 rounded w-5/6" />
                        <div className="pt-4 space-y-3">
                          <div className="h-12 bg-slate-300 dark:bg-slate-800 rounded-xl" />
                          <div className="h-12 bg-slate-300 dark:bg-slate-800 rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conversion Results Display */}
              <AnimatePresence mode="wait">
                {metadata && !isLoading && (
                  <ResultCard metadata={metadata} onClear={() => setMetadata(null)} addToast={addToast} />
                )}
              </AnimatePresence>

              {/* Recent History Grid */}
              <RecentDownloads history={history} onSelect={handleSelectRecent} onClearHistory={handleClearHistory} />

              {/* Collapsible FAQ Section */}
              <FAQSection />
            </motion.div>
          )}

          {currentPage === "about" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage />
            </motion.div>
          )}
          {currentPage === "privacy" && (
            <motion.div
              key="privacy-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PrivacyPage />
            </motion.div>
          )}
          {currentPage === "terms" && (
            <motion.div
              key="terms-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <TermsPage />
            </motion.div>
          )}
          {currentPage === "contact" && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage addToast={addToast} />
            </motion.div>
          )}
          {currentPage === "admin" && (
            <motion.div
              key="admin-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AdminDashboard addToast={addToast} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Area */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
