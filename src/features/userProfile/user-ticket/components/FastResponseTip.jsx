import { Lightbulb } from "lucide-react"

function FastResponseTip() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-linear-to-br from-violet-50 to-slate-50 p-5 transition-colors duration-200 dark:border-[#293548] dark:bg-linear-to-br dark:from-[#17162b] dark:to-[#111827]">
      <div className="flex items-center gap-2 text-violet-700 dark:text-[#c4b5fd]">
        <Lightbulb size={18} />
        <h3 className="text-sm font-semibold">
          Tips for a faster response
        </h3>
      </div>

      <ul className="mt-4 space-y-3 text-xs leading-5 text-slate-600 dark:text-[#a6b4c8]">
        <li className="flex gap-2">
          <span className="shrink-0 text-violet-600 dark:text-[#a99af8]">•</span>
          <span>Use a specific subject instead of “It doesn't work.”</span>
        </li>
        <li className="flex gap-2">
          <span className="shrink-0 text-violet-600 dark:text-[#a99af8]">•</span>
          <span>Include the page and steps that led to the issue.</span>
        </li>
        <li className="flex gap-2">
          <span className="shrink-0 text-violet-600 dark:text-[#a99af8]">•</span>
          <span>Attach a screenshot if it clarifies the problem.</span>
        </li>
      </ul>
    </section>
  )
}

export default FastResponseTip