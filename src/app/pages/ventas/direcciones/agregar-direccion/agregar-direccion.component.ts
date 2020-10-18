import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Direccion} from "../../../../modelo/Direccion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DistritoService} from "../../../../service/distrito.service";
import {Distrito} from "../../../../modelo/Distrito";
import {DireccionesService} from "../../../../service/direcciones.service";

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.component.html',
  styleUrls: ['./agregar-direccion.component.scss']
})
export class AgregarDireccionComponent implements OnInit {
  direccion: Direccion = new Direccion();
  consultar: boolean;
  updating: boolean = false;
  direccionForm: FormGroup;
  distritoSelect: any;
  distritos: Distrito[] = []
  submitted: boolean = false;
  errorInForm: any;


  constructor(
    public dialogRef: MatDialogRef<AgregarDireccionComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private distritoService: DistritoService,
    private direccionService: DireccionesService
  ) {
  }

  ngOnInit(): void {
    this.distritoService.listarDistritosHabilitados().subscribe(res =>{
      console.log(res)
      this.distritos = res.data
    })

    const { direccion, cliente } = this.data;

    if (direccion) {
      this.consultar = this.data.consultar;
      this.direccionForm = this.formBuilder.group({
        id: [direccion.id, null],
        calle: [{value: direccion.calle, disabled: this.consultar}, Validators.required],
        distrito: [{value: direccion.distrito, disabled: this.consultar},  Validators.required],
        descripcion: [{value: direccion.descripcion, disabled: this.consultar}, null],
        numerocalle: [{value: direccion.numerocalle, disabled: this.consultar}, Validators.required],
        estado: [{value: direccion.estado, disabled: this.consultar}, null],
        cliente: [cliente, null]
      });
      this.updating = !this.consultar;
    } else {
      this.direccionForm = this.formBuilder.group({
        calle: ['', Validators.required],
        distrito: ['',  Validators.required],
        descripcion: ['', null],
        numerocalle: ['', Validators.required],
        cliente: [cliente, null]
      })
    }
  }

  close() {
    this.data.save = false;
    this.dialogRef.close(false);
  }

  onSubmit() {
    console.log(this.direccionForm.controls);
    this.submitted = true;
    this.errorInForm = this.submitted && this.direccionForm.invalid;
    if (this.errorInForm) {
      this.direccionForm.controls.calle.markAsTouched();
      this.direccionForm.controls.distrito.markAsTouched();
      this.direccionForm.controls.numerocalle.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO() {
    this.direccion.calle = (this.direccionForm.controls.calle.value).trim();
    this.direccion.numerocalle = this.direccionForm.controls.numerocalle.value;
    this.direccion.descripcion = (this.direccionForm.controls.descripcion.value).trim();
    this.direccion.distritoId = this.direccionForm.controls.distrito.value;
    this.direccion.clienteId = this.direccionForm.controls.cliente.value;
    if (this.updating) {
      this.direccion.id = this.direccionForm.controls.id.value;
      this.direccion.estado = this.direccionForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  private update() {

  }

  private save() {
    this.direccionService.save(this.direccion).subscribe(resp => {
      console.log(resp);
    })
  }
}
