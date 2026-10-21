import { Loader2 } from "lucide-react"
import { useSelector } from "react-redux"

function SaveButton({ section }) {
  const { isUpdating } = useSelector(state => state.siteSettings)

  return <button className="cursor-pointer flex items-center gap-1 rounded-md bg-[#6843e8] px-9 py-3  font-medium text-white">
    {isUpdating[section] ? <Loader2 size={17} className="animate-spin" /> : ""}
    <span>
      {isUpdating[section] ? "Saving..." : "Save Changes"}
    </span>
  </button>
};

export default SaveButton