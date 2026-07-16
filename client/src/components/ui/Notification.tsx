"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, X, AlertCircle } from "lucide-react";
import { useNotification } from "@/src/providers/NotificationProvider";

export default function Notification() {
  const { notification, removeNotification } = useNotification();

  const icon =
    notification?.type === "success" ? (
      <Check className="h-4 w-4" />
    ) : notification?.type === "error" ? (
      <AlertCircle className="h-4 w-4" />
    ) : (
      <Info className="h-4 w-4" />
    );

  const color =
    notification?.type === "success"
      ? "bg-emerald-500"
      : notification?.type === "error"
        ? "bg-red-500"
        : "bg-slate-900";

  return (
    <AnimatePresence mode="wait">
      {notification && (
        <motion.div
          key={notification.id}
          initial={{
            opacity: 0,
            y: -20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.95,
          }}
          transition={{
            duration: 0.2,
          }}
          className="fixed top-5 left-1/2 z-9999 w-[calc(100%-32px)] max-w-md -translate-x-1/2"
        >
          <div
            className={`flex items-center gap-3 rounded-full px-5 py-3 text-white shadow-2xl ${color}`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
              {icon}
            </div>

            <p className="flex-1 truncate text-sm font-medium">
              {notification.message}
            </p>

            <button
              onClick={removeNotification}
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
