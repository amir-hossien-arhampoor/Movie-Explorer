import { NavLink } from "react-router";
import { Clapperboard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGeneralSettings } from "@/features/admin/setting/AdminSettingSlice";
import { movieIcons } from "@/utils/styles";


function Title({ size }) {
  const { generalSettings } = useSelector(state => state.siteSettings)
  const dispatch = useDispatch()

  const Logo = movieIcons.find((item) => item.name === generalSettings.logo)?.icon || Clapperboard


  useEffect(() => {
    dispatch(getGeneralSettings()) 
  }, [])

  return (
    <NavLink
      className="dark:text-[#8B5CF6] text-[#8B5CF6] flex items-center gap-2"
      to="/"
    >
      <div className="flex items-center gap-3">
        <div
          className={`
              flex h-11 w-11
              items-center justify-center
              rounded-xl
              bg-[#857adc]/15
            `}
        >
          <Logo
            size={size}
            className="text-[#9b8cff]"
          />
        </div>

        <h1 className={`flex gap-1 text-[${size}px] font-bold`}>
          <p className="dark:text-white">{generalSettings.sitename?.split(" ")[0]}</p>
          <span className="text-[#8B5CF6]">
            {generalSettings.sitename?.split(" ")[1]}
          </span>
        </h1>
      </div>
    </NavLink>
  );
}

export default Title;


