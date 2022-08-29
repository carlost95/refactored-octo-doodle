import {Component, Inject, OnInit} from '@angular/core';
import {DistritoService} from '../../../../service/distrito.service';
import {DepartamentosService} from '../../../../service/departamentos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TipoModal} from '@shared/models/tipo-modal.enum';
import {DistritoRest} from '@models/distrito-rest';
import {DepartamentoRest} from '@models/departamento-rest';

@Component({
  selector: 'app-agregar-distrito',
  templateUrl: './agregar-distrito.component.html',
  styleUrls: ['./agregar-distrito.component.css'],
})
export class AgregarDistritoComponent implements OnInit {
  titulo: string;
  tipoModal: TipoModal;
  distritos: DistritoRest[];

  distritoForm: FormGroup;
  departamentos: DepartamentoRest[] = [];
  submitted = false;
  errorInForm = false;
  show = false;

  constructor(
    private readonly distritoService: DistritoService,
    private readonly departamentoService: DepartamentosService,
    public dialogRef: MatDialogRef<AgregarDistritoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.tipoModal = this.data.tipo;

    this.departamentoService
      .obtenerDepartamentosHabilitados()
      .subscribe(departamentos => {
        this.departamentos = departamentos;
        if ( this.tipoModal === TipoModal.consulta || this.tipoModal === TipoModal.actualizacion) {
          this.establecerModalDatos(this.data, this.tipoModal);
        } else {
          this.establecerModalVacio();
        }
        this.show = true;

      });
  }

  private establecerModalDatos(data, tipoModal): void {
    const {distrito} = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.distritoForm = this.formBuilder.group({
      id: [{value: distrito.idDistrito}, null],
      nombre: [{ value: distrito.nombre, disabled}, Validators.required],
      abreviatura: [{ value: distrito.abreviatura, disabled}, Validators.required],
      departamento: [{ value: distrito.idDepartamento, disabled}, Validators.required],
      estado: [{ value: distrito.habilitado, disabled}, null],
    });
  }

  private establecerModalVacio(): void {
    this.distritoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      abreviatura: ['', null],
      departamento: ['', Validators.required],
    });
  }


  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.errorInForm) {
      this.distritoForm.controls.nombre.markAsTouched();
      this.distritoForm.controls.departamento.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  private makeDTO(): void {
    const distrito = new DistritoRest();
    const {id, nombre, abreviatura, departamento, estado } = this.distritoForm.controls;
    distrito.nombre = nombre.value.trim().toUpperCase();
    distrito.abreviatura = abreviatura.value.trim().toUpperCase();
    distrito.idDepartamento = departamento.value;
    if (this.tipoModal === TipoModal.actualizacion) {
      distrito.idDistrito = id.value.value;
      distrito.habilitado = estado.value;
      this.update(distrito);
    } else {
      this.save(distrito);
    }
  }

  private update(distrito: DistritoRest): void {
    this.distritoService.actualizar(distrito).subscribe((data) => {
      this.dialogRef.close('Actualizado con éxito');
    });
  }

  private save(distrito: DistritoRest): void {
    this.distritoService.guardar(distrito).subscribe(() => {
      this.dialogRef.close('Guardado con éxito');
    });
  }
}
