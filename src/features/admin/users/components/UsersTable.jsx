import Pagination from "@/components/Pagination"
import UserItem from "@/features/admin/users/components/UserItem"
import UserRowSkeletonList from "@/features/admin/users/components/UserRowSkeleton"



function UsersTable({
  users,
  currentPage,
  totalPages,
  setCurrentPage,
  totolUsers,
  startIndex,
  endIndex,
  isLoading
}) {

  return (
    <>
      <div className="mt-20 rounded-[10px] border border-slate-200 bg-white dark:border-[#102744] dark:bg-[#081625]">
        <div className="w-full">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 dark:border-[#132b47] dark:bg-[#0b1b30]">
            <p className="mr-3 px-4 py-4 text-[11px] font-medium text-slate-500 dark:text-[#9aaac0]">
              User
            </p>

            <p className="mr-9 w-40 py-4 text-[11px] font-medium text-slate-500 dark:text-[#9aaac0]">
              Name / Email
            </p>

            <p className="w-10 py-4 text-[11px] font-medium text-slate-500 dark:text-[#9aaac0]">
              Role
            </p>

            <p className="w-20 px-5 py-4 text-[11px] font-medium text-slate-500 dark:text-[#9aaac0]">
              Plan
            </p>

            <p className="w-20 px-5 py-4 text-[11px] font-medium text-slate-500 dark:text-[#9aaac0]">
              Status
            </p>

            <p className="w-20 px-5 py-4 text-[11px] font-medium text-slate-500 dark:text-[#9aaac0]">
              Joined
            </p>

            <p className="px-5 py-4 text-[11px] font-medium text-slate-500 dark:text-[#9aaac0]">
              Actions
            </p>
          </div>

          {/* Table Rows */}
          <div>
            {isLoading && <UserRowSkeletonList count={8} />}

            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        </div>

        {/* Pagination */}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        users={totolUsers}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </>
  )
}

export default UsersTable



