import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportToPDF = (
  title,
  columns,
  data,
  filename
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [columns],
    body: data,
  });

  doc.save(`${filename}.pdf`);
};

export const exportToCSV = (
  data,
  filename
) => {
  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Report"
  );

  XLSX.writeFile(
    workbook,
    `${filename}.xlsx`
  );
};