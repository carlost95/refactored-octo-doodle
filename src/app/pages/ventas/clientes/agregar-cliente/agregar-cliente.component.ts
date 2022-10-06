import { Cliente } from '@models/Cliente';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../../service/cliente.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { TipoModal } from '../../../../shared/models/tipo-modal.enum';
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css'],
})
export class AgregarClienteComponent implements OnInit {
  clientForm: FormGroup;
  cliente: Cliente = new Cliente();
  errorInForm: boolean = false;
  submitted = false;

  titulo: string;
  tipoModal: TipoModal;
  constructor(
    private clientservice: ClienteService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarClienteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.tipoModal = this.data.tipoModal;

    if (
      this.tipoModal === TipoModal.consulta ||
      this.tipoModal === TipoModal.actualizacion
    ) {
      this.establecerModalDatos(this.data, this.tipoModal);
    } else {
      this.establecerModalVacio();
    }
  }

  establecerModalDatos(data: any, tipoModal: TipoModal): void {
    const { cliente } = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.clientForm = this.formBuilder.group({
      idCliente: [{ value: cliente.idCliente, disabled }, null],
      nombre: [{ value: cliente.nombre, disabled }, Validators.required],
      apellido: [{ value: cliente.apellido, disabled }, Validators.required],
      dni: [{ value: cliente.dni, disabled }, Validators.required],
      contacto: [{ value: cliente.contacto, disabled }, null],
      email: [{ value: cliente.email, disabled }, null],
      status: [{ value: cliente.status, disabled }, Validators.required],
    });
    return;
  }

  establecerModalVacio(): void {
    this.clientForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      contacto: ['', null],
      email: ['', null],
    });
  }
  close(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.clientForm.invalid;

    if (this.errorInForm) {
      this.clientForm.controls.nombre.markAllAsTouched();
      this.clientForm.controls.apellido.markAllAsTouched();
      this.clientForm.controls.dni.markAllAsTouched();
    } else {
      this.makeDTO();
    }
  }
  makeDTO(): void {
    this.cliente.nombre = this.clientForm.controls.nombre.value
      .trim()
      .toUpperCase();
    this.cliente.apellido = this.clientForm.controls.apellido.value
      .trim()
      .toUpperCase();
    this.cliente.dni = this.clientForm.controls.dni.value;
    this.cliente.contacto = this.clientForm.controls.contacto.value.trim();
    this.cliente.email = this.clientForm.controls.email.value.trim();

    if (this.tipoModal === TipoModal.actualizacion) {
      this.cliente.idCliente = this.clientForm.controls.idCliente.value;
      this.cliente.status = this.clientForm.controls.status.value;
      this.update();
    } else {
      this.save();
    }
  }
  private save(): void {
    this.clientservice.saveClient(this.cliente).subscribe(
      (data) => {
        this.msgSnack(data.nombre + ' Guardado con Exito');
      },
      ({ error }) => {
        this.openSnackBar(error);
      }
    );
  }
  private update(): void {
    this.clientservice.updatedClient(this.cliente).subscribe(
      (data) => {
        this.msgSnack(data.nombre + ' Actualizado con Exito');
      },
      ({ error }) => {
        this.openSnackBar(error);
      }
    );
  }
  msgSnack(data: string): void {
    this.dialogRef.close(data);
  }
  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
