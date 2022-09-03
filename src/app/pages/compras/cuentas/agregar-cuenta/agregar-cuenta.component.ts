import { Component, Inject, OnInit } from '@angular/core';
import { CuentaService } from '../../../../service/cuenta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cuenta } from '../../../../models/Cuenta';
import { TipoModal } from '../../../../shared/models/tipo-modal.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cuentaBancario } from '../../../../../environments/global-route';

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
  updating = false;
  consulting: boolean;

  titulo: string;
  tipoModal: TipoModal;

  constructor(
    private readonly cuentaService: CuentaService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarCuentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.titulo = this.data.titulo.value;
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
    const { cuenta } = data;

    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.accountForm = this.formBuilder.group({
      id: [{ value: cuenta.id, disabled }, null],
      titular: [{ value: cuenta.titular, disabled }, Validators.required],
      numero: [{ value: cuenta.numero, disabled }, Validators.required],
      cbu: [{ value: cuenta.cbu, disabled }, Validators.required],
      alias: [{ value: cuenta.alias, disabled }, Validators.required],
      // habilitado: [{ value: cuenta.habilitado, disabled }, null],
      // idBanco: [{ value: cuenta.idBanco, disabled }, Validators.required],
    });
    return;
  }

  establecerModalVacio(): void {
    this.accountForm = this.formBuilder.group({
      id: ['', Validators.required],
      Titular: ['', Validators.required],
      numero: ['', Validators.required],
      cbu: ['', Validators.required],
      alias: ['', Validators.required],
      // idBanco: ['', Validators.required],
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
      // this.accountForm.controls['habilitado'].markAsTouched();
      // this.accountForm.controls['idBanco'].markAsTouched();
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
    // this.cuenta.idBanco = this.accountForm.controls.idBanco.value;

    console.log('carga de cuenta bancaria');
    console.log(this.cuenta);

    if (this.updating) {
      this.cuenta.id = this.accountForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }

  private save(): void {
    this.cuentaService.saveAccountbBank(this.cuenta).subscribe((data) => {
      this.msgSnack(data);
    });
  }

  private update(): void {
    console.log('update Cuenta');

    console.log(this.cuenta);

    this.cuentaService.updateAccountBank(this.cuenta).subscribe((data) => {
      this.msgSnack(data);
    });
  }

  msgSnack(data): void {
    const { msg } = data;
    if (data.code === 200) {
      this.dialogRef.close(msg);
    } else {
      this.dialogRef.close('Error en el proceso');
    }
  }
  //   establecerBanco(idBanco: number): void {
  //     this.accountForm.patchValue({ bancos: idBanco });
  //   }
}
