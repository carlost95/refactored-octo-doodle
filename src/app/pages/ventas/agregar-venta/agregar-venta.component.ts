import { Component, Inject, OnInit } from '@angular/core';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../../service/cliente.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticulosService } from '../../../service/articulos.service';
import { Articulo } from '../../../models/Articulo';

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.scss'],
})
export class AgregarVentaComponent implements OnInit {
  idClient: number;
  updating = false;
  consultar = false;
  clientForm: any = new FormBuilder();
  ventaForm: any;
  clients: Cliente[] = [];
  duplicateDni = false;
  submitted = false;
  errorInForm = true;
  busqueda: any;

  venta1: Venta;
  venta2: Venta;
  venta3: Venta;
  venta4: Venta;
  venta5: Venta;
  total = 0;

  ventas: Venta[] = [];
  ventasFilter: Venta[] = [];
  articulos: Articulo[] = [];
  article: Articulo = new Articulo();

  constructor(
    private service: ClienteService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private articulosService: ArticulosService,
    public dialogRef: MatDialogRef<AgregarVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.clienteService
      .getAllClient()
      .subscribe((data) => (this.clients = data));
    this.articulosService
      .listarArticuloHabilitados()
      .subscribe((response) => (this.articulos = response.data));

    this.cargaArreglo();
    // this.service.getAll().subscribe(resp => {
    //   this.clients = resp.data;
    //   console.log(resp);
    // });
    // const {cliente} = this.data;
    //
    // if (cliente) {
    //   this.consultar = this.data.consulting;
    //   console.log(this.consultar ? 'true' : 'false');
    //   this.clientForm = this.formBuilder.group({
    //     id: [cliente.id, null],
    //     apellido: [{value: cliente.apellido, disabled: this.consultar}, Validators.required],
    //     nombre: [{value: cliente.nombre, disabled: this.consultar}, Validators.required],
    //     dni: [{value: cliente.dni, disabled: this.consultar}, Validators.required],
    //     mail: [{value: cliente.mail, disabled: this.consultar}, null],
    //     estado: [{value: cliente.estado, disabled: this.consultar}, null],
    //   });
    //   this.updating = !this.consultar;
    // } else {
    this.ventaForm = this.formBuilder.group({
      nro: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      fecha: ['', Validators.required],
      monto: ['', null],
    });
    // }
  }

  cargaArreglo(): void {
    this.venta1 = new Venta(1, 'hierro 8', '12/12/20', 18);
    this.venta2 = new Venta(2, 'hierro 10', '12/12/20', 300);
    this.venta3 = new Venta(3, 'cemento', '12/12/20', 181);
    this.venta4 = new Venta(4, 'pegamento', '12/12/20', 182);
    this.venta5 = new Venta(5, 'ceramico', '21/12/20', 183);
    // this.venta6 = new Venta(6, 'vigeta', '21/12/20', 184);
    // this.venta7 = new Venta(7, 'pastina', '21/12/20', 185);
    // this.venta8 = new Venta(8, 'alambre 17', '21/12/20', 186);
    // this.venta9 = new Venta(9, 'alambre 14', '15/1/21', 188);
    // this.venta10 = new Venta(10, 'griferia fv ', '15/1/21', 12);

    // this.ventasFilter = [this.venta1, this.venta2, this.venta3, this.venta4,
    //   this.venta5, this.venta6, this.venta7, this.venta8, this.venta9, this.venta10];
    this.ventasFilter = [this.venta1, this.venta2, this.venta3, this.venta4];
    this.ventas = this.ventasFilter;
  }

  validate({ target }): void {
    const { value: dni } = target;
    const finded = this.clients.find((c) => dni === c.dni);
    this.duplicateDni = finded ? true : false;
  }

  close(): void {
    this.data.save = false;
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.clientForm.invalid;
    if (this.errorInForm || this.duplicateDni) {
      this.clientForm.controls.dni.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    // this.client.apellido = (this.clientForm.controls.apellido.value).trim().toUpperCase();
    // this.client.nombre = (this.clientForm.controls.nombre.value).trim().toUpperCase();
    // this.client.dni = (this.clientForm.controls.dni.value).trim();
    // this.client.mail = (this.clientForm.controls.mail.value).trim();
    // if (this.updating) {
    //   this.client.id = this.clientForm.controls.id.value;
    //   this.client.estado = this.clientForm.controls.estado.value;
    //   this.update();
    // } else {
    //   this.save();
    // }
  }

  save(): void {
    // this.service.save(this.client).subscribe(data => {
    //   this.msgSnack(data);
    // });
  }

  update(): void {
    // this.service.update(this.client).subscribe(data => {
    //   this.msgSnack(data);
    // });
  }

  msgSnack(data): void {
    const { msg } = data;
    if (data.code === 200) {
      this.dialogRef.close(msg);
    } else {
      this.dialogRef.close('Error en el proceso');
    }
  }

  filtrarArticulo({ target }): void {
    const { value: codigoArt } = target;
    const finded = this.articulos.find((c) => codigoArt === c.codigoArt);
    this.article = finded;
    console.log(finded);
  }

  nuevoCliente(): void {}
}

export class Venta {
  nro: number;
  nombreCliente: string;
  fecha: string;
  monto: number;

  constructor(
    nro: number,
    nombreCliente: string,
    fecha: string,
    monto: number
  ) {
    this.nro = nro;
    this.nombreCliente = nombreCliente;
    this.fecha = fecha;
    this.monto = monto;
  }
}
