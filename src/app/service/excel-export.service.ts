import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset_ UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  constructor() { }

  exportToExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { reporte: worksheet },
      SheetNames: ['reporte'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // llama al metodo
    this.saveAsExcel(excelBuffer, excelFileName);
  }
  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const fecha = this.cargarFecha();
    FileSaver.saveAs(data, fileName + fecha + EXCEL_EXT);
  }
  // tslint:disable-next-line: typedef
  cargarFecha(): string {
    const day = new Date().getDate();
    const monthIndex = new Date().getMonth();
    const year = new Date().getFullYear();
    const minutes = new Date().getMinutes();
    const hours = new Date().getHours();
    return ' ' + day + '-' + (monthIndex + 1) + '-' + year + '-' + hours + ' ' + minutes;
  }
}
