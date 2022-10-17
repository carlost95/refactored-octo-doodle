import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor() { }

  buscarTermino(datos: any[], key: string, value: string): any[] {
    const termino = value?.toLowerCase()?.trim();
    let resultado = datos;
    if (termino) {
      resultado = datos.filter(dato => dato[key].toLowerCase().includes(termino));
    }
    return resultado;
  }
  buscarTerminoNumber(datos: any[], key: string, value: string): any[] {
    const termino = value?.trim();
    let resultado = datos;
    if (termino) {
      resultado = datos.filter(dato => dato[key] == (termino));
    }
    return resultado;
  }
}
