function SettingsLayout({ active, children }) {
  <div className="flex min-h-screen bg-[#041322] font-sans">
    <Sidebar active={active} />

    <div className="min-w-0 flex-1">
      <Topbar />

      <main className="mx-auto max-w-225 px-4 py-4">
        {children}
      </main>
    </div>
  </div>
};

export default SettingsLayout