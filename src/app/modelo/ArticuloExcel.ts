export class ArticuloExcel {
  codigoArt: string;
  nombre: string;
  stockMin: number;
  stockMax: number;
  constructor(
    codigoArt: string,
    nombre: string,
    stockMin: number,
    stockMax: number
  ) {
    this.codigoArt = codigoArt;
    this.nombre = nombre;
    this.stockMin = stockMin;
    this.stockMax = stockMax;
  }
}
