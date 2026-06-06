"use client";

import { useNotification } from "@/src/providers/NotificationProvider";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, XCircle } from "lucide-react";

export default function Notification() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-5 right-5 z-9999 flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: 100,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Top Accent Bar */}
            <div
              className={`h-1 w-full ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            />

            <div className="flex items-start gap-4 p-4">
              {/* Icon */}

              <div className="mt-0.5 shrink-0">
                {notification.type === "success" ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : (
                  <XCircle size={20} className="text-red-500" />
                )}
              </div>

              {/* Content */}

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#172033]">
                  {notification.type === "success" ? "Success" : "Error"}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {notification.message}
                </p>
              </div>

              {/* Close */}

              <button
                onClick={() => removeNotification(notification.id)}
                className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
