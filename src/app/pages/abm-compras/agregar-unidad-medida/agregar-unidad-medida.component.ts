import {UnidadMedida} from '@models/UnidadMedida';
import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UnidadMedidaService} from '@app/service/unidad-medida.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-unidad-medida',
  templateUrl: './agregar-unidad-medida.component.html',
  styleUrls: ['./agregar-unidad-medida.component.css']
})
export class AgregarUnidadMedidaComponent implements OnInit {

  unidadMedida: UnidadMedida = new UnidadMedida();
  unidadMedidaForm: FormGroup;
  unidadMedidas: UnidadMedida[] = [];
  errorInForm = false;
  submitted = false;
  nombreRepe = false;
  abrevRepe = false;
  updating = false;
  consulting = false;


  constructor(
    private unididadMedidaService: UnidadMedidaService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarUnidadMedidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.unididadMedidaService.listarUnidadMedidaTodos().subscribe(resp =>
      this.unidadMedidas = resp.data);
    const {unidMed} = this.data;
    if (unidMed) {
      this.consulting = this.data.consulting;

      this.unidadMedidaForm = this.formBuilder.group({
        id: [{value: unidMed.id, disabled: this.consulting}, null],
        nombre: [{value: unidMed.nombre, disabled: this.consulting}, Validators.required],
        abreviatura: [{value: unidMed.abreviatura, disabled: this.consulting}, Validators.required]
      });
      this.updating = !this.consulting;
    } else {
      this.unidadMedidaForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        abreviatura: ['', Validators.required]
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.unidadMedidaForm.invalid;
    if (this.errorInForm || this.nombreRepe || this.abrevRepe) {
      this.unidadMedidaForm.controls.nombre.markAsTouched();
      this.unidadMedidaForm.controls.abreviatura.markAsTouched();
      console.log('Error en los datos');
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    this.unidadMedida.nombre = this.unidadMedidaForm.controls.nombre.value.trim().toUpperCase();
    this.unidadMedida.abreviatura = this.unidadMedidaForm.controls.abreviatura.value.trim().toUpperCase();
    if (this.updating) {
      this.unidadMedida.id = this.unidadMedidaForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }

  private save(): void {
    this.unididadMedidaService.guardarUnidadMedida(this.unidadMedida).subscribe(data => {
      this.msgSnack(data);
    });
  }

  private update(): void {
    this.unididadMedidaService.actualizarUnidadMedida(this.unidadMedida).subscribe(data => {
      this.msgSnack(data);
    });
  }

  public validar({target}): void {
    const {value: nombre} = target;
    const finded = this.unidadMedidas.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    const finded1 = this.unidadMedidas.find(p => p.abreviatura.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
    this.abrevRepe = (finded1 !== undefined) ? true : false;
  }

  close(): void {
    this.dialogRef.close();
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
