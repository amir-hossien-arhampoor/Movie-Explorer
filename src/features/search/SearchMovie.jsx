import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import SearchResult from "./SearchResult"
import AuthRequired from "../../components/AuthRequired"
import SearchHistory from "@/features/search/SearchHistory"
import SearchSort from "@/features/search/SearchSort"
import { getMovieAndContentSettings } from "@/features/admin/setting/AdminSettingSlice"



function SearchMovie() {
  const { movieAndContentSettings } = useSelector(state => state.siteSettings)
  const { isAllowToAdd } = useSelector(state => state.search)
  const [isActiveSort, setIsActiveSort] = useState(movieAndContentSettings.defaultsortorder)
  const dispatch = useDispatch()
  
  useEffect(() => {
    async function getData() {
      await dispatch(getMovieAndContentSettings())
    }
    getData()

  }, [ dispatch])
  return (
    <>

      <div className=" mx-6 my-4">
        <div className="flex gap-5 flex-col">
          <SearchBar />
          <span className="w-full h-0.5 rounded-2xl dark:bg-[#081625]"></span>
          <SearchHistory />
        </div>
        <SearchSort isActiveSort={isActiveSort} setIsActiveSort={setIsActiveSort} />
        <SearchResult isActiveSort={isActiveSort} />
      </div>
      {isAllowToAdd === false && <AuthRequired />}

    </>
  )
}

export default SearchMovie