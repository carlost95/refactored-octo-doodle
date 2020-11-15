import {Cliente} from '../../../../models/Cliente';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClienteService} from '../../../../service/cliente.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css'],
})
export class AgregarClienteComponent implements OnInit {
  client: Cliente = new Cliente();
  updating = false;
  consultar = false;
  clientForm: any;
  clients: Cliente[] = [];
  duplicateDni = false;
  submitted = false;
  errorInForm = true;


  constructor(private service: ClienteService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AgregarClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(resp => {
      this.clients = resp.data;
      console.log(resp);
    });
    const {cliente} = this.data;

    if (cliente) {
      this.consultar = this.data.consulting;
      console.log(this.consultar ? 'true' : 'false');
      this.clientForm = this.formBuilder.group({
        id: [cliente.id, null],
        apellido: [{value: cliente.apellido, disabled: this.consultar}, Validators.required],
        nombre: [{value: cliente.nombre, disabled: this.consultar}, Validators.required],
        dni: [{value: cliente.dni, disabled: this.consultar}, Validators.required],
        mail: [{value: cliente.mail, disabled: this.consultar}, null],
        estado: [{value: cliente.estado, disabled: this.consultar}, null],
      });
      this.updating = !this.consultar;
    } else {
      this.clientForm = this.formBuilder.group({
        apellido: ['', Validators.required],
        nombre: ['', Validators.required],
        dni: ['', Validators.required],
        mail: ['', null]
      });
    }
  }

  validate({target}): void {
    const {value: dni} = target;
    const finded = this.clients.find(c => dni === c.dni);
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
    this.client.apellido = (this.clientForm.controls.apellido.value).trim().toUpperCase();
    this.client.nombre = (this.clientForm.controls.nombre.value).trim().toUpperCase();
    this.client.dni = (this.clientForm.controls.dni.value).trim();
    this.client.mail = (this.clientForm.controls.mail.value).trim();
    if (this.updating) {
      this.client.id = this.clientForm.controls.id.value;
      this.client.estado = this.clientForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.service.save(this.client).subscribe(data => {
      this.msgSnack(data);
    });
  }

  update(): void {
    this.service.update(this.client).subscribe(data => {
      this.msgSnack(data);
    });
  }

  msgSnack(data): void {
    const {msg} = data;
    if (data.code === 200) {
      this.dialogRef.close(msg);
    } else {
      this.dialogRef.close('Error en el proceso');
    }
  }
}
