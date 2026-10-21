import { Clock3, Wrench, Clapperboard } from "lucide-react";
import "../css/MainTenancePage.css";
import { useDispatch, useSelector } from "react-redux";
import { movieIcons } from "@/utils/styles";
import { useEffect } from "react";
import { getGeneralSettings } from "@/features/admin/setting/AdminSettingSlice";

function MaintenancePage() {
  const { generalSettings } = useSelector(state => state.siteSettings)
  const dispatch = useDispatch()

  const Logo = movieIcons.find((item) => item.name === generalSettings.logo)?.icon || Clapperboard


  useEffect(() => {
    async function getData() {
      await dispatch(getGeneralSettings())
    }
    getData()

    if (!generalSettings) return;

    if (generalSettings.sitename) {
      document.title = generalSettings.sitename;
    }
  }, [dispatch, generalSettings])

  return (
    <main className="maintenance-page">
      <header className="maintenance-header">
        <a href="/" className="maintenance-logo">
          <Logo size={36} strokeWidth={2.2} />
          <span>
            {generalSettings.sitename?.split(" ")[0]}
            <span className="logo-accent">{generalSettings.sitename?.split(" ")[1]}</span>
          </span>
        </a>
      </header>

      <section className="maintenance-content">
        <div className="maintenance-info">
          <div className="maintenance-label">
            <Wrench size={22} />
            <span>Under Maintenance</span>
          </div>

          <h1>
            We’ll be back
            <span> soon!</span>
          </h1>

          <p className="maintenance-description">
            We’re currently performing some maintenance to
            make your movie experience even better.
            Thanks for your patience!
          </p>

          <div className="maintenance-status">
            <div className="status-icon">
              <Clock3 size={36} />
            </div>

            <div className="status-text">
              <span>Estimated downtime</span>
              <strong>We’ll be back shortly</strong>
            </div>
          </div>
        </div>

        <div className="maintenance-illustration">
          <div className="illustration-glow" />

          <div className="illustration-circle">
            <div className="film-reel">
              <div className="reel-hole hole-one" />
              <div className="reel-hole hole-two" />
              <div className="reel-hole hole-three" />
              <div className="reel-hole hole-four" />
              <div className="reel-hole hole-five" />
            </div>

            <div className="clapperboard">
              <div className="clapper-top">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="clapper-body">
                <Wrench size={76} strokeWidth={1.8} />
              </div>
            </div>

            <div className="construction-cone">
              <div className="cone-top" />
              <div className="cone-stripe" />
              <div className="cone-bottom" />
            </div>
          </div>

          <span className="sparkle sparkle-one">✦</span>
          <span className="sparkle sparkle-two">✦</span>
          <span className="sparkle sparkle-three">✦</span>
        </div>
      </section>

      <footer className="maintenance-footer">
        <span>© {new Date().getFullYear()} {generalSettings.sitename}</span>
        <span>Making your next movie night better.</span>
      </footer>
    </main>

  );
}

export default MaintenancePage;