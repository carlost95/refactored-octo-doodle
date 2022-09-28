import { Marca } from '@models/Marca';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcasService } from '@service/marcas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoModal } from '@shared/models/tipo-modal.enum';
import { MarcaRest } from '@models/marca-rest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmComponent } from '@shared/snack-confirm/snack-confirm.component';

@Component({
  selector: 'app-agregar-marca',
  templateUrl: './agregar-marca.component.html',
  styleUrls: ['./agregar-marca.component.css']
})
export class AgregarMarcaComponent implements OnInit {
  titulo: string;
  tipoModal: TipoModal;

  marca: MarcaRest = new MarcaRest();
  marcaForm: FormGroup;
  errorInForm = false;
  submitted = false;

  constructor(
    private readonly marcaService: MarcasService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarMarcaComponent>,
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
    const { marca } = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.marcaForm = this.formBuilder.group({
      id: [{ value: marca.idMarca, disabled }, null],
      nombre: [{ value: marca.nombre, disabled }, Validators.required],
      abreviatura: [{ value: marca.abreviatura, disabled }, Validators.required],
      estado: [{ value: marca.habilitado, disabled }, null],
    });
  }

  private establecerModalVacio(): void {
    this.marcaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      abreviatura: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.marcaForm.invalid;
    if (this.errorInForm) {
      this.marcaForm.controls.nombre.markAsTouched();
      this.marcaForm.controls.abreviatura.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    this.marca.nombre = this.marcaForm.controls.nombre.value.trim().toUpperCase();
    this.marca.abreviatura = this.marcaForm.controls.abreviatura.value.trim().toUpperCase();
    if (this.tipoModal === TipoModal.actualizacion) {
      this.marca.idMarca = this.marcaForm.controls.id.value;
      this.marca.habilitado = this.marcaForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.marcaService.guardar(this.marca).subscribe((data) => {
      this.msgSnack(data.nombre + ' Guardada con éxito');
    }, ({ error }) => {
      this.openSnackBar(error);
    });
  }

  update(): void {
    this.marcaService.actualizar(this.marca).subscribe((data) => {
      this.msgSnack(data.nombre + ' Actualizada con éxito');
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
