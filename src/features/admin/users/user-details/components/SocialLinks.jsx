function SocialLinks({ user }) {
  return (
    <div className="space-y-4">
      <SocialLink
        label="Facebook"
        value={user?.facebook || "Not provided"}
      />

      <SocialLink
        label="Twitter"
        value={user?.twitter || "Not provided"}
      />

      <SocialLink
        label="Instagram"
        value={user?.instagram || "Not provided"}
      />
    </div>
  );
}

function SocialLink({ label, value }) {
  const isProvided = value && value !== "Not provided";

  return (
    <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-4">
      <span className="text-sm text-slate-500 dark:text-[#8b9cb3]">
        {label}
      </span>

      {isProvided ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noreferrer"
          className="truncate text-sm text-violet-600 underline decoration-violet-300 underline-offset-4 transition hover:text-violet-800 dark:text-[#9d91ff] dark:decoration-[#4f4a88] dark:hover:text-[#c0b9ff]"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm text-slate-400 dark:text-[#8b9cb3]">
          Not provided
        </span>
      )}
    </div>
  );
}

export default SocialLinks;