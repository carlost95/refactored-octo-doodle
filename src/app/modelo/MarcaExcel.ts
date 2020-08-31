export class MarcaExcel {
    id: number;
    nombre: string;
    abreaviatura: string;

    constructor(id: number, nombre: string, abreviatura: string) {
        this.id = id;
        this.nombre = nombre;
        this.abreaviatura = abreviatura;
    }
}