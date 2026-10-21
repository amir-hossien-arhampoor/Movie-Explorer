import { getMoviesData } from "@/features/admin/movies/ManageMoviesSlice"
import SelectedSectionMovies from "@/features/admin/movies/SelectedSectionMovies"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function TopRatedMovies() {
  const { topRatedMovies ,isLoading} = useSelector(state => state.manageMovies)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getMovies() {
      await dispatch(getMoviesData())
    }
    getMovies()
  }, [dispatch])
  return (
    <SelectedSectionMovies
      title="Top rated movies"
      description="Edit and manage movies for this section."
      sectionMovies={topRatedMovies}
      sectionName="topRated"
      isLoading={isLoading}
    />
  )
}

export default TopRatedMovies
