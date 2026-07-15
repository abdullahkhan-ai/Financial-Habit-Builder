import { useEffect, useRef, useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

function ExportButtons({
  onPDF,
  onCSV,
}) {
  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef(null);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
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
        title="Export"
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-700"
      >

        <Download size={22} />

      </button>

      {open && (

        <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

          <button
            onClick={() => {
              setOpen(false);
              onPDF();
            }}
            className="flex w-full items-center gap-3 px-5 py-4 text-slate-700 transition hover:bg-slate-100"
          >

            <FileText
              size={18}
              className="text-red-600"
            />

            <span className="font-medium">
              Export PDF
            </span>

          </button>

          <button
            onClick={() => {
              setOpen(false);
              onCSV();
            }}
            className="flex w-full items-center gap-3 px-5 py-4 text-slate-700 transition hover:bg-slate-100"
          >

            <FileSpreadsheet
              size={18}
              className="text-green-600"
            />

            <span className="font-medium">
              Export Excel
            </span>

          </button>

        </div>

      )}

    </div>
  );
}

export default ExportButtons;