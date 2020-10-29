import {Ubicacion} from "./Ubicacion";

export class Direccion {
  id: number;
  calle: string;
  descripcion: string;
  numerocalle: string;
  estado: boolean;
  clienteId: number;
  distritoId: number;
  ubicacion: Ubicacion
  // ubicacion: {lat: number, lng: number};
}
