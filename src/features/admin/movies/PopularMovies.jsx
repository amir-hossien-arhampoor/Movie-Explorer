import { getMoviesData } from "@/features/admin/movies/ManageMoviesSlice"
import SelectedSectionMovies from "@/features/admin/movies/SelectedSectionMovies"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


function PopularMovies() {
  const { popularMovies ,isLoading} = useSelector(state => state.manageMovies)
    const dispatch = useDispatch()
    useEffect(() => {
    async function getMovies() {
      await dispatch(getMoviesData())
    }
    getMovies()
  }, [dispatch])

  return (
    <SelectedSectionMovies 
      title="Popular movies"
      description="Edit and manage movies for this section."
      sectionMovies={popularMovies}
      sectionName="popular"
      isLoading={isLoading}
    />
  )
}

export default PopularMovies