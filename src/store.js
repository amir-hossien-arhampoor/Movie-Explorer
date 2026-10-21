import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/search/SearchSlice"
import watchListReducer from "./features/watchlist/WatchListSlice"
import favoriteReducer from "./features/favoriteList/FavoriteSlice"
import themeReducer from "./features/theme/ThemeSlice"
import signUpReducer from "./features/auth/SignUpSlice"
import logInReducer from "./features/auth/LogInSlice"
import authReducer from "./features/auth/AuthSlice"
import editProfileReducer from "./features/userProfile/EditProfileSlice"
import watchedMovieReducer from "./features/watchedmovies/watchedMoviesSlice"
import editPasswordReducer from "./features/userProfile/ChangePasswordSlice"
import settingReducer from "./features/setting/SettingSlice"
import movieDetailReducer from "./ui/MovieDetails/MovieDetailsSlice"
import siteSettingsReducer from "./features/admin/setting/AdminSettingSlice"
import dashboardReducer from "@/features/admin/dashboard/DashboardSlice";
import siteActivityReducer from "@/features/admin/dashboard/SiteActivitySlice";
import userManagementReducer from "@/features/admin/users/UserManagementSlice";
import userEditDetailsReducer from "@/features/admin/users/user-details/UserEditDetailsSlice";
import manageMoviesReducer from "@/features/admin/movies/ManageMoviesSlice"
import userTicketReducer from "@/features/userProfile/user-ticket/userTicketSlice"
import supportTicketReducer from "@/features/admin/tickets/SupportTicketSlice"
import notificationsReducer from "@/features/userProfile/user-notification/NotificationSlice"


export const store = configureStore({
  reducer : {
    search : searchReducer,
    watchList : watchListReducer,
    favorite : favoriteReducer,
    theme : themeReducer,
    signUp : signUpReducer,
    logIn : logInReducer,
    auth : authReducer,
    editProfile : editProfileReducer,
    watchedMovie : watchedMovieReducer,
    editPassword : editPasswordReducer,
    setting : settingReducer,
    movieDetail : movieDetailReducer,
    siteSettings: siteSettingsReducer,
    dashboard: dashboardReducer,
    siteActivity: siteActivityReducer,
    userManagement: userManagementReducer,
    userEditDetails: userEditDetailsReducer,
    manageMovies: manageMoviesReducer,
    userTicket: userTicketReducer,
    supportTicket: supportTicketReducer,
    notifications: notificationsReducer,
  }
})