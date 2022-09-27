import { Component, Inject, OnInit } from '@angular/core';
import { ProveedoresService } from '@service/proveedores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from '@models/Proveedor';
import { TipoModal } from '@shared/models/tipo-modal.enum';
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css'],
})
export class AgregarProveedorComponent implements OnInit {
  proveedorForm: FormGroup;
  proveedor: Proveedor = new Proveedor();
  proveedores: Proveedor[] = [];
  errorInForm = false;
  submitted = false;

  titulo: string;
  tipoModal: TipoModal;

  constructor(
    private readonly proveedorService: ProveedoresService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AgregarProveedorComponent>,
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
    const { proveedor } = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.proveedorForm = this.formBuilder.group({
      idProveedor: [{ value: proveedor.idProveedor, disabled }, null],
      razonSocial: [{ value: proveedor.razonSocial, disabled }, Validators.required],
      cuit: [{ value: proveedor.cuit, disabled }, Validators.required],
      domicilio: [{ value: proveedor.domicilio, disabled }, Validators.required],
      email: [{ value: proveedor.email, disabled }, null],
      telefono: [{ value: proveedor.telefono, disabled }, null],
      habilitado: [{ value: proveedor.habilitado, disabled }, null],
    });
    return;
  }

  establecerModalVacio(): void {
    this.proveedorForm = this.formBuilder.group({
      razonSocial: ['', Validators.required],
      domicilio: ['', Validators.required],
      cuit: ['', Validators.required],
      email: ['', null],
      telefono: ['', null],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.proveedorForm);
    this.submitted = true;
    this.errorInForm = this.submitted && this.proveedorForm.invalid;

    if (this.errorInForm) {
      this.proveedorForm.controls.razonSocial.markAllAsTouched();
      this.proveedorForm.controls.cuit.markAllAsTouched();
      this.proveedorForm.controls.domicilio.markAllAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    this.proveedor.razonSocial = this.proveedorForm.controls.razonSocial.value
      .trim()
      .toUpperCase();
    this.proveedor.cuit = this.proveedorForm.controls.cuit.value;
    this.proveedor.domicilio = this.proveedorForm.controls.domicilio.value
      .trim()
      .toUpperCase();
    this.proveedor.email = this.proveedorForm.controls.email.value;
    this.proveedor.telefono = this.proveedorForm.controls.telefono.value;

    if (this.tipoModal === TipoModal.actualizacion) {
      this.proveedor.idProveedor = this.proveedorForm.controls.idProveedor.value;
      this.proveedor.habilitado = this.proveedorForm.controls.habilitado.value;
      this.update();
    } else {
      this.save();
    }
  }

  private save(): void {
    this.proveedorService.saveProveedor(this.proveedor).subscribe(
      (data) => {
        this.msgSnack(data.razonSocial + ' Guardado con Exito');
      },
      ({ error }) => {
        this.openSnackBar(error);
      }
    );
  }

  private update(): void {
    this.proveedorService.updatedProveedor(this.proveedor).subscribe(
      (data) => {
        this.msgSnack(data.razonSocial + ' Actualizado con Exito');
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
