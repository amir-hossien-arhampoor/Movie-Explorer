import { ArrowLeft, Send, Bug, Lightbulb, Sparkles, UserRound, CircleHelp, ChevronDown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SelectedCategory from "@/features/userProfile/user-ticket/components/SelectedCategory";
import TicketPath from "@/features/userProfile/user-ticket/components/TicketPath";
import FastResponseTip from "@/features/userProfile/user-ticket/components/FastResponseTip";
import {
  getCategory,
  getSubject,
  getDescription,
  getPriority,
  getAffectedPage,
  setStepsToReproduce,
  setExpectedBehavior,
  setActualBehavior,
  setProposedImprovement,
  setProblemToSolve,
  setAccountIssue,
  clearErrors,
  setErrors,
  clearInputs,
  addNewTicket
} from "@/features/userProfile/user-ticket/userTicketSlice"
import { getZodErrors, bugTicketSchema, improvementTicketSchema, featureTicketSchema, accountTicketSchema, } from "@/utils/validators";
import toast from "react-hot-toast";
import { addNewNotification } from "@/features/userProfile/user-notification/NotificationSlice";
import { shortenName } from "@/utils/date";

const categories = [
  {
    value: "bug",
    label: "Report a Bug",
    description: "Something isn't working correctly",
    icon: Bug,
  },
  {
    value: "improvement",
    label: "Suggest an Improvement",
    description: "Recommend an existing feature improvement",
    icon: Lightbulb,
  },
  {
    value: "feature",
    label: "Feature Request",
    description: "Suggest something new for Movie Explorer",
    icon: Sparkles,
  },
  {
    value: "account",
    label: "Account Request",
    description: "Get help with your account or access",
    icon: UserRound,
  },
];

const ticketSchemas = {
  bug: bugTicketSchema,
  improvement: improvementTicketSchema,
  feature: featureTicketSchema,
  account: accountTicketSchema,
};

export default function UserCreateTicket() {
  const { currentUser } = useSelector(state => state.auth)
  const { form, errors, isLoading } = useSelector(state => state.userTicket)
  const {
    subject,
    description,
    stepsToReproduce,
    expectedBehavior,
    actualBehavior,
    affectedPage,
    proposedImprovement,
    problemToSolve
  } = form

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selectedCategory = categories.find((category) => category.value === form.category) ?? categories[0];

  function validate() {
    const schema = ticketSchemas[form.category];

    if (!schema) return false;

    let formProperties = {}

    switch (form.category) {
      case "bug":
        formProperties = {
          subject,
          description,
          stepsToReproduce,
          expectedBehavior,
          actualBehavior,
          affectedPage,
        }
        break
      case "improvement":
        formProperties = {
          subject,
          description,
          proposedImprovement
        }
        break
      case "feature":
        formProperties = {
          subject,
          description,
          problemToSolve
        }
        break
      case "account":
        formProperties = {
          subject,
          description,
        }
        break
    }

    const data = getZodErrors(schema, formProperties)
    dispatch(setErrors(data))

    return Object.values(data).every(errors => errors.length === 0);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return

    const ticket = {
      ...form,
      subject: form.subject.trim(),
      description: form.description.trim(),
      status: "not reviewed",
      createdAt: new Date().toISOString(),
      userId: currentUser.userId,
      user: {
        name: currentUser.fullname,
        email: currentUser.email,
        initials: shortenName(currentUser.fullname),
      },
      messages: [],
    };

    const addTicketRes = await dispatch(addNewTicket({ newTicket: ticket }))

    if (addNewTicket.fulfilled.match(addTicketRes)) {
      const newNotification = {
        type: "ticket",
        title: "New Ticket",
        description: "You've submitted new ticket. It will be reviewed by admin soon.",
        userId: currentUser.userId,
      }
      await dispatch(addNewNotification({ newNotification }))

      toast.success("Ticket added successfully,it will be review by admin soon.")
      navigate("/profile/user-tickets")
    } else {
      toast.error(addTicketRes.payload || "Failed to create ticket.")
    }
    dispatch(clearInputs())
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-8 text-slate-900 transition-colors duration-200 dark:bg-[#0b0f17] dark:text-[#f1f5f9] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-4 inline-flex cursor-pointer items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:text-[#9aaac0] dark:hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to profile
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-[#c4b5fd]">
                <CircleHelp size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Create Support Ticket
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-[#9aaac0]">
                  Tell us what happened. Our support team will review your request.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Main form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 transition-colors duration-200 dark:border-[#293548] dark:bg-[#111827] dark:shadow-black/20 sm:p-7"
          >
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-[#293548]">
              <div>
                <h2 className="font-semibold">Ticket details</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-[#9aaac0]">
                  Fields marked * are required
                </p>
              </div>
            </div>

            {/* Category */}
            <fieldset>
              <legend className="text-sm font-medium text-slate-800 dark:text-[#e2e8f0]">
                1. Select Category *
              </legend>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {categories.map(({ value, label, description, icon: Icon }) => {
                  const active = form.category === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        dispatch(getCategory(value));
                        dispatch(clearErrors());
                      }}
                      aria-pressed={active}
                      className={`flex min-h-23 cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${active
                          ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500/20 dark:border-[#a78bfa] dark:bg-[#a78bfa]/10 dark:ring-[#a78bfa]/20"
                          : "border-slate-200 bg-white hover:border-violet-300 hover:bg-slate-50 dark:border-[#293548] dark:bg-[#111827] dark:hover:border-[#62558a] dark:hover:bg-[#182235]"
                        }`}
                    >
                      <span
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active
                            ? "bg-violet-100 text-violet-700 dark:bg-[#a78bfa]/20 dark:text-[#c4b5fd]"
                            : "bg-slate-100 text-slate-500 dark:bg-[#1c293b] dark:text-[#9aaac0]"
                          }`}
                      >
                        <Icon size={18} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-slate-900 dark:text-[#f1f5f9]">
                          {label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-[#9aaac0]">
                          {description}
                        </span>
                      </span>

                      <span
                        className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${active
                            ? "border-violet-600 bg-violet-600 dark:border-[#a78bfa] dark:bg-[#a78bfa]"
                            : "border-slate-300 dark:border-[#526078]"
                          }`}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-7 flex flex-col border-t border-slate-200 pt-6 dark:border-[#293548]">
              {/* Shared field styles */}
              {/* Subject */}
              <div className="mb-5">
                <label
                  className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                  htmlFor="ticket-subject"
                >
                  2. Subject *
                </label>

                <input
                  id="ticket-subject"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#f1f5f9] dark:placeholder:text-[#718198] dark:focus:border-[#a78bfa] dark:focus:ring-[#a78bfa]/20"
                  value={form.subject}
                  onChange={(e) => dispatch(getSubject(e.target.value))}
                  placeholder="Give your ticket a clear title"
                  maxLength={120}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />

                <div className="mt-1 flex justify-between gap-3">
                  {errors.subject ? (
                    <p id="subject-error" className="text-xs text-red-600 dark:text-red-400">
                      {errors.subject}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-slate-500 dark:text-[#8190a5]">
                    {form.subject.length}/120
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <label
                  className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                  htmlFor="ticket-description"
                >
                  3. Description *
                </label>

                <textarea
                  id="ticket-description"
                  className="mt-2 min-h-32 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#f1f5f9] dark:placeholder:text-[#718198] dark:focus:border-[#a78bfa] dark:focus:ring-[#a78bfa]/20"
                  value={form.description}
                  onChange={(e) => dispatch(getDescription(e.target.value))}
                  placeholder="Include the relevant details so we can understand your request..."
                  rows={5}
                  maxLength={5000}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? "description-error" : undefined
                  }
                />

                <div className="mt-1 flex justify-between gap-3">
                  {errors.description ? (
                    <p id="description-error" className="text-xs text-red-600 dark:text-red-400">
                      {errors.description}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-slate-500 dark:text-[#8190a5]">
                    {form.description.length}/5000
                  </span>
                </div>
              </div>

              {/* Bug category */}
              {form.category === "bug" && (
                <div className="mb-5 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                      htmlFor="ticket-steps"
                    >
                      4. Steps to Reproduce *
                    </label>

                    <textarea
                      id="ticket-steps"
                      className="mt-2 min-h-24 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#f1f5f9] dark:placeholder:text-[#718198] dark:focus:border-[#a78bfa] dark:focus:ring-[#a78bfa]/20"
                      value={form.stepsToReproduce}
                      onChange={(e) =>
                        dispatch(setStepsToReproduce(e.target.value))
                      }
                      placeholder={"1. Open the movie page\n2. Select an action\n3. Describe what happens"}
                      rows={3}
                      aria-invalid={Boolean(errors.stepsToReproduce)}
                    />

                    {errors.stepsToReproduce && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {errors.stepsToReproduce}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                      htmlFor="ticket-expected"
                    >
                      Expected behavior
                    </label>

                    <textarea
                      id="ticket-expected"
                      className="mt-2 min-h-24 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#f1f5f9] dark:placeholder:text-[#718198] dark:focus:border-[#a78bfa] dark:focus:ring-[#a78bfa]/20"
                      value={form.expectedBehavior}
                      onChange={(e) =>
                        dispatch(setExpectedBehavior(e.target.value))
                      }
                      placeholder="What should have happened?"
                      rows={3}
                    />

                    {errors.expectedBehavior && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {errors.expectedBehavior}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                      htmlFor="ticket-actual"
                    >
                      Actual behavior
                    </label>

                    <textarea
                      id="ticket-actual"
                      className="mt-2 min-h-24 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#f1f5f9] dark:placeholder:text-[#718198] dark:focus:border-[#a78bfa] dark:focus:ring-[#a78bfa]/20"
                      value={form.actualBehavior}
                      onChange={(e) =>
                        dispatch(setActualBehavior(e.target.value))
                      }
                      placeholder="What happened instead?"
                      rows={3}
                    />

                    {errors.actualBehavior && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {errors.actualBehavior}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                      htmlFor="ticket-page"
                    >
                      Affected page
                    </label>

                    <div className="relative">
                      <select
                        id="ticket-page"
                        className="mt-2 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#f1f5f9] dark:focus:border-[#a78bfa] dark:focus:ring-[#a78bfa]/20"
                        value={form.affectedPage}
                        onChange={(e) =>
                          dispatch(getAffectedPage(e.target.value))
                        }
                      >
                        <option value="">Select the affected page</option>
                        <option value="home">Home</option>
                        <option value="search">Search movies</option>
                        <option value="movie-details">Movie details</option>
                        <option value="watchlist">Watchlist</option>
                        <option value="favorites">Favorites</option>
                        <option value="profile">Profile</option>
                        <option value="settings">Settings</option>
                        <option value="other">Other</option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#9aaac0]"
                      />
                    </div>

                    {errors.affectedPage && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {errors.affectedPage}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Improvement category */}
              {form.category === "improvement" && (
                <div className="mb-5">
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                    htmlFor="ticket-improvement"
                  >
                    4. Suggested improvement *
                  </label>

                  <textarea
                    id="ticket-improvement"
                    className="mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#f1f5f9] dark:placeholder:text-[#718198] dark:focus:border-[#a78bfa] dark:focus:ring-[#a78bfa]/20"
                    value={form.proposedImprovement}
                    onChange={(e) =>
                      dispatch(setProposedImprovement(e.target.value))
                    }
                    placeholder="How could this existing feature work better?"
                    rows={4}
                    aria-invalid={Boolean(errors.proposedImprovement)}
                  />

                  {errors.proposedImprovement && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.proposedImprovement}
                    </p>
                  )}
                </div>
              )}

              {/* Feature category */}
              {form.category === "feature" && (
                <div className="mb-5">
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                    htmlFor="ticket-problem"
                  >
                    4. What problem would this solve? *
                  </label>

                  <textarea
                    id="ticket-problem"
                    className="mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#f1f5f9] dark:placeholder:text-[#718198] dark:focus:border-[#a78bfa] dark:focus:ring-[#a78bfa]/20"
                    value={form.problemToSolve}
                    onChange={(e) =>
                      dispatch(setProblemToSolve(e.target.value))
                    }
                    placeholder="Describe the need and how your feature idea would help."
                    rows={4}
                    aria-invalid={Boolean(errors.problemToSolve)}
                  />

                  {errors.problemToSolve && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.problemToSolve}
                    </p>
                  )}
                </div>
              )}

              {/* Account category */}
              {form.category === "account" && (
                <div className="mb-5">
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                    htmlFor="ticket-account-issue"
                  >
                    4. Account issue type
                  </label>

                  <div className="relative">
                    <select
                      id="ticket-account-issue"
                      className="mt-2 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#f1f5f9] dark:focus:border-[#a78bfa] dark:focus:ring-[#a78bfa]/20"
                      value={form.accountIssue}
                      onChange={(e) =>
                        dispatch(setAccountIssue(e.target.value))
                      }
                    >
                      <option value="account_access">
                        Can't access my account
                      </option>
                      <option value="profile">Profile information</option>
                      <option value="subscription">Subscription or billing</option>
                      <option value="privacy">Privacy or account data</option>
                      <option value="other">Other account issue</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#9aaac0]"
                    />
                  </div>
                </div>
              )}

              {/* Priority */}
              <div className="mb-6">
                <label
                  className="text-sm font-medium text-slate-700 dark:text-[#dce5f2]"
                  htmlFor="ticket-priority"
                >
                  5. Priority
                  <span className="ml-2 font-normal text-slate-500 dark:text-[#9aaac0]">
                    (optional)
                  </span>
                </label>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    { value: "low", label: "Low", dot: "bg-sky-500 dark:bg-sky-400" },
                    { value: "medium", label: "Medium", dot: "bg-amber-500 dark:bg-amber-400" },
                    { value: "high", label: "High", dot: "bg-red-500 dark:bg-red-400" },
                  ].map((priority) => {
                    const active = form.priority === priority.value;

                    return (
                      <button
                        type="button"
                        key={priority.value}
                        onClick={() =>
                          dispatch(getPriority(priority.value))
                        }
                        aria-pressed={active}
                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${active
                            ? "border-violet-500 bg-violet-50 text-violet-800 ring-1 ring-violet-500/20 dark:border-[#a78bfa] dark:bg-[#a78bfa]/10 dark:text-[#ddd6fe] dark:ring-[#a78bfa]/20"
                            : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-slate-50 dark:border-[#293548] dark:bg-[#0f1b2d] dark:text-[#dce5f2] dark:hover:border-[#62558a] dark:hover:bg-[#182235]"
                          }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${priority.dot}`}
                        />
                        {priority.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex h-11 self-end items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-5 text-sm font-medium text-white shadow-lg shadow-violet-900/15 transition-all duration-200 hover:from-violet-500 hover:to-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-[#111827]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Ticket
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sidebar */}
          <aside className="space-y-5">
            <SelectedCategory
              selectedCategory={selectedCategory}
              form={form}
            />

            <TicketPath />

            <FastResponseTip />
          </aside>
        </div>
      </div>
    </main>
  );
}
