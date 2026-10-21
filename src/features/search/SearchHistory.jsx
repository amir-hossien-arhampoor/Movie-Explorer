import RecentSearchItem from "@/features/search/RecentSearchItem"
import { getRecentSearches, removeAllRecentSearch } from "@/features/search/SearchSlice"
import { Flame, Loader2, RotateCcwClock } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const popularSearches = [
  "Dune",
  "Interstellar",
  "Batman",
  "Oppenheimer",
  "Inception",
  "Avatar"
]

function SearchHistory() {
  const { recentSearches } = useSelector(state => state.search)
  const [isDeleting,setIsDeleting] = useState(false)
  const { currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  async function handleClearSearch() {
    setIsDeleting(true)

    await dispatch(removeAllRecentSearch({ userId: currentUser?.userId }))

    setIsDeleting(false)
  }

  useEffect(() => {
    async function getSearch() {
      await dispatch(getRecentSearches( currentUser?.userId ))
    }
    getSearch()
  }, [currentUser?.userId, dispatch])

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="dark:border-[#123052] lg:w-[40%] dark:bg-[#03111f] border-2 rounded-[10px] p-3 mt-2">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 text-[14px]">
            <RotateCcwClock size={20} color="#5c3fd7" />
            <p>Recent Searches</p>
          </div>
          <button
            className="text-[12px] cursor-pointer flex items-center gap-1"
            onClick={handleClearSearch}
          >
            {isDeleting && <Loader2 size={14} className="animate-spin" />}
            <p>Clear all</p>
          </button>
        </div>
        <div className=" mt-3 max-h-35 overflow-scroll overflow-x-hidden">
          {recentSearches?.map((search, index) => <RecentSearchItem key={index} text={search} />)}
        </div>
      </div>

      <div className=" dark:border-[#123052]  dark:bg-[#03111f] border-2 rounded-[10px] p-3 mt-2">

        <div className="flex items-center gap-2">
          <Flame fill="#9277f7" color="#9277f7" size={20} />
          <p className="text-[18px] font-bold">Popular Searches</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {popularSearches.map((item, index) => {
            return (
              <span
                key={index} 
                className="
                border dark:border-[#244061] dark:bg-[#041939] px-4 
                py-1 rounded-2xl text-[12px] cursor-pointer transition-all 
                duration-150 ease-in-out hover:dark:bg-[#082d64] hover:bg-[#5e90db]
                "
                onClick={() => dispatch({type : "search/setQuery",payload : item})}
              >
                {item}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchHistory