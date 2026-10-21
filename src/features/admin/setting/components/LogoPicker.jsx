import { useMemo, useState ,useEffect } from "react";
import { movieIcons } from "@/utils/styles";
import {
  Film,
  X,
  Search,
  Check,
} from "lucide-react";



function LogoPicker({ open, onClose, onSelect, currentIcon , type = "Logo"}) {

  const [selectedIcon, setSelectedIcon] = useState(
  movieIcons.find((item) => item.name === currentIcon) || movieIcons[0]
);

  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    return movieIcons.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const SelectedIcon = selectedIcon.icon;

  const handleSelect = () => {
    onSelect(selectedIcon);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-5xl rounded-xl border border-[#12365b] bg-[#071426] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#12365b] px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#171b53]">
              <Film className="h-7 w-7 text-[#968cff]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#d8e0eb]">{type}</h2>

              <p className="mt-1 text-xs text-[#6f8196]">
                Select an icon for your website {type}.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-[#6f8196] transition hover:bg-[#0d2138] hover:text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Search */}
          <div className="relative mb-5">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#546077]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="h-11 w-full rounded-lg border border-[#12365b] bg-[#081a2e] pl-10 pr-4 text-sm text-[#d8e0eb] outline-none placeholder:text-[#546077] focus:border-[#6c3cec]"
            />
          </div>

          {/* Icons */}
          <div className="grid max-h-100 grid-cols-4 gap-3 overflow-y-auto pr-1 sm:grid-cols-5 md:grid-cols-7">
            {filteredIcons.map((item) => {
              const Icon = item.icon;

              const isSelected =
                selectedIcon.name === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedIcon(item)}
                  className={`
                    relative flex h-24 flex-col items-center justify-center
                    gap-2 rounded-lg border transition cursor-pointer
                    ${
                      isSelected
                        ? "border-[#857adc] bg-[#171b53]"
                        : "border-[#12365b] bg-[#081a2e] hover:border-[#31537a] hover:bg-[#0b2037]"
                    }
                  `}
                >
                  {isSelected && (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#857adc]">
                      <Check size={12} className="text-white" />
                    </span>
                  )}

                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className={
                      isSelected
                        ? "text-[#a99fff]"
                        : "text-[#d8e0eb]"
                    }
                  />

                  <span className="max-w-full truncate px-2 text-[10px] text-[#6f8196]">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredIcons.length === 0 && (
            <div className="flex h-32 items-center justify-center text-sm text-[#546077]">
              No icons found.
            </div>
          )}

          {/* Preview */}
          <div className="mt-5 rounded-lg border border-[#12365b] bg-[#081a2e] p-5">
            <p className="mb-4 text-xs font-medium text-[#6f8196]">
              Preview
            </p>

            <div className="flex flex-col items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-[#263d60] bg-[#0b1d33]">
                <SelectedIcon
                  size={42}
                  strokeWidth={1.7}
                  className="text-[#a99fff]"
                />
              </div>

              <span className="mt-3 text-xs text-[#8b98aa]">
                {selectedIcon.name}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#12365b] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[#294565] px-5 py-2 text-xs font-medium text-[#9aa8b9] transition hover:bg-[#0c2036] hover:text-white cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSelect}
            className="rounded-md bg-[#6c3cec] px-5 py-2 text-xs font-medium text-white transition hover:bg-[#5112ff] cursor-pointer"
          >
            Select Logo
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoPicker;