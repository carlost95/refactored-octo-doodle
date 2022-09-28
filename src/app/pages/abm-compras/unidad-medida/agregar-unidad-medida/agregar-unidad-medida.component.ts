import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UnidadMedidaService } from '@service/unidad-medida.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoModal } from '@shared/models/tipo-modal.enum';
import { UnidadMedidaRest } from '@models/unidad-medida-rest';
import { SnackConfirmComponent } from '@shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { unidadMedida } from "../../../../../environments/global-route";

@Component({
  selector: 'app-agregar-unidad-medida',
  templateUrl: './agregar-unidad-medida.component.html',
  styleUrls: ['./agregar-unidad-medida.component.css']
})
export class AgregarUnidadMedidaComponent implements OnInit {
  titulo: string;
  tipoModal: TipoModal;
  unidadDeMedida: UnidadMedidaRest = new UnidadMedidaRest();
  unidadDeMedidaForm: FormGroup;
  submitted: boolean;
  errorInForm: any;


  constructor(
    private readonly unidadDeMedidaService: UnidadMedidaService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarUnidadMedidaComponent>,
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
  private establecerModalDatos(data, tipoModal): void {
    const { unidadDeMedida } = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.unidadDeMedidaForm = this.formBuilder.group({
      id: [{ value: unidadDeMedida.idUnidadMedida, disabled }, null],
      nombre: [{ value: unidadDeMedida.nombre, disabled }, Validators.required],
      abreviatura: [{ value: unidadDeMedida.abreviatura, disabled }, Validators.required],
      estado: [{ value: unidadDeMedida.habilitado, disabled }, null],
    });
  }

  private establecerModalVacio(): void {
    this.unidadDeMedidaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      abreviatura: ['', Validators.required]
    });
  }


  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.unidadDeMedidaForm.invalid;
    if (this.errorInForm) {
      this.unidadDeMedidaForm.controls.nombre.markAsTouched();
      this.unidadDeMedidaForm.controls.abreviatura.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    this.unidadDeMedida.nombre = this.unidadDeMedidaForm.controls.nombre.value.trim().toUpperCase();
    this.unidadDeMedida.abreviatura = this.unidadDeMedidaForm.controls.abreviatura.value.trim().toUpperCase();
    if (this.tipoModal === TipoModal.actualizacion) {
      this.unidadDeMedida.idUnidadMedida = this.unidadDeMedidaForm.controls.id.value;
      this.unidadDeMedida.habilitado = this.unidadDeMedidaForm.controls.estado.value;
      console.log(this.unidadDeMedida);
      this.update();
    } else {
      this.save();
    }
  }

  private save(): void {
    this.unidadDeMedidaService.guardar(this.unidadDeMedida).subscribe((data) => {
      this.msgSnack(data.nombre + ' Guardado con éxito');
    }, ({ error }) => {
      this.openSnackBar(error);
    });
  }

  private update(): void {
    this.unidadDeMedidaService.actualizar(this.unidadDeMedida).subscribe((data) => {
      this.msgSnack(data.nombre + ' Actualizado con éxito');
    }, ({ error }) => {
      this.openSnackBar(error);
    });
  }

  close(): void {
    this.dialogRef.close();
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
