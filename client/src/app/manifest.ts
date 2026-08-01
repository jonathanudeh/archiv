import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Archiv",
    short_name: "Archiv",
    description: "Find, share, and download verified academic materials.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#172033",
    icons: [
      {
        src: "/archiv-logo/archivIcon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
