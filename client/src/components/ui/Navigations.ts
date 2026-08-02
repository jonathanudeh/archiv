import {
  Home,
  School,
  Bookmark,
  Upload,
  FolderOpen,
  Settings,
} from "lucide-react";

export const sidebarSections = [
  {
    title: "Discover",
    items: [
      {
        title: "Home",
        href: "/",
        icon: Home,
      },
      {
        title: "Browse Schools",
        href: "/schools",
        icon: School,
      },
    ],
  },

  {
    title: "Library",
    items: [
      {
        title: "Saved Materials",
        href: "/profile/saved",
        icon: Bookmark,
      },
      {
        title: "My Uploads",
        href: "/profile/my-uploads",
        icon: FolderOpen,
      },
    ],
  },

  {
    title: "Create",
    items: [
      {
        title: "Upload Material",
        href: "/upload",
        icon: Upload,
      },
    ],
  },

  {
    title: "General",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];
