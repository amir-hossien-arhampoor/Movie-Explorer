
import { getUsers } from "@/utils/api";
import { formatNumber } from "@/utils/date";
import { Film, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function OurImpact() {
  const [users, setUsers] = useState(0);

  useEffect(() => {
    async function getUsersLength() {
      try {
        const data = await getUsers();
        setUsers(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }

    getUsersLength();
  }, []);

  const stats = [
    { value: "10K+", label: "Movies & TV Shows", icon: Film },
    { value: formatNumber(users), label: "Registered Users", icon: Users },
  ];

  return (
    <section className="relative isolate mt-20 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-[#112a46] dark:bg-[#061426]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-20 dark:opacity-35"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=85')",
        }}
      />

      <div className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/95 to-white/70 dark:from-[#020b16] dark:via-[#020b16]/95 dark:to-[#020b16]/30" />

      <div className="max-w-3xl px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-[#9588ff]">
          Our Impact
        </span>

        <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl">
          Built by Movie Lovers,
          <br />
          <span className="text-violet-600 dark:text-[#9588ff]">
            For Movie Lovers
          </span>
        </h2>

        <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
          Every great movie tells a story worth discovering. Movie Explorer
          helps you organize your favorites, discover new films, and make
          your next movie night count.
        </p>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-0">
          {stats.map(({ value, label, icon: Icon }, index) => (
            <div
              key={label}
              className={
                index > 0
                  ? "sm:border-l sm:border-slate-300 sm:pl-5 dark:sm:border-[#263c60]"
                  : ""
              }
            >
              <Icon
                className="mb-2 text-violet-600 dark:text-[#9588ff]"
                size={19}
              />

              <p className="text-3xl font-bold text-violet-600 dark:text-[#9588ff]">
                {value}
              </p>

              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
