import {AbmComprasService} from './../../service/abm-compras.service';
import {Marca} from './../../modelo/Marca';
import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MarcasService} from '../../service/marcas.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-marca',
  templateUrl: './agregar-marca.component.html',
  styleUrls: ['./agregar-marca.component.css']
})
export class AgregarMarcaComponent implements OnInit {
  marca: Marca = new Marca();
  marcaForm: FormGroup;
  errorInForm = false;
  submitted = false;
  updating = false;
  consulting: false;
  nombreRepe = false;
  abreRepe = false;
  marcas: Marca[] = [];

  constructor(
    private marcaService: MarcasService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.marcaService.listarMarcaTodos().subscribe(resp => this.marcas = resp.data);

    const {mark} = this.data;
    if (mark) {
      this.consulting = this.data.consulting;
      this.marcaForm = this.formBuilder.group({
        id: [this.data.id, null],
        nombre: [{value: mark.nombre, disabled: this.consulting}, Validators.required],
        abreviatura: [{value: mark.abreviatura, disabled: this.consulting}, Validators.required]
      });
      this.updating = !this.consulting;
    } else {
      this.marcaForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        abreviatura: ['', Validators.required]
      });
    }
  }

  // tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    this.errorInForm = this.submitted && this.marcaForm.invalid;
    if (this.errorInForm || this.nombreRepe || this.abreRepe) {
      this.marcaForm.controls.nombre.markAsTouched();
      this.marcaForm.controls.abreviatura.markAsTouched();
      console.log('Error en los datos');
    } else {
      this.makeDTO();
    }
  }

  // tslint:disable-next-line: typedef
  makeDTO() {
    this.marca.nombre = this.marcaForm.controls.nombre.value;
    this.marca.abreviatura = this.marcaForm.controls.abreviatura.value;
    if (this.updating) {
      this.marca.id = this.marcaForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }

  // tslint:disable-next-line: typedef
  save() {
    this.marcaService.guardarMarca(this.marca).subscribe(data => {
      this.marca = data.data;
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line: typedef
  private update() {
    this.marcaService.actualizarMarca(this.marca).subscribe(data => {
      this.marca = data.data;
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line: typedef
  validarNombre({target}) {
    const {value: nombre} = target;
    const finded = this.marcas.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
  }

  // tslint:disable-next-line: typedef
  validarAbreviatura({target}) {
    const {value: nombre} = target;
    const finded = this.marcas.find(p => p.abreviatura.toLowerCase() === nombre.toLowerCase());
    this.abreRepe = (finded !== undefined) ? true : false;
  }
}
