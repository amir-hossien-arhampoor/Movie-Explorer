export const API_KEY = "cc2597cd"
export const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmU0NjYyNjk4MDRjNzc5ZGYyZjRhNzYxNTQxOTg1NyIsIm5iZiI6MTc4OTc1MTQwNC4yNDYsInN1YiI6IjZhYWQ3MDZjYjAyYThhODg2ZWFmYWYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RdmnXVnRJDEQJyk6iw1Hq_gKGB4R7_dfEWbeDbkzddg"
export const DB_WATCHLIST = "http://localhost:8001/watchlist"
export const DB_FAVORITES = "http://localhost:8001/favorites"
export const DB_USERS = "http://localhost:8001/users"
export const DB_WATCHEDMOVIES = "http://localhost:8001/watchedmovies"
export const DB_RECENTSEARCH = "http://localhost:8001/recentsearch"
export const DB_HOMEHEADERIMG = "http://localhost:8001/homepageheader"
export const DB_FEATUREDMOVIES = "http://localhost:8001/featuredmovies"
export const DB_POPULARMOVIES = "http://localhost:8001/popularmovies"
export const DB_TOPRATEDMOVIES = "http://localhost:8001/topratedmovies"
export const DB_SITE_SETTINGS = "http://localhost:8001/adminsetting"
export const DB_SITE_ACTIVITY = "http://localhost:8001/siteactivity"
export const DB_USERS_TICKET = "http://localhost:8001/usersTicket"
export const DB_USERS_NOTIFICATIONS = "http://localhost:8001/usersNotifications"

export const simulateApiDelay = () => new Promise(res => setTimeout(res, 1000))

export async function getUsers() {
  const data = await fetch(DB_USERS)
  return await data.json()
}

export async function getUser(id) {
  const data = await fetch(`${DB_USERS}/?id=${id}`)
  return await data.json()
}

export async function getWatchList(userId) {
  const data = await fetch(`${DB_WATCHLIST}/?userId=${userId}`)
  return await data.json()
}

export async function getFavorites(userId) {
  const data = await fetch(`${DB_FAVORITES}/?userId=${userId}`)
  return await data.json()
}

export async function getWatched(userId) {
  const data = await fetch(`${DB_WATCHEDMOVIES}/?userId=${userId}`)
  return await data.json()
}

export async function getRecentSearch(userId) {
  const data = await fetch(`${DB_RECENTSEARCH}/?userId=${userId}`)
  return await data.json()
}

export async function getUserStats(userId) {
  const watchListData = await getWatchList(userId)
  const favoritesData = await getFavorites(userId)
  const watchedData = await getWatched(userId)

  let totalRating = 0
  let ratedMovies = 0

  for (let i = 0; i < watchListData.length; i++) {
    if (watchListData[i].ratingNumber != null) {
      totalRating += watchListData[i].ratingNumber
      ratedMovies++
    }
  }

  const avgRating = ratedMovies > 0
    ? Math.floor(totalRating / ratedMovies)
    : 0

  return {
    watched: watchedData,
    watchList: watchListData,
    favorites: favoritesData,
    rating: avgRating,
  }
}

export async function getHomeHeaderImg() {
  const imgRes = await fetch(DB_HOMEHEADERIMG)
  return await imgRes.json()
}

export async function getFeaturedMovies() {
  const featuredRes = await fetch(DB_FEATUREDMOVIES)
  return await featuredRes.json()
}

export async function getPopularMovies() {
  const popularRes = await fetch(DB_POPULARMOVIES)
  return await popularRes.json()
}

export async function getTopRatedMovies() {
  const topRatedRes = await fetch(DB_TOPRATEDMOVIES)
  return await topRatedRes.json()
}

export async function checkMovieAsWatched({ userId, imdbID }) {
  const res = await fetch(`${DB_WATCHEDMOVIES}/?userId=${userId}&imdbID=${imdbID}`)
  const data = await res.json()
  return data
}

export async function getUsersStatistics() {
  const users = await getUsers();

  return {
    totalUsers: users.length,

    activeUsers: users.filter(
      (user) => user.status === "active"
    ).length,

    inactiveUsers: users.filter(
      (user) => user.status === "inactive"
    ).length,

    premiumUsers: users.filter(
      (user) => user.subscription?.plan === "premium"
    ).length,
  };
}

export async function getSiteActivities() {
  const data = await fetch(DB_SITE_ACTIVITY)
  return await data.json()
}

export async function getUsersTicket() {
  const data = await fetch(DB_USERS_TICKET)
  return await data.json()
}

export async function getUsersNotifications() {
  const data = await fetch(DB_USERS_NOTIFICATIONS)
  return await data.json()
}