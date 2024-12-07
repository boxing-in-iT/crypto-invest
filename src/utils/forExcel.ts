import * as XLSX from "xlsx";

export const exportToExcel = (data: any, fileName = "investments.xlsx") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Investments");
  XLSX.writeFile(workbook, fileName);
};

export const importFromExcel = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      resolve(json);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};
