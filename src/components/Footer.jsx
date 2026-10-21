import { getGeneralSettings } from "@/features/admin/setting/AdminSettingSlice";
import { movieIcons } from "@/utils/styles";
import { Clapperboard, Mail, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { FaTwitter, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";

function Footer() {
  const { generalSettings } = useSelector(
    (state) => state.siteSettings
  );
  const dispatch = useDispatch();

  const Logo = movieIcons.find((item) => item.name === generalSettings.logo)?.icon || Clapperboard;

  useEffect(() => {
    dispatch(getGeneralSettings());
  }, [dispatch]);

  const quickLinks = [
    {
      name: "Home",
      to: "/"
    },
    {
      name: "Explore",
      to: "explore"
    }, { 
      name:"Favorites",
      to: "favorites"
    },
     { name:"Watchlist",
      to:"watchlist"
     }];

  const socialClass = "flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:text-white dark:bg-[#0b1727] dark:text-[#8c9bb2]";

  const linkClass = "text-sm text-slate-600 transition-colors duration-200 hover:text-violet-600 dark:text-[#a8b4c8] dark:hover:text-[#857adc]";

  const headingClass = "mb-6 text-[17px] font-semibold text-slate-900 dark:text-white";

  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-600 transition-colors duration-300 dark:border-[#0e1c2e] dark:bg-[#030b16] dark:text-[#a8b4c8]">
      <div className="mx-auto max-w-350 px-6 py-16 lg:px-10">
        {/* Main Footer */}
        <div className="flex flex-wrap justify-between gap-10 max-md:justify-center">
          {/* Brand */}
          <div className="max-w-full">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-violet-100 dark:bg-[#857adc]/15">
                <Logo
                  size={27}
                  className="text-violet-600 dark:text-[#857adc]"
                />
              </div>

              <h2 className="text-2xl font-bold tracking-tight">
                <span className="text-slate-900 dark:text-white">
                  {generalSettings.sitename?.split(" ")[0] || "Movie"}
                </span>{" "}
                <span className="text-violet-600 dark:text-[#857adc]">
                  {generalSettings.sitename?.split(" ").slice(1).join(" ") ||
                    "Explorer"}
                </span>
              </h2>
            </div>

            <p className="max-w-82.5 text-[15px] leading-7 text-slate-500 dark:text-[#8290a8]">
              {generalSettings?.sitedescription}
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Discord"
                className={`${socialClass} hover:bg-[#5865f2]`}
              >
                <MessageCircle size={19} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className={`${socialClass} hover:bg-[#02b7ee]`}
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className={`${socialClass} hover:bg-[#24292f] dark:hover:bg-[#e2e2e2] dark:hover:text-black`}
              >
                <FaGithub />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className={`${socialClass} hover:bg-[#e728c7]`}
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className={`${socialClass} hover:bg-[#e61212]`}
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-12 sm:gap-20">
            <div>
              <h3 className={headingClass}>Quick Links</h3>

              <div className="flex flex-col space-y-4">
                {quickLinks.map((link) => (
                  <NavLink to={link.to} key={link}>
                    <p className={linkClass}>
                      {link.name}
                    </p>
                  </NavLink>
                ))}
              </div>
            </div>


          </div>

          {/* Newsletter */}
          <div className="flex flex-col max-md:items-center">
            <h3 className="mb-5 text-[17px] font-semibold text-slate-900 dark:text-white">
              Stay Updated
            </h3>

            <p className="max-w-92.5 text-sm text-slate-500 dark:text-[#8290a8] max-md:text-center">
              Get the latest movie news, updates and recommendations straight
              to your inbox.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 flex h-13.5 w-full max-w-115 rounded-xl border border-slate-300 bg-slate-50 transition-all duration-300 focus-within:border-violet-500 focus-within:shadow-[0_0_20px_rgba(133,122,220,0.12)] dark:border-[#1b304a] dark:bg-[#071321] dark:focus-within:border-[#857adc]"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                <Mail
                  size={20}
                  className="shrink-0 text-slate-400 dark:text-[#718098]"
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-[#66758d]"
                />
              </div>

              <button
                type="submit"
                className="rounded-e-xl bg-violet-600 px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-700 hover:shadow-[0_0_25px_rgba(133,122,220,0.25)] dark:bg-[#857adc] dark:hover:bg-[#7469d0] dark:hover:shadow-[0_0_25px_rgba(133,122,220,0.35)] sm:px-6"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-slate-200 dark:bg-[#17273b]" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 text-[13px] md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500 dark:text-[#8290a8]">
            © 2026 {generalSettings.sitename || "Movie Explorer"}. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#"
              className="transition-colors duration-200 hover:text-violet-600 dark:hover:text-white"
            >
              Privacy Policy
            </a>

            <span className="hidden h-4 w-px bg-slate-300 dark:bg-[#304157] sm:block" />

            <a
              href="#"
              className="transition-colors duration-200 hover:text-violet-600 dark:hover:text-white"
            >
              Terms of Service
            </a>

            <span className="hidden h-4 w-px bg-slate-300 dark:bg-[#304157] sm:block" />

            <a
              href="#"
              className="transition-colors duration-200 hover:text-violet-600 dark:hover:text-white"
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
