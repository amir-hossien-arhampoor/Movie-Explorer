import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

function SectionTitle({ children ,to}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-[16px] font-semibold text-black dark:text-white">{children}</h2>
        <span className="h-0.75 w-5 rounded-full bg-[#857adc]" />
      </div>

        <NavLink to={to} className="flex items-center gap-1 text-[11px] text-[#6030e8] cursor-pointer">
          View All
          <ChevronRight size={13} />
        </NavLink>
    </div>
  );
}

export default SectionTitle