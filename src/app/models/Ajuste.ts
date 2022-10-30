import { ArticuloStock } from './articulo-rest';
export class Ajuste {
  idAjuste: number;
  nombre: string;
  fecha: string;
  descripcion: string;
  proveedorId: number;
  proveedorRazonSocial: string;

  constructor(id?: number, nombre?: string, fecha?: string,
    descripcion?: string, proveedorId?: number, proveedorRazonSocial?: string) {
    this.idAjuste = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.proveedorId = proveedorId;
    this.proveedorRazonSocial = proveedorRazonSocial;
  }
}

export class AjusteDTO {
  id?: number;
  nombre?: string;
  descripcion?: string;
  fecha?: Date;
  idProveedor?: number;
  articulos?: ArticuloStock[];
}