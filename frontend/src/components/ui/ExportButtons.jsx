import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

function ExportButtons({
  onPDF,
  onCSV,
}) {
  const [open, setOpen] =
    useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex items-center gap-2 rounded-2xl bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-900"
      >

        Export

        <ChevronDown
          size={18}
          className={`transition duration-300 ${
            open
              ? "rotate-180"
              : ""
          }`}
        />

      </button>

      {open && (

        <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

          <button
            onClick={() => {
              setOpen(false);
              onPDF();
            }}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-slate-700 transition hover:bg-slate-100"
          >

            <FileText
              size={18}
              className="text-red-600"
            />

            Export PDF

          </button>

          <button
            onClick={() => {
              setOpen(false);
              onCSV();
            }}
            className="flex w-full items-center gap-3 border-t border-slate-200 px-5 py-4 text-left text-slate-700 transition hover:bg-slate-100"
          >

            <FileSpreadsheet
              size={18}
              className="text-green-600"
            />

            Export Excel

          </button>

        </div>

      )}

    </div>
  );
}

export default ExportButtons;