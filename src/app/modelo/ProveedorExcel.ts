export class ProveedorExcel {
    razonSocial: string;
    domicilio: string;
    mail: string;
    celular: string;
    telefono: string;
    constructor(
        razonSocial: string,
        domicilio: string,
        mail: string,
        celular: string,
        telefono: string
    ) {
        this.razonSocial = razonSocial;
        this.domicilio = domicilio;
        this.mail = mail;
        this.telefono = telefono;
        this.celular = celular;
    }
}