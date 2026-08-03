"use client";

import { useNotification } from "../providers/NotificationProvider";

interface ShareOptions {
  title: string;
  text?: string;
  url?: string;
}

export function useShare() {
  const { success } = useNotification();

  async function share({
    title,
    text,
    url = window.location.href,
  }: ShareOptions) {
    try {
      console.log("navigator.share", navigator.share);
      console.log("navigator.share", navigator.clipboard);
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      success("Link copied to clipboard.");
    } catch {
      // User cancelled the share sheet or clipboard failed.
    }
  }

  return { share };
}
