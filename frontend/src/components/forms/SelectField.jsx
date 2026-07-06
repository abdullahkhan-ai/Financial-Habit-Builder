import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

function SelectField({
  label,
  value,
  onChange,
  options = [],
  name,
}) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  const selected =
    options.find((option) => option.value === value) ||
    options[0];

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <label className="mb-2 block text-sm font-medium text-slate-600">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        <span className="truncate">
          {selected?.label}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-[9999] mt-2 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5">

          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange({
                  target: {
                    name,
                    value: option.value,
                  },
                });

                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-blue-50"
            >
              <span>
                {option.label}
              </span>

              {value === option.value && (
                <Check
                  size={18}
                  className="text-blue-600"
                />
              )}
            </button>
          ))}

        </div>
      )}
    </div>
  );
}

export default SelectField;