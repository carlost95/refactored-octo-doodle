import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RubrosService} from '@service/rubros.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TipoModal} from '@shared/models/tipo-modal.enum';
import {RubroRest} from '@models/rubro-rest';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackConfirmComponent} from '@shared/snack-confirm/snack-confirm.component';

@Component({
  selector: 'app-agregar-rubro',
  templateUrl: './agregar-rubro.component.html',
  styleUrls: ['./agregar-rubro.component.css']
})
export class AgregarRubroComponent implements OnInit {
  titulo: string;
  tipoModal: TipoModal;
  rubro: RubroRest = new RubroRest();
  rubroForm: FormGroup;
  submitted: boolean;
  errorInForm: any;

  constructor(
    private rubroService: RubrosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarRubroComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
    const {rubro} = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.rubroForm = this.formBuilder.group({
      id: [{value: rubro.idRubro, disabled}, null],
      nombre: [{value: rubro.nombre, disabled}, Validators.required],
      abreviatura: [{value: rubro.abreviatura, disabled}, Validators.required],
      estado: [{value: rubro.habilitado, disabled}, null],
    });
  }

  private establecerModalVacio(): void {
    this.rubroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      abreviatura: ['', Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.rubroForm.invalid;
    if (this.errorInForm ) {
      this.rubroForm.controls.nombre.markAsTouched();
      this.rubroForm.controls.abreviatura.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    this.rubro.nombre = this.rubroForm.controls.nombre.value.trim().toUpperCase();
    this.rubro.abreviatura = this.rubroForm.controls.abreviatura.value.trim().toUpperCase();
    if (this.tipoModal === TipoModal.actualizacion) {
      this.rubro.idRubro = this.rubroForm.controls.id.value;
      this.rubro.habilitado = this.rubroForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.rubroService.guardar(this.rubro).subscribe((data) => {
      this.msgSnack('Guardado con éxito');
    }, error => {
      this.openSnackBar(error);
    });
  }

  update(): void {
    this.rubroService.actualizar(this.rubro).subscribe((data) => {
      this.msgSnack('Actualizado con éxito');
    }, error => {
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
