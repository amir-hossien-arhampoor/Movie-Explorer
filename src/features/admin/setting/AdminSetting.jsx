import { useEffect, useState } from "react";
import AdminSettingSideBar from "@/features/admin/setting/AdminSettingSideBar";
import GeneralSetting from "@/features/admin/setting/GeneralSetting";
import MovieAndContent from "@/features/admin/setting/Movie&Content";
import UserAndAccount from "@/features/admin/setting/User&Account";
import { Cog } from "lucide-react";


function AdminSetting() {
  const [activeSection, setActiveSection] = useState("General Setting");


  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");


      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (isAtBottom) {
        setActiveSection(sections[sections.length - 1].dataset.section);
        return;
      }

      let currentSection = sections[0]?.dataset.section;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 150) {
          currentSection = section.dataset.section;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  return (
    <div className="mx-3 my-5 relative">
      <div className="flex items-center gap-3">
        <Cog size={40} color="#6d3eec" />
        <div className="">
          <h1 className="font-bold text-[20px]">Admin Settings</h1>
          <p className="text-[13px] text-[#6f8196]">Configure your site settings & preference.</p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <AdminSettingSideBar activeSection={activeSection} />

        <div className="flex-1 flex flex-col gap-8">
          <section data-section="General Setting">
            <GeneralSetting />
          </section>

          <section data-section="Movie & Content">
            <MovieAndContent />
          </section>

          <section data-section="User & Account">
            <UserAndAccount />
          </section>

        </div>
      </div>
    </div>
  )
}

export default AdminSetting