function SearchSort({isActiveSort, setIsActiveSort}) {
  const sortOption = [ "Newest", "Oldest", "A-Z"]
  
  return (
    <div className="flex items-center gap-2 mt-6">
      <p className="text-[13px]">Sort by:</p>
      <div className="flex items-center gap-2">
        {sortOption.map((item, index) => {
          return <button
            key={index}
            className={`border dark:border-[#244061] dark:bg-[#041939] px-6 py-1.5 rounded-[9px] text-[12px] cursor-pointer transition-all duration-150 ease-in-out hover:dark:bg-[#082d64] ${isActiveSort === item ? "bg-[#5438cc]! border-[#5438cc]! text-white " : ""}`}
            onClick={() => setIsActiveSort(item)}
          >
            {item}
          </button>
        })}

      </div>
    </div>
  )
}

export default SearchSort