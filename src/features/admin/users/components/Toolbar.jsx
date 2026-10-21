import { ChevronDown, Plus, Search } from "lucide-react"

function Toolbar({
  searchUsers,
  setSearchUsers,
  setRole,
  role,
  status,
  setStatus ,
  setIsOpen 
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
  <div className="flex flex-1 flex-col gap-3 sm:flex-row">
    {/* Search */}
    <div className="relative w-full sm:max-w-121.25">
      <Search
        size={17}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#687a92]"
      />

      <input
        type="text"
        value={searchUsers}
        onChange={(e) => setSearchUsers(e.target.value)}
        placeholder="Search by name..."
        className="
          h-11.25 w-full rounded-[8px] border border-slate-300
          bg-white pl-10 pr-4 text-[12px] text-slate-800 outline-none
          placeholder:text-slate-400 focus:border-violet-500
          dark:border-[#173252] dark:bg-[#081625]
          dark:text-[#dce5f2] dark:placeholder:text-[#586b83]
          dark:focus:border-[#5542d9]
        "
      />
    </div>

    {/* Role Filter */}
    <div className="relative">
      <select
        onChange={(e) => setRole(e.target.value)}
        value={role}
        className="
          h-full appearance-none rounded-md border border-slate-300
          bg-white px-3 pr-8 text-[12px] text-slate-700 outline-none
          focus:border-violet-500
          dark:border-[#12365b] dark:bg-[#071a2d]
          dark:text-[#d8e0eb] dark:focus:border-[#5542d9]
        "
      >
        <option value="all">All Roles</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#74839a]"
      />
    </div>

    {/* Status Filter */}
    <div className="relative">
      <select
        onChange={(e) => setStatus(e.target.value)}
        value={status}
        className="
          h-full appearance-none rounded-md border border-slate-300
          bg-white px-3 pr-8 text-[12px] text-slate-700 outline-none
          focus:border-violet-500
          dark:border-[#12365b] dark:bg-[#071a2d]
          dark:text-[#d8e0eb] dark:focus:border-[#5542d9]
        "
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <ChevronDown
        size={13}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#74839a]"
      />
    </div>
  </div>

  {/* Add User */}
  <button
    onClick={() => setIsOpen(true)}
    className="
      flex h-11.25 cursor-pointer items-center justify-center gap-2
      rounded-[8px] bg-violet-600 px-5 text-[12px] font-medium
      text-white transition hover:bg-violet-700
      dark:bg-[#6047ed] dark:hover:bg-[#7059f3]
    "
  >
    <Plus size={17} />
    Add New User
  </button>
</div>
  )
}

export default Toolbar