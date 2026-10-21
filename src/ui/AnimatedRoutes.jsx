
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

import AppLayout from "./AppLayout";
import HomePage from "./HomePage/HomePage";
import SearchMovie from "../features/search/SearchMovie";
import MovieDetails from "./MovieDetails/MovieDetails";
import WatchList from "../features/watchlist/WatchList";
import FavoriteList from "../features/favoriteList/FavoriteList";
import UserProfile from "../features/userProfile/UserProfile";
import SettingMain from "../features/setting/SettingMain";
import AuthPage from "../features/auth/AuthPage";
import SubscriptionPage from "../features/subscription/SubscriptionPage";
import AdminSetting from "../features/admin/setting/AdminSetting";
import DashboardPage from "../features/admin/dashboard/DashboardPage";
import UserManagement from "../features/admin/users/UserManagement";
import UserDetails from "../features/admin/users/user-details/UserDetails";
import ManageMovies from "../features/admin/movies/ManageMovies";
import PopularMovies from "../features/admin/movies/PopularMovies";
import FeaturedMovies from "../features/admin/movies/FeaturedMovies";
import TopRatedMovies from "../features/admin/movies/TopRatedMovies";
import UserCreateTicket from "../features/userProfile/user-ticket/UserCreateTicket";
import UserTickets from "../features/userProfile/user-ticket/UserTickets";
import NotificationsPage from "../features/userProfile/user-notification/NotificationsPage";
import SupportTickets from "../features/admin/tickets/SupportTickets";
import NotFound from "@/ui/NotFound";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<AppLayout />}>
          <Route
            index
            element={<PageTransition><HomePage /></PageTransition>}
          />

          <Route path="auth" element={<PageTransition><AuthPage /></PageTransition>} />
          <Route path="setting" element={<PageTransition><SettingMain /></PageTransition>} />
          <Route path="admin-setting" element={<PageTransition><AdminSetting /></PageTransition>} />

          <Route path="admin-dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
          <Route path="admin-dashboard/manage-movies" element={<PageTransition><ManageMovies /></PageTransition>} />
          <Route path="admin-dashboard/manage-movies/popular-movies" element={<PageTransition><PopularMovies /></PageTransition>} />
          <Route path="admin-dashboard/manage-movies/featured-movies" element={<PageTransition><FeaturedMovies /></PageTransition>} />
          <Route path="admin-dashboard/manage-movies/toprated-movies" element={<PageTransition><TopRatedMovies /></PageTransition>} />
          <Route path="admin-dashboard/manage-movies/:movieDetails" element={<PageTransition><MovieDetails /></PageTransition>} />

          <Route path="tickets" element={<PageTransition><SupportTickets /></PageTransition>} />

          <Route path="admin-dashboard/users" element={<PageTransition><UserManagement /></PageTransition>} />
          <Route path="admin-dashboard/users/:userDetails" element={<PageTransition><UserDetails /></PageTransition>} />

          <Route path="subscription" element={<PageTransition><SubscriptionPage /></PageTransition>} />

          <Route path="profile" element={<PageTransition><UserProfile /></PageTransition>} />
          <Route path="profile/create-ticket" element={<PageTransition><UserCreateTicket /></PageTransition>} />
          <Route path="profile/user-tickets" element={<PageTransition><UserTickets /></PageTransition>} />
          <Route path="profile/notifications" element={<PageTransition><NotificationsPage /></PageTransition>} />

          <Route path="explore" element={<PageTransition><SearchMovie /></PageTransition>} />
          <Route path="explore/:movieDetails" element={<PageTransition><MovieDetails /></PageTransition>} />

          <Route path="watchlist" element={<PageTransition><WatchList /></PageTransition>} />
          <Route path="watchlist/:movieDetails" element={<PageTransition><MovieDetails /></PageTransition>} />

          <Route path="favorites" element={<PageTransition><FavoriteList /></PageTransition>} />
          <Route path="favorites/:movieDetails" element={<PageTransition><MovieDetails /></PageTransition>} />

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
