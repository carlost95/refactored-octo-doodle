export class Pedido {
  id: number;
  nombre: string;
  fecha: string;
  // tslint:disable-next-line: variable-name
  proveedorId: number;
  razonSocial: string;
  descripcion: string;

  // tslint:disable-next-line: variable-name
  constructor(id?: number, nombre?: string, fecha?: string, proveedorId?: number, descripcion?: string) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.proveedorId = proveedorId;
    this.descripcion = descripcion;
  }
}
