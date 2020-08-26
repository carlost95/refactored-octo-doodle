import { AbmComprasService } from './../../service/abm-compras.service';
import { Marca } from './../../modelo/Marca';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcasService } from '../../service/marcas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-marca',
  templateUrl: './agregar-marca.component.html',
  styleUrls: ['./agregar-marca.component.css']
})
export class AgregarMarcaComponent implements OnInit {
  marca: Marca = new Marca();
  marcaForm: FormGroup;
  errorInForm: boolean = false;
  submitted = false;
  updating = false;

  constructor(private marcaService: MarcasService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marca) { }

  ngOnInit() {
    if (this.data) {
      this.marcaForm = this.formBuilder.group({
        id: [this.data.id, null],
        nombre: [this.data.nombre, Validators.required],
        abreviatura: [this.data.abreviatura, Validators.required]
      })
      this.updating = true;
    } else {
      this.marcaForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        abreviatura: ['', null]
      })
    }
  }
  // tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    this.errorInForm = this.submitted && this.marcaForm.invalid;
    this.submitted = true;
    if (this.errorInForm) {
      console.log('Error en los datos')
    } else {
      this.makeDTO();
      console.log(this.marcaForm.controls.nombre.value)
      console.log(this.marcaForm.controls.abreviatura.value)
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

  // guardarMarca(marca: Marca) {
  //   console.log(marca);

  //   // this.marca.id = null;
  //   this.marca.nombre = this.marca.nombre.toUpperCase();
  //   this.marca.abreviatura = this.marca.abreviatura.toUpperCase();


  //   this.serviceAbmCompra.guardarMarca(this.marca).subscribe(data => {
  //     this.marca = data;
  //     alert("se guardo una nueva marca");
  //     window.history.back();
  //   });
  // }
  // cancelar() {
  //   window.history.back();
  // }

}
