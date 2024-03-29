import { Component, Inject, OnInit } from '@angular/core';
import { CuentaService } from '../../../../service/cuenta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cuenta } from '../../../../models/Cuenta';
import { TipoModal } from '../../../../shared/models/tipo-modal.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-cuenta',
  templateUrl: './agregar-cuenta.component.html',
  styleUrls: ['./agregar-cuenta.component.scss'],
})
export class AgregarCuentaComponent implements OnInit {
  accountForm: FormGroup;
  cuenta: Cuenta = new Cuenta();
  errorInForm = false;
  submitted = false;

  titulo: string;
  tipoModal: TipoModal;
  idProveedor: number;

  constructor(
    private readonly cuentaService: CuentaService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AgregarCuentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.tipoModal = this.data.tipoModal;
    this.idProveedor = this.data.idProveedor;

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
    const { cuenta } = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.accountForm = this.formBuilder.group({
      id: [{ value: cuenta.id, disabled }, null],
      titular: [{ value: cuenta.titular, disabled }, Validators.required],
      numero: [{ value: cuenta.numero, disabled }, Validators.required],
      cbu: [{ value: cuenta.cbu, disabled }, Validators.required],
      alias: [{ value: cuenta.alias, disabled }, Validators.required],
      idBanco: [{ value: cuenta.idBanco, disabled }, Validators.required],
      habilitado: [{ value: cuenta.habilitado, disabled }, null],
      idProveedor: [{ value: cuenta.idProveedor, disabled }, Validators.required],
    });
    return;
  }

  establecerModalVacio(): void {
    this.accountForm = this.formBuilder.group({
      titular: ['', Validators.required],
      numero: ['', Validators.required],
      cbu: ['', Validators.required],
      alias: ['', Validators.required],
      idBanco: ['', Validators.required],
      idProveedor: [this.idProveedor, Validators.required],
    });
  }
  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.accountForm.invalid;

    if (this.errorInForm) {
      this.accountForm.controls['titular'].markAsTouched();
      this.accountForm.controls['numero'].markAsTouched();
      this.accountForm.controls['cbu'].markAsTouched();
      this.accountForm.controls['alias'].markAsTouched();
      this.accountForm.controls['idBanco'].markAsTouched();
      this.accountForm.controls['idProveedor'].markAsTouched();
    } else {
      this.makeDTO();
    }
  }
  makeDTO(): void {
    this.cuenta.titular = this.accountForm.controls.titular.value
      .trim()
      .toUpperCase();
    this.cuenta.numero = this.accountForm.controls.numero.value;
    this.cuenta.cbu = this.accountForm.controls.cbu.value;
    this.cuenta.alias = this.accountForm.controls.alias.value;
    this.cuenta.idBanco = this.accountForm.controls.idBanco.value;
    this.cuenta.idProveedor = this.accountForm.controls.idProveedor.value;
    if (this.tipoModal === TipoModal.actualizacion) {
      this.cuenta.id = this.accountForm.controls.id.value;
      this.cuenta.habilitado = this.accountForm.controls.habilitado.value;
      this.update();
    } else {
      this.save();
    }
  }

  private save(): void {
    this.cuentaService.saveAccountbBank(this.cuenta).subscribe(
      (data) => {
        this.msgSnack(data.titular + ' agregado correctamente');
      },
      ({ error }) => {
        this.openSnackBar(error);
      }
    );
  }

  private update(): void {
    this.cuentaService.updateAccountBank(this.cuenta).subscribe(
      (data) => {
        this.msgSnack(data.titular + ' Actualizado con Exito');
      },
      ({ error }) => {
        this.openSnackBar(error);
      }
    );
  }
  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
  msgSnack(data): void {
    this.dialogRef.close(data);
  }
  establecerBanco(idBanco: number): void {
    this.accountForm.patchValue({ idBanco: idBanco });
  }
}
