import { Component, Inject, OnInit } from '@angular/core';
import { TipoModal } from '../../../../shared/models/tipo-modal.enum';
import { Empresa } from '../../../../models/Empresa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from '../../../../service/empresa.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';

@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.scss']
})
export class AgregarEmpresaComponent implements OnInit {

  titulo: string;
  tipoModal: TipoModal;

  empresa: Empresa = new Empresa();
  empresaForm: FormGroup;
  errorInForm = false;
  submitted = false;

  constructor(
    private readonly empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarEmpresaComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.tipoModal = this.data.tipo;

    if (this.tipoModal === TipoModal.consulta || this.tipoModal === TipoModal.actualizacion) {
      this.establecerModalDatos(this.data, this.tipoModal);
    } else {
      this.establecerModalVacio();
    }
  }

  private establecerModalDatos(data: any, tipoModal: TipoModal): void {
    const { empresa } = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.empresaForm = this.formBuilder.group({
      idEmpresa: [{ value: empresa.idEmpresa, disabled }, Validators.required],
      razonSocial: [{ value: empresa.razonSocial, disabled }, Validators.required],
      cuit: [{ value: empresa.cuit, disabled }, Validators.required],
      email: [{ value: empresa.email, disabled }, Validators.required],
      telefono: [{ value: empresa.telefono, disabled }, Validators.required],
      domicilio: [{ value: empresa.domicilio, disabled }, Validators.required],
      status: [{ value: empresa.status, disabled }, null],
    });
    return;
  }

  private establecerModalVacio(): void {
    this.empresaForm = this.formBuilder.group({
      razonSocial: ['', Validators.required],
      cuit: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      domicilio: ['', Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.empresaForm.invalid;

    if (this.errorInForm) {
      this.empresaForm.controls.razonSocial.markAsTouched();
      this.empresaForm.controls.cuit.markAsTouched();
      this.empresaForm.controls.email.markAsTouched();
      this.empresaForm.controls.telefono.markAsTouched();
      this.empresaForm.controls.domicilio.markAsTouched();
    }
    else {
      this.makeDTO();

    }
  }

  makeDTO(): void {
    this.empresa.razonSocial = this.empresaForm.controls.razonSocial.value.toUpperCase();
    this.empresa.cuit = this.empresaForm.controls.cuit.value.trim().toUpperCase();
    this.empresa.email = this.empresaForm.controls.email.value.trim();
    this.empresa.telefono = this.empresaForm.controls.telefono.value.trim().toUpperCase();
    this.empresa.domicilio = this.empresaForm.controls.domicilio.value;


    if (this.tipoModal === TipoModal.actualizacion) {
      this.empresa.idEmpresa = this.empresaForm.controls.idEmpresa.value;
      this.empresa.status = this.empresaForm.controls.status.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.empresaService.saveEmpresa(this.empresa).subscribe((data) => {
      this.msgSnack(data.razonSocial + ' Guardada con éxito');
    }, ({ error }) => {
      this.openSnackBar(error);
    });
  }

  update(): void {
    this.empresaService.updatedEmpresa(this.empresa).subscribe((data) => {
      this.msgSnack(data.razonSocial + ' Actualizada con éxito');
    }, ({ error }) => {
      this.openSnackBar(error);
    });
  }

  msgSnack(msg: string): void {
    this.dialogRef.close(msg);
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
