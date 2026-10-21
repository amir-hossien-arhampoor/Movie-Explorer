import toast from "react-hot-toast"
import { NavLink } from "react-router"


function NavBarBtn({ btnText, style, location, icon }) {
  const Icon = icon

  function preventNavigation(e) {
    if (
      location === "TVshow" ||
      location === "genre" ||
      location === "people"
    ) {
      e.preventDefault()
      toast.success("This section will be available soon...")
      return
    }
  }

  return (
    <>
      <NavLink
        className={style}
        to={location}
        onClick={preventNavigation}>
        <Icon size={17} />
        <p>{btnText}</p>
      </NavLink>
    </>
  )
}

export default NavBarBtn