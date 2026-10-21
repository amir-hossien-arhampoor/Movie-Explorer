function Toggle({ enabled = true }) {
  return <>
    <button
        type="button"

        className={`
          relative w-9 h-4 shrink-0 rounded-full
          transition-all duration-200
          ${enabled ? "bg-[#7040e8]" : "bg-[#17283b]"}
        `}
      >
        <span
          className={`
            absolute top-0.5 w-3 h-3 rounded-full bg-white
            transition-all duration-200
            ${enabled ? "left-5.5" : "left-0.5"}
          `}
        />
      </button>
  </>


};

export default Toggle