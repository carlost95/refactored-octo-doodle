import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubRubroService } from '@service/sub-rubro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RubrosService } from '@service/rubros.service';
import { TipoModal } from '@shared/models/tipo-modal.enum';
import { SubRubroRest } from '@models/subrubro-rest';
import { RubroRest } from '@models/rubro-rest';
import { SnackConfirmComponent } from '@shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-sub-rubro',
  templateUrl: './agregar-sub-rubro.component.html',
  styleUrls: ['./agregar-sub-rubro.component.css']
})
export class AgregarSubRubroComponent implements OnInit {
  titulo: string;
  tipoModal: TipoModal;
  rubros: RubroRest[];
  subrubro: SubRubroRest = new SubRubroRest();
  subrubroForm: FormGroup;
  submitted: boolean;
  errorInForm: any;
  isLoading = true;


  constructor(
    private readonly subRubroService: SubRubroService,
    private readonly rubroService: RubrosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarSubRubroComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.rubroService.obtenerHabilitados().subscribe(rubros => {
      this.isLoading = false;
      this.rubros = rubros;
      this.titulo = this.data.titulo;
      this.tipoModal = this.data.tipo;

      if (this.tipoModal === TipoModal.consulta || this.tipoModal === TipoModal.actualizacion) {
        this.establecerModalDatos(this.data, this.tipoModal);
      } else {
        this.establecerModalVacio();
      }
    });
  }
  private establecerModalDatos(data, tipoModal): void {
    const { subrubro } = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.subrubroForm = this.formBuilder.group({
      id: [{ value: subrubro.idSubRubro, disabled }, null],
      nombre: [{ value: subrubro.nombre, disabled }, Validators.required],
      abreviatura: [{ value: subrubro.abreviatura, disabled }, Validators.required],
      estado: [{ value: subrubro.habilitado, disabled }, null],
      rubroId: [{ value: subrubro.rubroId, disabled }, Validators.required]
    });
  }

  private establecerModalVacio(): void {
    this.subrubroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      abreviatura: ['', Validators.required],
      rubroId: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.subrubroForm.invalid;

    if (this.errorInForm) {
      this.subrubroForm.controls.nombre.markAsTouched();
      this.subrubroForm.controls.abreviatura.markAsTouched();
      this.subrubroForm.controls.rubroId.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    this.subrubro.nombre = this.subrubroForm.controls.nombre.value.trim().toUpperCase();
    this.subrubro.abreviatura = this.subrubroForm.controls.abreviatura.value.trim().toUpperCase();
    this.subrubro.rubroId = this.subrubroForm.controls.rubroId.value;
    if (this.tipoModal === TipoModal.actualizacion) {
      this.subrubro.idSubRubro = this.subrubroForm.controls.id.value;
      this.subrubro.habilitado = this.subrubroForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  update(): void {
    this.subRubroService.actualizar(this.subrubro).subscribe((data) => {
      this.msgSnack(data.nombre + ' Guardado con éxito');
    }, ({ error }) => {
      this.openSnackBar(error);
    });
  }

  save(): void {
    this.subRubroService.guardar(this.subrubro).subscribe((data) => {
      this.msgSnack(data.nombre + ' Actualizado con éxito');
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

  establecerRubro(rubroId: number): void {
    this.subrubroForm.patchValue({ rubroId });
  }
}
