import {Departamento} from '../../../../models/Departamento';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartamentosService} from '../../../../service/departamentos.service';
import {TipoModal} from '@shared/models/tipo-modal.enum';
import {DepartamentoRest} from '@models/departamento-rest';
import {SnackConfirmComponent} from "@shared/snack-confirm/snack-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-agregar-departamento',
  templateUrl: './agregar-departamento.component.html',
  styleUrls: ['./agregar-departamento.component.css'],
})
export class AgregarDepartamentoComponent implements OnInit {
  titulo: string;
  tipoModal: TipoModal;
  departamentos: DepartamentoRest[];

  departamento: DepartamentoRest = new DepartamentoRest();
  response: Response;
  consultar = false;
  departamentoForm: FormGroup;
  updating = false;
  submitted: boolean;
  errorInForm: any;
  duplicateName = false;

  constructor(
    private service: DepartamentosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarDepartamentoComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.tipoModal = this.data.tipo;
    this.service.obtenerDepartamentos().subscribe(departamentos => this.departamentos = departamentos);

    if (this.tipoModal === TipoModal.consulta || this.tipoModal === TipoModal.actualizacion) {
      this.establecerModalDatos(this.data, this.tipoModal);
    } else {
      this.establecerModalVacio();
    }
  }

  private establecerModalDatos(data, tipoModal): void {
    const {departamento} = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.departamentoForm = this.formBuilder.group({
      id: [{value: departamento.idDepartamento, disabled}, null],
      nombre: [{value: departamento.nombre, disabled}, Validators.required],
      abreviatura: [{value: departamento.abreviatura, disabled}, Validators.required],
      estado: [{value: departamento.habilitado, disabled}, null],
    });
  }

  private establecerModalVacio(): void {
    this.departamentoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      abreviatura: ['', Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.departamentoForm.invalid;
    if (this.errorInForm || this.duplicateName) {
      this.departamentoForm.controls.nombre.markAsTouched();
      this.departamentoForm.controls.abreviatura.markAsTouched();
    } else {
      this.makeDTO();
    }
  }


  makeDTO(): void {
    this.departamento.nombre = this.departamentoForm.controls.nombre.value.trim().toUpperCase();
    this.departamento.abreviatura = this.departamentoForm.controls.abreviatura.value.trim().toUpperCase();
    if (this.tipoModal === TipoModal.actualizacion) {
      this.departamento.idDepartamento = this.departamentoForm.controls.id.value;
      this.departamento.habilitado = this.departamentoForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.service.guardar(this.departamento).subscribe((data) => {
      this.msgSnack('Guardado con éxito');
    }, error => {
      this.openSnackBar(error);
    });
  }

  update(): void {
    this.service.actualizar(this.departamento).subscribe((data) => {
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
