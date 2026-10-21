import PageHeading from "@/features/admin/users/components/PageHeading";
import Statistics from "@/features/admin/users/components/Statistics";
import UsersTable from "@/features/admin/users/components/UsersTable";
import Toolbar from "@/features/admin/users/components/Toolbar";
import { useEffect, useState } from "react";
import { getUsers } from "@/utils/api";
import CreateUser from "@/features/admin/users/components/CreateUser";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "@/features/admin/users/UserManagementSlice";



export default function UserManagement() {
  const { users, isLoading } = useSelector(state => state.userManagement)
  const [currentPage, setCurrentPage] = useState(1)
  const [role, setRole] = useState("all")
  const [status, setStatus] = useState("all")
  const [searchUsers, setSearchUsers] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const usersPerPage = 8
  const dispatch = useDispatch()
  const filteredUsers = users
    .filter((user) => user.fullname?.toLowerCase().includes(searchUsers.toLowerCase())
    )
    .filter((user) => role === "all" ? true : user.role === role
    )
    .filter((user) => status === "all" ? true : user.status === status
    );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    endIndex
  )

  useEffect(() => {
    async function getData() {
      const data = await getUsers()
      dispatch(getUsersData(data))
    }
    getData()
  }, [dispatch])

  return (
    <section className="relative w-full bg-white px-6 py-6 text-slate-900 transition-colors dark:bg-[#07111f] dark:text-[#e7edf8]">
      {/* Page Heading */}
      <PageHeading />

      {/* Statistics */}
      <Statistics />

      {/* Toolbar */}
      <Toolbar
        searchUsers={searchUsers}
        setSearchUsers={setSearchUsers}
        setRole={setRole}
        setStatus={setStatus}
        setIsOpen={setIsOpen}
        role={role}
        status={status}
      />

      {/* Users Table */}
      <UsersTable
        searchUsers={searchUsers}
        users={paginatedUsers}
        totolUsers={users}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        isLoading={isLoading}
      />

      {/* Create New User */}
      <CreateUser isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}