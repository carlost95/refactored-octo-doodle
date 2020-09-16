export class Ajuste {
  id: number;
  nombre: string;
  fecha: string;
  proveedorId: number;
  razonSocial: string;
  descripcion: string;

  constructor(id?: number, nombre?: string, fecha?: string, proveedorId?: number, descripcion?: string) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.proveedorId = proveedorId;
    this.descripcion = descripcion;
  }
}

