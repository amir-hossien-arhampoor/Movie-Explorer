import { getMoviesData } from "@/features/admin/movies/ManageMoviesSlice"
import SelectedSectionMovies from "@/features/admin/movies/SelectedSectionMovies"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function FeaturedMovies() {
  const { featuredMovies ,isLoading} = useSelector(state => state.manageMovies)
  const dispatch = useDispatch()
  
  useEffect(() => {
    async function getMovies() {
      await dispatch(getMoviesData())
    }
    getMovies()
  }, [dispatch])
  return (
    <SelectedSectionMovies
      title="Featured movies"
      description="Edit and manage movies for this section."
      sectionMovies={featuredMovies}
      sectionName="featured"
      isLoading={isLoading}
    />
  )
}

export default FeaturedMovies