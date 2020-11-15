import {Rubro} from '../../../models/Rubro';
import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RubrosService} from '../../../service/rubros.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
  consulting = false;
  nombreRepe = false;

  constructor(
    private rubroService: RubrosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarRubroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.rubroService.listarRubrosTodos().subscribe(resp => this.rubros = resp.data);
    const {newRubro} = this.data;

    if (newRubro) {
      this.consulting = this.data.consulting;
      this.rubroForm = this.formBuilder.group({
        id: [{value: newRubro.id, disabled: this.consulting}, null],
        nombre: [{value: newRubro.nombre, disabled: this.consulting}, Validators.required],
        descripcion: [{value: newRubro.descripcion, disabled: this.consulting}, null]
      });
      this.updating = !this.consulting;
    } else {
      this.rubroForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        descripcion: ['', null]
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.rubroForm.invalid;

    if (this.errorInForm || this.nombreRepe) {
      this.rubroForm.controls.nombre.markAsTouched();
      console.log('Error en los datos');
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    this.rubro.nombre = this.rubroForm.controls.nombre.value.toUpperCase();
    this.rubro.descripcion = this.rubroForm.controls.descripcion.value.toUpperCase();
    if (this.updating) {
      this.rubro.id = this.rubroForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.rubroService.guardarRubro(this.rubro).subscribe(data => {
      this.msgSnack(data);
    });
  }

  private update(): void {
    this.rubroService.actualizarRubro(this.rubro).subscribe(data => {
      this.msgSnack(data);
    });
  }

  validar({target}): void {
    const {value: nombre} = target;
    const finded = this.rubros.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
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
