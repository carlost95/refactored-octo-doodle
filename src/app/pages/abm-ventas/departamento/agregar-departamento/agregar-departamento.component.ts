import { Departamento } from '../../../../models/Departamento';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { DepartamentosService } from '../../../../service/departamentos.service';

@Component({
  selector: 'app-agregar-departamento',
  templateUrl: './agregar-departamento.component.html',
  styleUrls: ['./agregar-departamento.component.css'],
})
export class AgregarDepartamentoComponent implements OnInit {
  departamento: Departamento = new Departamento();
  response: Response;
  consultar = false;
  departamentoForm: any;
  updating = false;
  submitted: boolean;
  errorInForm: any;
  duplicateName = false;

  constructor(
    private service: DepartamentosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarDepartamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const { departamento } = this.data;
    if (departamento) {
      this.consultar = this.data.consulting;
      this.departamentoForm = this.formBuilder.group({
        id: [
          { value: departamento.id, disabled: this.consultar },
          Validators.required,
        ],
        nombre: [
          { value: departamento.nombre, disabled: this.consultar },
          Validators.required,
        ],
        abreviatura: [
          { value: departamento.abreviatura, disabled: this.consultar },
          Validators.required,
        ],
        estado: [
          { value: departamento.estado, disabled: this.consultar },
          null,
        ],
      });
      this.updating = !this.consultar;
    } else {
      this.departamentoForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        abreviatura: ['', Validators.required],
      });
    }
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

  validate({ target }): void {
    const { departamentos } = this.data;
    const { value: nombre } = target;
    const finded = departamentos.find((d) => nombre === d.nombre);
    this.duplicateName = finded ? true : false;
  }

  makeDTO(): void {
    this.departamento.nombre = this.departamentoForm.controls.nombre.value
      .trim()
      .toUpperCase();
    this.departamento.abreviatura =
      this.departamentoForm.controls.abreviatura.value.trim().toUpperCase();
    if (this.updating) {
      this.departamento.idDepartamento =
        this.departamentoForm.controls.id.value;
      this.departamento.estado = this.departamentoForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.service.save(this.departamento).subscribe((data) => {
      this.msgSnack(data);
    });
  }

  update(): void {
    this.service.update(this.departamento).subscribe((data) => {
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
}
