import {
  Heart,
  Bookmark,
  Home,
  Clapperboard,
  Tv,
  Users,
  Tag,
  Settings,
  Bolt,
  LayoutDashboard,
  MessageCircleWarning,
  Film,
  Camera,
  Video,
  Play,
  Ticket,
  Popcorn,
  Star,
  MonitorPlay,
  Projector,
  Megaphone,
  Drama,
  Sparkles,
  Crown,
  Award,
  Glasses,
  CirclePlay,
  RectangleHorizontal,
} from "lucide-react"

export const navBtnData = [
  {
    id: 1,
    text: "Home",
    to: "",
    icon: Home
  },
  {
    id: 2,
    text: "Movies",
    to: "explore",
    icon: Clapperboard
  },
  {
    id: 3,
    text: "TV Shows",
    to: "TVshow",
    icon: Tv
  },
  {
    id: 4,
    text: "People",
    to: "people",
    icon: Users
  },
  {
    id: 5,
    text: "Genre",
    to: "genre",
    icon: Tag
  },
  {
    id: 6,
    text: "Favorites",
    to: "favorites",
    icon: Heart
  },
  {
    id: 7,
    text: "Watchlist",
    to: "watchlist",
    icon: Bookmark
  },
  {
    id: 8,
    text: "Settings",
    to: "setting",
    icon: Settings
  }
]

export const adminNavBtnData = [
  {
    id: 1,
    text: "Home",
    to: "",
    icon: Home
  },
  {
    id: 2,
    text: "Admin Setting",
    to: "admin-setting",
    icon: Bolt
  },
  {
    id: 3,
    text: "Dashboard",
    to: "admin-dashboard",
    icon: LayoutDashboard
  },
  {
    id: 4,
    text: "Support Tickets",
    to: "tickets",
    icon: MessageCircleWarning
  },
]

export const sidebarBtnStyle = ({ isActive }) =>
  `
  flex h-10 w-full items-center dark:text-white gap-2 rounded-lg pl-4 text-sm font-medium transition hover:text-[#7040ed] active:scale-[0.99] cursor-pointer
  ${isActive ? "bg-linear-to-r from-[#6030e8] to-[#7040ed] text-white hover:text-white shadow-lg shadow-purple-900/20" : ""}`

export const movieIcons = [
  { name: "Film", icon: Film },
  { name: "Clapperboard", icon: Clapperboard },
  { name: "Camera", icon: Camera },
  { name: "Video", icon: Video },
  { name: "Play", icon: Play },
  { name: "Circle Play", icon: CirclePlay },
  { name: "Ticket", icon: Ticket },
  { name: "Popcorn", icon: Popcorn },
  { name: "Star", icon: Star },
  { name: "TV", icon: Tv },
  { name: "Monitor Play", icon: MonitorPlay },
  { name: "Projector", icon: Projector },
  { name: "Megaphone", icon: Megaphone },
  { name: "Drama", icon: Drama },
  { name: "Sparkles", icon: Sparkles },
  { name: "Crown", icon: Crown },
  { name: "Award", icon: Award },
  { name: "Glasses", icon: Glasses },
  { name: "Rectangle", icon: RectangleHorizontal },
];

