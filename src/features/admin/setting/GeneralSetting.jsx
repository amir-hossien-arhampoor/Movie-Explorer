import SaveButton from "@/features/admin/setting/components/SaveButton ";
import SectionCard from "@/features/admin/setting/components/SectionCard ";
import SettingRow from "@/features/admin/setting/components/SettingRow";
import Input from "@/features/admin/setting/components/Input";
import { ShieldCheck, Film, } from "lucide-react";
import { setSiteName, setDescription, setLogo, setFavicon, setIsMaintenance, setAdminEmail, setSiteURL, setFacebookURL, setTwitterURL, setInstagramURL, updateGeneralSettings, getGeneralSettings, } from "@/features/admin/setting/AdminSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LogoPicker from "@/features/admin/setting/components/LogoPicker";
import { movieIcons } from "@/utils/styles";
import toast from "react-hot-toast";


export function GeneralSetting() {
  const [originalSettings, setOriginalSettings] = useState(null);
  const [isLogoOpen, setIsLogoOpen] = useState(false)
  const [isFaviconOpen, setIsFaviconOpen] = useState(false)
  const { generalSettings } = useSelector(state => state.siteSettings)
  const dispatch = useDispatch()

  const SelectedLogo = movieIcons.find((item) => item.name === generalSettings.logo)?.icon || Film
  const SelectedFavicon = movieIcons.find((item) => item.name === generalSettings.favicon)?.icon || Film


  async function handleSubmit(e) {
    e.preventDefault();

    if (!originalSettings) return;

    const hasChanges = JSON.stringify(generalSettings) !== JSON.stringify(originalSettings);

    if (!hasChanges) {
      toast.error("No changes to save.");
      return;
    }

    const updateRes = await dispatch(
      updateGeneralSettings({
        generalSettings,
      })
    );

    if (updateGeneralSettings.fulfilled.match(updateRes)) {
      setOriginalSettings(generalSettings);

      toast.success("General settings updated successfully!");
    }
  }

  useEffect(() => {
    async function getSetting() {
      const result = await dispatch(getGeneralSettings());

      if (getGeneralSettings.fulfilled.match(result)) {
        setOriginalSettings(result.payload);
      }
    }

    getSetting();
  }, [dispatch]);


  return (
    <>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            General Settings
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-[#718096]">
            Manage your site's basic information and global settings.
          </p>
        </div>

        <SectionCard title="Site Information">
          <div className="space-y-3 pt-2">
            <div>
              <label className="mb-1 block text-[13px] text-slate-600 dark:text-[#b5c0d0]">
                Site Name
              </label>
              <Input value={generalSettings?.sitename} onChange={(v) => dispatch(setSiteName(v))} />
            </div>

            <div>
              <label className="mb-1 block text-[13px] text-slate-600 dark:text-[#b5c0d0]">
                Site Description
              </label>
              <textarea value={generalSettings?.sitedescription} onChange={(e) => dispatch(setDescription(e.target.value))} className="h-12 w-full resize-none rounded-md border border-slate-300 bg-white p-2 text-[12px] text-slate-800 outline-none transition-colors focus:border-violet-500 dark:border-[#12365b] dark:bg-[#071a2d] dark:text-[#d8e0eb] dark:focus:border-[#857adc]" />
            </div>

            <div>
              <label className="mb-1 block text-[13px] text-slate-600 dark:text-[#b5c0d0]">
                Logo
              </label>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#653fe5]">
                  <SelectedLogo size={25} className="text-white" />
                </div>
                <button type="button" className="cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-[#274c77] dark:bg-[#0b2037] dark:text-white dark:hover:bg-[#122c48]" onClick={() => setIsLogoOpen((prev) => !prev)}>
                  Change Logo
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[13px] text-slate-600 dark:text-[#b5c0d0]">
                Favicon
              </label>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#653fe5]">
                  <SelectedFavicon size={19} className="text-white" />
                </div>
                <button type="button" className="cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-[#274c77] dark:bg-[#0b2037] dark:text-white dark:hover:bg-[#122c48]" onClick={() => setIsFaviconOpen((prev) => !prev)}>
                  Change Favicon
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Site Behavior">
          <SettingRow 
          icon={ShieldCheck} 
          title="Maintenance Mode" 
          description="Temporarily disable site for all users." 
          enabled={generalSettings?.maintenancemode} 
          onChange={() => dispatch(setIsMaintenance())}
           />
        </SectionCard>

        <SectionCard title="Contact Information">
          <div className="space-y-3 pt-2">
            <div>
              <label className="mb-1 block text-[12px] text-slate-600 dark:text-[#b5c0d0]">
                Support Email
              </label>
              <Input value={generalSettings?.adminEmail} onChange={(v) => dispatch(setAdminEmail(v))} />
            </div>

            <div>
              <label className="mb-1 block text-[12px] text-slate-600 dark:text-[#b5c0d0]">
                Website URL
              </label>
              <Input value={generalSettings?.websiteURL} onChange={(v) => dispatch(setSiteURL(v))} />
            </div>

            <div>
              <label className="mb-2 block text-[12px] text-slate-600 dark:text-[#b5c0d0]">
                Social Links
              </label>
              <div className="space-y-2">
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-slate-400">Facebook</label>
                  <Input value={generalSettings?.facebookURL} onChange={(v) => dispatch(setFacebookURL(v))} />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-slate-400">Twitter</label>
                  <Input value={generalSettings?.twitterURL} onChange={(v) => dispatch(setTwitterURL(v))} />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-slate-400">Instagram</label>
                  <Input value={generalSettings?.instagramURL} onChange={(v) => dispatch(setInstagramURL(v))} />
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="flex justify-end">
          <SaveButton section="general" />
        </div>
      </form>

      <LogoPicker type="Logo" open={isLogoOpen} currentIcon={generalSettings?.logo} onClose={() => setIsLogoOpen(false)} onSelect={(selected) => dispatch(setLogo(selected.name))} />

      <LogoPicker type="Favicon" open={isFaviconOpen} currentIcon={generalSettings?.favicon} onClose={() => setIsFaviconOpen(false)} onSelect={(selected) => dispatch(setFavicon(selected.name))} />

    </>
  )


};
export default GeneralSetting