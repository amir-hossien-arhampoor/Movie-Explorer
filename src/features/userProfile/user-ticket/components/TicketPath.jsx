function TicketPath() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-200 dark:border-[#293548] dark:bg-[#111827]">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-[#f1f5f9]">
        What happens next?
      </h3>

      <ol className="mt-5 space-y-5">
        {[
          ["01", "Ticket received", "Your request is recorded for review."],
          ["02", "Under review", "The support team checks the details."],
          [
            "03",
            "Response",
            "Check My Tickets for replies and status updates.",
          ],
        ].map(([number, title, description]) => (
          <li key={number} className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-xs font-semibold text-violet-700 dark:border-[#a78bfa]/25 dark:bg-[#a78bfa]/10 dark:text-[#c4b5fd]">
              {number}
            </span>

            <div className="min-w-0 pt-0.5">
              <p className="text-sm font-medium text-slate-800 dark:text-[#e2e8f0]">
                {title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-[#9aaac0]">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default TicketPath