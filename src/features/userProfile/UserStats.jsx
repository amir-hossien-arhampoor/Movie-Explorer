import { BookMarked, Clapperboard, Heart, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getUserStats } from "../../utils/api"

function UserStats() {
  const [userStats,setUserStats] = useState({})
  const {currentUser} = useSelector(state => state.auth)
  
  useEffect(() => {
    async function getStats() {
      const res = await getUserStats(currentUser?.userId)
      setUserStats(await res)
    }
    getStats()

  },[currentUser?.userId])

  return (
    <div className="dark:bg-[#03111f] border border-[#edf3f8] bg-white dark:border-[#123052] rounded-[13px] mt-3 flex flex-col p-4 gap-1 lg:w-[50%]">

      <p className="text-[13px] font-bold">My Stats</p>

      <div className="flex justify-between gap-1 ">
        <div className="flex items-center gap-3">
          <div className="bg-[#c54cfd1a] w-7 h-7 flex justify-center items-center rounded-[100%] border border-[#746a7a83]">
            <Clapperboard color="#8B5CF6" size={16} />
          </div>
          <div className="text-[10px]">
            <span className="lg:text-[16px] text-[13px] font-bold md:text-[15px]">{userStats.watched?.length}</span>
            <p className="text-gray-400 text-[12px] lg:text-[11px] md:text-[10px]">Movies Watched</p>
          </div>
        </div>

        <span className="w-0.5 block dark:bg-[#292D35] bg-[#edf3f8]"></span>

        <div className="flex items-center gap-3">
          <div className="bg-[#cc7bff1a] w-7 h-7 flex justify-center items-center rounded-[100%] border border-[#746a7a83]">
            <BookMarked color="#8B5CF6" size={16} />
          </div>
          <div className="text-[10px]">
            <span className="lg:text-[16px] text-[13px] font-bold md:text-[15px]">{userStats.watchList?.length}</span>
            <p className="text-gray-400 text-[12px] lg:text-[11px] md:text-[10px]">In Watchlist</p>
          </div>
        </div>

        <span className="w-0.5 block dark:bg-[#292D35] bg-[#edf3f8]"></span>

        <div className="flex items-center gap-3">
          <div className="bg-[#cc7bff1a] w-7 h-7 flex justify-center items-center rounded-[100%] border border-[#746a7a83]">
            <Heart color="#8B5CF6" size={16} />
          </div>
          <div className="text-[10px]">
            <span className="lg:text-[16px] text-[13px] font-bold md:text-[15px]">{userStats.favorites?.length}</span>
            <p className="text-gray-400 text-[12px] lg:text-[11px] md:text-[10px]">Favorites</p>
          </div>
        </div>

        <span className="w-0.5 block dark:bg-[#292D35] bg-[#edf3f8]"></span>

        <div className="flex items-center gap-3">
          <div className="bg-[#cc7bff1a] w-7 h-7 flex justify-center items-center rounded-[100%] border border-[#746a7a83]">
            <Star color="#8B5CF6" size={16} />
          </div>
          <div className="text-[10px]">
            <span className="lg:text-[16px] text-[13px] font-bold md:text-[15px]">{userStats?.rating}</span>
            <p className="text-gray-400 text-[12px] lg:text-[11px] md:text-[10px]">Average Rating</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserStats