import {Departamento} from '../../../../models/Departamento';
import {Distrito} from '../../../../models/Distrito';
import {Component, Inject, OnInit} from '@angular/core';
import {DistritoService} from '../../../../service/distrito.service';
import {DepartamentosService} from '../../../../service/departamentos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-distrito',
  templateUrl: './agregar-distrito.component.html',
  styleUrls: ['./agregar-distrito.component.css']
})
export class AgregarDistritoComponent implements OnInit {

  distritoForm: FormGroup;
  distrito: Distrito = new Distrito();
  distritos: Distrito[] = [];
  departamentos: Departamento[] = [];
  consultar: boolean = false;
  updating: boolean = false;
  show = false;
  duplicateName = false;
  submitted = false;
  errorInForm: boolean = false;

  constructor(
    private distritoService: DistritoService,
    private departamentoService: DepartamentosService,
    public dialogRef: MatDialogRef<AgregarDistritoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.departamentoService.getActive().subscribe(resp => {
      this.departamentos = resp.data;
      this.initForm();
    });
  }

  initForm(): void {
    const {distrito} = this.data;
    this.distritos = this.data.distritos;
    if (distrito) {
      this.consultar = this.data.consultar;
      this.distritoForm = this.formBuilder.group({
        id: [distrito.id, null],
        nombre: [{value: distrito.nombre, disabled: this.consultar}, Validators.required],
        abreviatura: [{value: distrito.abreviatura, disabled: this.consultar}, Validators.required],
        departamento: [{value: distrito.departamento, disabled: this.consultar}, Validators.required],
        estado: [{value: distrito.estado, disabled: this.consultar}, null],
      });
      this.updating = !this.consultar;
    } else {
      this.distritoForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        abreviatura: ['', null],
        departamento: ['', Validators.required],
      });
    }
    this.show = true;
  }

  validate({target}): void {
    const {value: nombre} = target;
    const exist = this.distritos.find(d => d.nombre === nombre);
    this.duplicateName = exist ? true : false;
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.duplicateName;
    if (this.errorInForm || this.duplicateName) {
      this.distritoForm.controls.nombre.markAsTouched();
      this.distritoForm.controls.departamento.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  private makeDTO(): void {
    const data = this.distritoForm.controls;
    this.distrito.nombre = data.nombre.value.trim().toUpperCase();
    this.distrito.abreviatura = data.abreviatura.value.trim().toUpperCase();
    const departamento = this.departamentos.find(d => d.id === data.departamento.value);
    this.distrito.departamento = departamento;
    if (this.updating) {
      this.distrito.id = data.id.value;
      this.distrito.estado = data.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  private update(): void {
    this.distritoService.update(this.distrito).subscribe(data => {
      this.dialogRef.close(data.msg);
    });
  }

  private save(): void {
    this.distritoService.save(this.distrito).subscribe(data => {
      this.dialogRef.close(data.msg);
    });
  }
}

