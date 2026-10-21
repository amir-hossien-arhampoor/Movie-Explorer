function UserRowSkeleton() {
  return (
    <div className="relative flex animate-pulse items-center justify-between border-b border-[#10243d]">

      {/* Profile image */}
      <div className="px-4 py-3.5">
        <div className="h-9 w-9 rounded-full bg-[#26364d]" />
      </div>

      {/* Name and Email */}
      <div className="mr-8 w-40 space-y-2 py-3.5">
        <div className="h-3 w-24 rounded-full bg-[#26364d]" />
        <div className="h-2.5 w-32 rounded-full bg-[#1c2b40]" />
      </div>

      {/* Role */}
      <div className="w-10 py-3.5">
        <div className="h-5 w-14 rounded-full bg-[#3027a1]/40" />
      </div>

      {/* Plan */}
      <div className="w-20 px-5 py-3.5">
        <div className="h-5 w-14 rounded-full bg-[#26364d]" />
      </div>

      {/* Status */}
      <div className="w-20 px-5 py-3.5">
        <div className="h-5 w-14 rounded-full bg-[#075e50]/40" />
      </div>

      {/* Joined */}
      <div className="w-20 px-5 py-3.5">
        <div className="h-3 w-16 rounded-full bg-[#26364d]" />
      </div>

      {/* Actions */}
      <div className="px-5 py-3.5">
        <div className="h-8 w-8 rounded-[6px] bg-[#26364d]" />
      </div>
    </div>
  );
}

export default function UserRowSkeletonList({ count = 8 }) {
  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <UserRowSkeleton key={index} />
      ))}
    </div>
  );
}