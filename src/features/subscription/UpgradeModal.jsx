import { getUserStats } from "@/utils/api"
import { NavLink } from "react-router";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Check, Crown, Infinity, X, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";


function UpgradeModal({ limit = 15 }) {
  const { currentUser } = useSelector(state => state.auth)
  const [watchlistLength, setWatchlistLength] = useState(0)
  const [favoritesLength, setFavoritesLength] = useState(0)
  const dispatch = useDispatch()

  function handleUpgrade(e) {
    e.preventDefault()
    toast.success("This section will be available soon...")
    return

  }


  useEffect(() => {
    async function getSubscriptionState() {
      const data = await getUserStats(currentUser.userId)

      setWatchlistLength(data.watchList.length)
      setFavoritesLength(data.favorites.length)
    }
    getSubscriptionState()
  }, [currentUser.userId])

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          dispatch({type : "auth/closeSubscription"})
        }
      }}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-130 overflow-y-auto rounded-[14px] border border-[#263c59] bg-[#08121e] shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-modal-title"
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => dispatch({type : "auth/closeSubscription"})}
          aria-label="Close upgrade dialog"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#728096] transition hover:bg-[#142338] hover:text-white cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="px-6 pb-5 pt-8 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#302078] text-[#baa4f5] shadow-[0_0_25px_rgba(108,60,236,0.25)]">
            <Crown size={25} />
          </div>

          <h2
            id="upgrade-modal-title"
            className="mt-5 text-2xl font-bold text-white"
          >
            Upgrade to Premium
          </h2>

          <p className="mx-auto mt-2 max-w-100 text-sm leading-5 text-[#808797]">
            You've reached your plan limit.
          </p>

          <p className="mx-auto mt-1 max-w-102.5 text-xs leading-5 text-[#626f82]">
            Free accounts can save up to {limit} movies. Upgrade to Premium
            to add more and enjoy unlimited watchlist & favorites.
          </p>
        </div>

        {/* Current usage */}
        <div className="grid grid-cols-2 gap-3 px-6 sm:px-8">
          {/* Free */}
          <div className="rounded-[10px] border border-[#233b57] bg-[#0a1726] p-4">
            <div className="flex items-center gap-2">


              <span className="text-sm font-semibold text-white">
                Free
              </span>
            </div>

            <div className="mt-5">
              <div className="text-2xl font-bold text-white">
                {watchlistLength}
                <span className="text-sm font-normal text-[#6f8196]">
                  {" "}
                  / {limit}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-[#68778b]">
                watchlist movies
              </p>
            </div>
            <div className="mt-5">
              <div className="text-2xl font-bold text-white">
                {favoritesLength}
                <span className="text-sm font-normal text-[#6f8196]">
                  {" "}
                  / {limit}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-[#68778b]">
                favorites movies
              </p>
            </div>

          </div>

          {/* Premium */}
          <div className="rounded-[10px] border border-[#6c3cec] bg-[#17144b] p-4 shadow-[0_0_20px_rgba(108,60,236,0.15)]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                Premium
              </span>
            </div>

            <div className="">
              <div className="mt-5 flex items-center gap-1">
                <Infinity size={27} className="text-[#baa4f5]" />
              </div>

              <p className="mt-1 text-[11px] text-[#858bb0]">
                watchlist movies
              </p>
            </div>
            <div className="">
              <div className="mt-5 flex items-center gap-1">
                <Infinity size={27} className="text-[#baa4f5]" />
              </div>

              <p className="mt-1 text-[11px] text-[#858bb0]">
                favorites movies
              </p>
            </div>

          </div>
        </div>

        {/* Benefits */}
        <div className="px-6 py-6 sm:px-8">
          <div className="space-y-3">
            <Benefit text="Unlimited watchlist" />
            <Benefit text="Unlimited favorites" />
            <Benefit text="Premium features" />
            <Benefit text="Ad-free experience" />
            <Benefit text="Early access to new features" />
          </div>
        </div>

        {/* Price */}
        <div className="mx-6 rounded-[10px] border border-[#29385c] bg-[#101936] p-4 sm:mx-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Premium Plan
              </p>

              <p className="mt-1 text-xs text-[#707d93]">
                Cancel anytime
              </p>
            </div>

            <div className="text-right">
              <span className="text-xl font-bold text-white">$4.99</span>
              <span className="text-xs text-[#707d93]"> / month</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
          <button
            type="button"
            onClick={() => dispatch({type : "auth/closeSubscription"})}
            className="flex-1 rounded-[9px] border border-[#29405b] px-4 py-3 text-sm font-medium text-[#a5afbe] transition hover:bg-[#101f32] hover:text-white cursor-pointer"
          >
            Maybe Later
          </button>

          <NavLink
            onClick={handleUpgrade}
            type="button"
            to="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-[9px] bg-[#6c3cec] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5112ff] cursor-pointer"
          >
            Upgrade Now
            <ArrowRight size={16} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};


const Benefit = ({ text }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2c215f]">
        <Check size={12} className="text-[#baa4f5]" />
      </div>

      <span className="text-sm text-[#aeb7c6]">{text}</span>
    </div>
  );
};

export default UpgradeModal;
