/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: ToastMessage; onClose: () => void; key?: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    toast.type === "success"
      ? "bg-green-500/10 border-green-500/30 text-green-400"
      : toast.type === "error"
      ? "bg-red-500/10 border-red-500/30 text-red-400"
      : "bg-blue-500/10 border-blue-500/30 text-blue-400";

  const Icon = toast.type === "success" ? CheckCircle : AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border backdrop-blur-md ${bgColor} shadow-lg`}
      id={`toast-${toast.id}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium font-sans">{toast.text}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
        aria-label="Close notification"
        id={`btn-close-toast-${toast.id}`}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
