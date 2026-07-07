import {
  FileSpreadsheet,
  FileText,
} from "lucide-react";

function ExportButtons({
  onPDF,
  onCSV,
}) {
  return (
    <div className="flex gap-4">

      <button
        onClick={onPDF}
        className="flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        <FileText size={18} />

        Export PDF
      </button>

      <button
        onClick={onCSV}
        className="flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <FileSpreadsheet size={18} />

        Export Excel
      </button>

    </div>
  );
}

export default ExportButtons;