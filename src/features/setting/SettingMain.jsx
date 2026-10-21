import { useState, useEffect } from "react"
import SettingAbout from "@/features/setting/SettingAbout"
import SettingAccount from "@/features/setting/SettingAccount"
import SettingData from "@/features/setting/SettingData"
import SettingNotification from "@/features/setting/SettingNotification"
import SettingSideBar from "@/features/setting/SettingSideBar"
import { Cog } from "lucide-react"
import { useSelector } from "react-redux"
import AuthRequired from "@/components/AuthRequired"

function SettingMain() {
  const [activeSection, setActiveSection] = useState("account");
  const { currentUser } = useSelector(state => state.auth)

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
  }, []);

  return (
    <>
<div className="mx-3 my-5 text-slate-900 dark:text-white">
  <div className="flex items-center gap-3">
    <Cog size={40} className="shrink-0 text-violet-600 dark:text-[#6d3eec]" />

    <div>
      <h1 className="text-[20px] font-bold">Settings</h1>
      <p className="text-[11px] text-slate-500 dark:text-[#6f8196]">
        Customize your experience and manage your account.
      </p>
    </div>
  </div>

  <div className="mt-6 flex gap-3">
    <SettingSideBar activeSection={activeSection} />

    <div className="flex flex-1 flex-col gap-8">
      <section data-section="Account">
        <SettingAccount />
      </section>

      <section data-section="Notification">
        <SettingNotification />
      </section>

      <section data-section="Data">
        <SettingData />
      </section>

      <section data-section="About">
        <SettingAbout />
      </section>
    </div>
  </div>
</div>

{!currentUser && <AuthRequired />}
    </>
  )
}

export default SettingMain