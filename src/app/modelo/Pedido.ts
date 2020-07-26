export class Pedido{
  id: number;
  nombre: string;
  fecha: string;
  descripcion: string;

  constructor(id?: number, nombre?: string, fecha?:string, descripcion?:string){
    this.id  = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.descripcion = descripcion;
  }
}
