import {SubRubroDTO} from '../../../models/SubRubroDTO';
import {Rubro} from '../../../models/Rubro';
import {SubRubro} from '../../../models/SubRubro';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SubRubroService} from 'src/app/service/sub-rubro.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RubrosService} from '../../../service/rubros.service';

@Component({
  selector: 'app-agregar-sub-rubro',
  templateUrl: './agregar-sub-rubro.component.html',
  styleUrls: ['./agregar-sub-rubro.component.css']
})
export class AgregarSubRubroComponent implements OnInit {
  subRubroDTO: SubRubroDTO = new SubRubroDTO();
  subRubros: SubRubroDTO[] = null;
  rubros: Rubro[] = null;
  rubroSelected: string = null;
  subRubroForm: FormGroup;
  submitted = false;
  errorInForm = false;
  updating = false;
  consulting = false;
  nombreRepe = false;

  constructor(
    private subRubroService: SubRubroService,
    private rubroService: RubrosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarSubRubroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.rubroService.listarRubrosHabilitados().subscribe(datas =>
      this.rubros = datas.data);
    this.subRubroService.listarSubRubrosTodos().subscribe(resp =>
      this.subRubros = resp.data);

    const {newSubRubro} = this.data;

    if (newSubRubro) {
      this.rubroSelected = newSubRubro.rubroId.nombre;
      this.consulting = this.data.consulting;

      this.subRubroForm = this.formBuilder.group({
        id: [{value: newSubRubro.id, disabled: this.consulting}, null],
        nombre: [{value: newSubRubro.nombre, disabled: this.consulting}, Validators.required],
        descripcion: [{value: newSubRubro.descripcion, disabled: this.consulting}, null],
        rubroId: [{value: newSubRubro.rubroId, disabled: this.consulting}, Validators.required]
      });
      this.updating = !this.consulting;
    } else {
      this.subRubroForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        descripcion: ['', null],
        rubroId: ['', Validators.required]
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
    this.errorInForm = this.submitted && this.subRubroForm.invalid;

    if (this.errorInForm || this.nombreRepe) {
      this.subRubroForm.controls.nombre.markAsTouched();
      this.subRubroForm.controls.rubroId.markAsTouched();
      console.log('Error en los datos');
    } else {
      this.makeDTO();

    }
  }

  // tslint:disable-next-line: typedef
  makeDTO() {
    this.subRubroDTO.nombre = this.subRubroForm.controls.nombre.value;
    this.subRubroDTO.descripcion = this.subRubroForm.controls.descripcion.value;
    // this.subRubroDTO.rubroId = this.subRubroForm.controls.rubroId.i.value;
    if (this.rubroSelected !== null) {
      this.rubros.forEach(rub => {
        if (this.rubroSelected.toLowerCase() === rub.nombre.toLowerCase()) {
          this.subRubroDTO.rubroId = rub.id;
        }
      });
    }
    if (this.updating) {
      this.subRubroDTO.id = this.subRubroForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }

  // tslint:disable-next-line: typedef
  update() {
    this.subRubroService.actualizarSubRubro(this.subRubroDTO).subscribe(data => {
      this.subRubroDTO = data.data;
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line: typedef
  save() {
    this.subRubroService.guardarSubRubro(this.subRubroDTO).subscribe(data => {
      this.subRubroDTO = data.data;
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line: typedef
  validar({target}) {
    const {value: nombre} = target;
    const finded = this.subRubros.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
  }
}