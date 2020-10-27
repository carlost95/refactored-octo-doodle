export class Ajuste {
  id: number;
  nombre: string;
  fecha: string;
  descripcion: string;
  proveedorId: number;
  proveedorRazonSocial: string;

  constructor(id?: number, nombre?: string, fecha?: string,
              descripcion?: string, proveedorId?: number, proveedorRazonSocial?: string) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.proveedorId = proveedorId;
    this.proveedorRazonSocial = proveedorRazonSocial;
  }
}

