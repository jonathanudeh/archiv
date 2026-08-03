import {
  School,
  Search,
  Bookmark,
  FolderOpen,
  Upload,
  Settings,
  Home,
} from "lucide-react";

export const sidebarItems = [
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
  {
    title: "Search",
    href: "/search",
    icon: Search,
  },
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
  {
    title: "Upload Material",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
