import { SubRubroDTO } from './../../modelo/SubRubroDTO';
import { Rubro } from './../../modelo/Rubro';
import { SubRubro } from './../../modelo/SubRubro';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubRubroService } from 'src/app/service/sub-rubro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RubrosService } from '../../service/rubros.service';

@Component({
  selector: 'app-agregar-sub-rubro',
  templateUrl: './agregar-sub-rubro.component.html',
  styleUrls: ['./agregar-sub-rubro.component.css']
})
export class AgregarSubRubroComponent implements OnInit {
  subRubroDTO: SubRubroDTO = new SubRubroDTO();
  subRubro: SubRubro = new SubRubro();
  subRubros: SubRubroDTO[] = null;
  rubros: Rubro[] = null;
  rubroSelected: string = null;
  subRubroFilter: Rubro[] = null;
  subRubroForm: FormGroup;
  submitted = false;
  errorInForm = false;
  updating = false;
  nombreRepe = false;

  constructor(
    private subRubroService: SubRubroService,
    private rubroService: RubrosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarSubRubroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubRubro) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.rubroService.listarRubrosHabilitados().subscribe(datas =>
      this.rubros = datas.data);
    this.subRubroService.listarSubRubrosTodos().subscribe(resp =>
      this.subRubros = resp.data);
    if (this.data) {
      this.rubroSelected = this.data.rubroId.nombre;

      this.subRubroForm = this.formBuilder.group({
        id: [this.data.id, null],
        nombre: [this.data.nombre, Validators.required],
        descripcion: [this.data.descripcion, null],
        rubroId: [this.data.rubroId, Validators.required]
      });
      this.updating = true;
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
    console.warn(this.rubroSelected);
    console.warn('------------------');
    console.warn(this.subRubroDTO);



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
  validar({ target }) {
    const { value: nombre } = target;
    const finded = this.subRubros.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
  }
}
