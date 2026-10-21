function SelectedCategory({ selectedCategory, form }) {
  return (
 <section className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-200 dark:border-[#293548] dark:bg-[#111827]">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600 dark:border-[#a78bfa]/20 dark:bg-[#a78bfa]/10 dark:text-[#c4b5fd]">
      <selectedCategory.icon size={19} />
    </div>

    <div className="min-w-0">
      <p className="text-xs font-medium text-slate-500 dark:text-[#9aaac0]">
        Selected category
      </p>

      <h3 className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-[#f1f5f9]">
        {selectedCategory.label}
      </h3>
    </div>
  </div>

  <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-[#a6b4c8]">
    {form.category === "bug" &&
      "Include the steps to reproduce the issue and what you expected to happen. Screenshots can help us investigate faster."}

    {form.category === "improvement" &&
      "Explain how the current experience could be improved and why the change would be useful."}

    {form.category === "feature" &&
      "Describe the user problem first, then explain the feature you would like to see."}

    {form.category === "account" &&
      "Never share your password. Include the account-related issue and any non-sensitive details that help us investigate."}
  </p>
</section>
  )
}

export default SelectedCategory