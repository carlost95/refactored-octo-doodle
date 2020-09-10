import { AbmComprasService } from './../../service/abm-compras.service';
import { Rubro } from './../../modelo/Rubro';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RubrosService } from '../../service/rubros.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-rubro',
  templateUrl: './agregar-rubro.component.html',
  styleUrls: ['./agregar-rubro.component.css']
})
export class AgregarRubroComponent implements OnInit {

  rubro: Rubro = new Rubro();
  rubros: Rubro[] = [];
  rubroForm: FormGroup;
  errorInForm = false;
  submitted = false;
  updating = false;
  nombreRepe = false;

  constructor(
    private rubroService: RubrosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarRubroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rubro) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.rubroService.listarRubrosTodos().subscribe(resp => this.rubros = resp.data);
    if (this.data) {
      this.rubroForm = this.formBuilder.group({
        id: [this.data.id, null],
        nombre: [this.data.nombre, Validators.required],
        descripcion: [this.data.descripcion, null]
      });
      this.updating = true;
    } else {
      this.rubroForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        descripcion: ['', null]
      })
    }
  }
  // tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }
  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    this.errorInForm = this.submitted && this.rubroForm.invalid;
    if (this.errorInForm || this.nombreRepe) {
      this.rubroForm.controls.nombre.markAsTouched();
      console.log('Error en los datos')
    } else {
      this.makeDTO();

    }

  }
  // tslint:disable-next-line: typedef
  makeDTO() {
    this.rubro.nombre = this.rubroForm.controls.nombre.value;
    this.rubro.descripcion = this.rubroForm.controls.descripcion.value;
    if (this.updating) {
      this.rubro.id = this.rubroForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }
  // tslint:disable-next-line: typedef
  save() {
    this.rubroService.guardarRubro(this.rubro).subscribe(data => {
      this.rubro = data.data;
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line: typedef
  private update() {
    this.rubroService.actualizarRubro(this.rubro).subscribe(data => {
      this.rubro = data.data;
      this.dialogRef.close();
    });
  }
  // tslint:disable-next-line: typedef
  validar({ target }) {
    const { value: nombre } = target;
    const finded = this.rubros.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
  }
}
