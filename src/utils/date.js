export default  function getCurrentDate() {
  const date = new Date();

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export const formatNumber = (number) => {
  if (number >= 1_000_000) {
    return `${Math.floor(number / 1_000_000)}M`;
  }

  if (number >= 1_000) {
    return `${Math.floor(number / 1_000)}K`;
  }

  return number.toString();
};

export const formatRuntime = (runtime) => {
  const minutes = parseInt(runtime);

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;

  return `${hours}h ${remainingMinutes}m`;
};

export function timeAgo(timestamp) {
  const now = Date.now();
  const past = new Date(timestamp).getTime();

  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export const capitalizeFirstLetter = (str = "") => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).replace(" at ", " · ");
}

export function shortenName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  return parts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}