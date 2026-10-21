import {
  Check,
  Crown,
  Infinity,
  Heart,
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getUserStats } from "@/utils/api";
import toast from "react-hot-toast";

const FREE_LIMIT = 15;

function SubscriptionPage({ currentPlan = "free" }) {
  const { currentUser } = useSelector((state) => state.auth);
  const [watchlistLength, setWatchlistLength] = useState(0);
  const [favoritesLength, setFavoritesLength] = useState(0);

  const isPremium = currentPlan === "premium";

  const watchlistPercentage = Math.min(
    (watchlistLength / FREE_LIMIT) * 100,
    100
  );

  const favoritesPercentage = Math.min(
    (favoritesLength / FREE_LIMIT) * 100,
    100
  );

  function handleUpgrade(e) {
    e.preventDefault();
    toast.success("This section will be available soon...");
  }

  useEffect(() => {
    if (!currentUser?.userId) return;

    let cancelled = false;

    async function getSubscriptionState() {
      try {
        const data = await getUserStats(currentUser.userId);

        if (cancelled) return;

        setWatchlistLength(data.watchList?.length ?? 0);
        setFavoritesLength(data.favorites?.length ?? 0);
      } catch {
        if (!cancelled) {
          toast.error("Unable to load your subscription usage.");
        }
      }
    }

    getSubscriptionState();

    return () => {
      cancelled = true;
    };
  }, [currentUser?.userId]);

  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-8 text-slate-900 transition-colors duration-200 dark:bg-[#040b14] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-200 dark:border-[#293548] dark:bg-[#08121e]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-400/15 blur-3xl dark:bg-[#6c3cec]/20" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl dark:bg-[#857adc]/10" />

          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 dark:border-[#6c3cec]/40 dark:bg-[#171b53] dark:text-[#baa4f5]">
              <Crown size={14} />
              Subscription
            </div>

            <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Choose Your Plan
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-[#a0aabd] sm:text-[15px]">
              Get more from your movie experience. Upgrade to Premium and enjoy
              unlimited watchlist and favorites.
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Free Plan */}
          <div
            className={`relative rounded-2xl border bg-white p-6 transition-all duration-300 dark:bg-[#08121e] ${
              !isPremium
                ? "border-violet-200 shadow-sm dark:border-[#293548]"
                : "border-slate-200 opacity-80 dark:border-[#293548]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-[#101f38] dark:text-[#baa4f5]">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    Free Plan
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-[#8b9bb0]">
                    Perfect for casual movie lovers
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-end gap-2">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">
                $0
              </span>
              <span className="mb-1 text-sm text-slate-500 dark:text-[#8b9bb0]">
                / forever
              </span>
            </div>

            {/* Features */}
            <div className="mt-7 space-y-3">
              <Feature text="Search movies" />
              <Feature text="Movie details" />
              <Feature text="Watchlist up to 15 movies" />
              <Feature text="Favorites up to 15 movies" />
              <Feature text="Mark movies as watched" />
              <Feature text="Ratings and reviews" />
            </div>

            {/* Usage */}
            <div className="mt-7 border-t border-slate-200 pt-6 dark:border-[#293548]">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Your Limits
              </h3>

              <UsageBar
                label="Watchlist"
                current={watchlistLength}
                limit={FREE_LIMIT}
                percentage={watchlistPercentage}
              />

              <UsageBar
                label="Favorites"
                current={favoritesLength}
                limit={FREE_LIMIT}
                percentage={favoritesPercentage}
              />
            </div>

            <button
              type="button"
              disabled
              className="mt-6 w-full cursor-default rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-sm font-medium text-slate-500 dark:border-[#29405b] dark:bg-[#101b2b] dark:text-[#a4afbd]"
            >
              {isPremium ? "Available Plan" : "Current Plan"}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="relative rounded-2xl border border-violet-300 bg-linear-to-br from-violet-50 to-white p-6 shadow-lg shadow-violet-200/30 transition-colors duration-200 dark:border-[#6c3cec] dark:from-[#111536] dark:to-[#0d1233] dark:shadow-[0_0_35px_rgba(108,60,236,0.18)]">
            <div className="absolute right-4 top-4 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-bold text-white dark:bg-[#857adc] sm:right-5 sm:top-5">
              MOST POPULAR
            </div>

            <div className="flex items-center gap-3 pr-24 sm:pr-28">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-[#33227d] dark:text-[#cfc7ff]">
                <Crown size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Premium Plan
                </h2>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-[#a0a4c2]">
                  For true movie enthusiasts
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-end gap-2">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">
                $4.99
              </span>
              <span className="mb-1 text-sm text-slate-500 dark:text-[#a0a4c2]">
                / month
              </span>
            </div>

            {/* Premium Features */}
            <div className="mt-7 space-y-3">
              <PremiumFeature text="Everything in Free" />
              <PremiumFeature text="Unlimited watchlist" />
              <PremiumFeature text="Unlimited favorites" />
              <PremiumFeature text="Premium features" />
              <PremiumFeature text="Early access to new releases" />
              <PremiumFeature text="Ad-free experience" />
            </div>

            {/* Unlimited Card */}
            <div className="mt-7 rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-[#45418b] dark:bg-[#171b53]">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-violet-600 dark:text-[#baa4f5]">
                  <Infinity size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Go Unlimited
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-[#a0aabd]">
                    Add as many movies as you want to your watchlist and
                    favorites.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUpgrade}
              disabled={isPremium}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
                isPremium
                  ? "cursor-default bg-slate-200 text-slate-500 dark:bg-[#1b2940] dark:text-[#748197]"
                  : "cursor-pointer bg-violet-600 text-white hover:bg-violet-700 dark:bg-[#6c3cec] dark:hover:bg-[#5112ff]"
              }`}
            >
              {isPremium ? "You're Premium" : "Upgrade to Premium"}
              {!isPremium && <ArrowRight size={16} />}
            </button>
          </div>
        </div>

        {/* Why Premium */}
        <section className="mt-12 border-t border-slate-200 pt-10 dark:border-[#293548]">
          <div className="mb-7">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Why Go Premium?
            </h2>

            <p className="mt-1 text-sm text-slate-600 dark:text-[#8b9bb0]">
              More freedom. More movies. More features.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            <Benefit
              icon={<Infinity size={20} />}
              title="Unlimited Watchlist"
              description="Save as many movies as you want."
            />

            <Benefit
              icon={<Heart size={20} />}
              title="Unlimited Favorites"
              description="Keep all your favorite movies."
            />

            <Benefit
              icon={<Zap size={20} />}
              title="Premium Features"
              description="Access additional features."
            />

            <Benefit
              icon={<Sparkles size={20} />}
              title="Ad-Free"
              description="Enjoy uninterrupted browsing."
            />

            <Benefit
              icon={<Crown size={20} />}
              title="More Value"
              description="Get more from Movie Explorer."
            />
          </div>
        </section>

        {/* Bottom CTA */}
        {!isPremium && (
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-violet-200 bg-linear-to-r from-violet-50 to-white transition-colors duration-200 dark:border-[#33255f] dark:from-[#111536] dark:to-[#0d1233]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl dark:bg-[#6c3cec]/20" />

            <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-[#302078] dark:text-[#baa4f5]">
                  <Crown size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    Upgrade Today
                  </h2>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600 dark:text-[#a0aabd]">
                    Unlock the full potential of Movie Explorer and take your
                    movie collection to the next level.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleUpgrade}
                className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 dark:bg-[#6c3cec] dark:hover:bg-[#5112ff]"
              >
                Upgrade to Premium
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* Feature */
const Feature = ({ text }) => (
  <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-[#b5bfce]">
    <Check size={16} className="shrink-0 text-violet-600 dark:text-[#baa4f5]" />
    <span>{text}</span>
  </div>
);

/* Premium Feature */
const PremiumFeature = ({ text }) => (
  <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-[#d0d3e2]">
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-[#33227d]">
      <Check size={12} className="text-violet-700 dark:text-[#baa4f5]" />
    </div>
    <span>{text}</span>
  </div>
);

/* Usage Bar */
const UsageBar = ({ label, current, limit, percentage }) => {
  const isFull = current >= limit;

  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-[#9aa5b5]">{label}</span>

        <span
          className={
            isFull
              ? "font-medium text-violet-700 dark:text-[#baa4f5]"
              : "text-slate-500 dark:text-[#8b9bb0]"
          }
        >
          {current} / {limit}
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={`${label} usage`}
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-valuenow={Math.min(current, limit)}
        className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-[#17283c]"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isFull ? "bg-violet-600 dark:bg-[#a78bfa]" : "bg-violet-500 dark:bg-[#857adc]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/* Benefit */
const Benefit = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-[#15284c] dark:text-[#baa4f5]">
      {icon}
    </div>

    <h3 className="mt-3 text-xs font-semibold text-slate-900 dark:text-white">
      {title}
    </h3>

    <p className="mx-auto mt-1 max-w-37.5 text-[11px] leading-4 text-slate-600 dark:text-[#8b9bb0]">
      {description}
    </p>
  </div>
);

export default SubscriptionPage;