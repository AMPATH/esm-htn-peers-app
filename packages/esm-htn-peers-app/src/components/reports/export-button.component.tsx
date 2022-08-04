import React, { useRef } from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Export16 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';

export const ExportToExcel =  ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  
  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button 
      kind="ghost" 
      renderIcon={Export16} 
      iconDescription="Download Report" 
      onClick={(e) => exportToCSV(apiData, fileName)}>Export Data
    </Button>
  );
};