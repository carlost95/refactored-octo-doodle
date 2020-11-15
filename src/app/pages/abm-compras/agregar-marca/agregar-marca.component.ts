import {Marca} from '../../../models/Marca';
import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MarcasService} from '../../../service/marcas.service';
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

  ngOnInit(): void {
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

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
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

  makeDTO(): void {
    this.marca.nombre = this.marcaForm.controls.nombre.value.toUpperCase();
    this.marca.abreviatura = this.marcaForm.controls.abreviatura.value.toUpperCase();
    if (this.updating) {
      this.marca.id = this.marcaForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.marcaService.guardarMarca(this.marca).subscribe(data => {
      this.msgSnack(data);
    });
  }

  private update(): void {
    this.marcaService.actualizarMarca(this.marca).subscribe(data => {
      this.msgSnack(data);
    });
  }

  validarNombre({target}): void {
    const {value: nombre} = target;
    const finded = this.marcas.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
  }

  validarAbreviatura({target}): void {
    const {value: nombre} = target;
    const finded = this.marcas.find(p => p.abreviatura.toLowerCase() === nombre.toLowerCase());
    this.abreRepe = (finded !== undefined) ? true : false;
  }

  msgSnack(data): void {
    const {msg} = data;
    if (data.code === 200) {
      this.dialogRef.close(msg);
    } else {
      this.dialogRef.close('Error en el proceso');
    }
  }
}
