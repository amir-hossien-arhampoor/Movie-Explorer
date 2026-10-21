import { Users } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Amirhossien Arhampoor",
    role: "Developer",
    image: ["/temporaryUser.jpg"],
    github: "",
    linkedin: "",
  },
  {
    id: 2,
    name: "ChatGPT & Amirhossien",
    role: "UI/UX Designer",
    image: ["/chatgpt.png", "/temporaryUser.jpg"],
    github: "",
    linkedin: "",
  },
];

export default function Team() {
  return (
    <section id="our-team" className="mt-20 scroll-mt-24">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-[#9588ff]">
            The People Behind It
          </span>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Our Team
          </h2>

          <div className="mt-3 h-1 w-10 rounded-full bg-violet-600 dark:bg-[#857adc]" />
        </div>

        <div className="hidden items-center gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex">
          <Users size={17} />
          <span>Built by movie lovers</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {teamMembers.map((member) => (
          <article
            key={member.id}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:border-violet-300 hover:bg-violet-50 dark:border-[#112a46] dark:bg-[#061426] dark:hover:border-[#857adc]/50 dark:hover:bg-[#081a30]"
          >
            <div className="flex shrink-0 -space-x-12">
              {member.image.map((src, index) => (
                <img
                  key={`${member.id}-${index}`}
                  src={src}
                  alt={member.name}
                  className="size-16 rounded-full border-[3px] border-white object-cover dark:border-[#061426]"
                  loading="lazy"
                />
              ))}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {member.name}
              </h3>

              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                {member.role}
              </p>

              <div className="mt-3 flex items-center gap-3">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on GitHub`}
                    className="text-slate-500 transition hover:text-violet-600 dark:text-slate-400 dark:hover:text-white"
                  >
                    {/* Add Github icon here */}
                  </a>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-slate-500 transition hover:text-violet-600 dark:text-slate-400 dark:hover:text-[#9588ff]"
                  >
                    {/* Add Linkedin icon here */}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
