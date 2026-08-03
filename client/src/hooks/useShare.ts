"use client";

import { useNotification } from "../providers/NotificationProvider";

interface ShareOptions {
  title: string;
  text?: string;
  url?: string;
}

export function useShare() {
  const { success, error } = useNotification();

  async function share({
    title,
    text,
    url = window.location.href,
  }: ShareOptions) {
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title,
          text,
          url,
        });

        return;
      }

      if (typeof navigator.clipboard?.writeText === "function") {
        await navigator.clipboard.writeText(url);

        success("Link copied to clipboard.");

        return;
      }

      // Legacy fallback
      const input = document.createElement("input");

      input.value = url;

      document.body.appendChild(input);

      input.select();

      document.execCommand("copy");

      document.body.removeChild(input);

      success("Link copied to clipboard.");
    } catch (err) {
      console.error(err);

      error("Couldn't share this page.");
    }
  }

  return { share };
}
