import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Direccion} from "../../../../models/Direccion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DistritoService} from "../../../../service/distrito.service";
import {Distrito} from "../../../../models/Distrito";
import {DireccionesService} from "../../../../service/direcciones.service";
import {MapMarker} from "@angular/google-maps";
import {Ubicacion} from "../../../../models/Ubicacion";
import LatLng = google.maps.LatLng;

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.component.html',
  styleUrls: ['./agregar-direccion.component.scss']
})
export class AgregarDireccionComponent implements OnInit {

  // Apunta al componente marker que aparece en el html
  @ViewChild(MapMarker) marker: google.maps.Marker = new google.maps.Marker();
  direccion: Direccion = new Direccion();
  consultar: boolean;
  updating: boolean;
  direccionForm: FormGroup;
  distritos: Distrito[] = []
  submitted: boolean;
  errorInForm: any;

  mapTypeId = 'hybrid';
  position: LatLng;
  lastPosition: LatLng;
  label = {
    color: 'black',
    text: 'ubicacion'
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: true
  };

  init = true;
  showMarker = false;

  constructor(
    public dialogRef: MatDialogRef<AgregarDireccionComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private distritoService: DistritoService,
    private direccionService: DireccionesService,
    private _elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.distritoService.listarDistritosHabilitados().subscribe(res => {
      this.distritos = res.data;
      this.initForm(res.data);
    });
  }


  initForm(data: any) {
    const {direccion, cliente} = this.data;

    if (direccion) {
      this.consultar = this.data.consultar;
      this.direccionForm = this.formBuilder.group({
        id: [direccion.id, null],
        calle: [{value: direccion.calle, disabled: this.consultar}, Validators.required],
        distrito: [{value: direccion.distritoId, disabled: this.consultar}, Validators.required],
        descripcion: [{value: direccion.descripcion, disabled: this.consultar}, null],
        numerocalle: [{value: direccion.numerocalle, disabled: this.consultar}, Validators.required],
        estado: [{value: direccion.estado, disabled: this.consultar}, null],
        cliente: [cliente, null]
      });
      this.setPosition(direccion.ubicacion);
      this.updating = !this.consultar;
    } else {
      this.direccionForm = this.formBuilder.group({
        calle: ['', Validators.required],
        distrito: ['', Validators.required],
        descripcion: ['', null],
        numerocalle: ['', Validators.required],
        cliente: [cliente, null]
      })
      const ubicacion = new Ubicacion();
      ubicacion.lat = -29.164942382332168;
      ubicacion.lng = -67.49530922355653;
      this.setPosition(ubicacion);
    }
    this.showMarker = true;
  }


  setPosition(ubicacion: Ubicacion) {
    console.log(ubicacion);
    this.position = new LatLng(ubicacion.lat, ubicacion.lng);
    this.lastPosition = new LatLng(ubicacion.lat, ubicacion.lng);
    console.log(this.lastPosition)
  }

  close() {
    this.data.save = false;
    this.dialogRef.close(false);
  }

  onSubmit() {
    console.log(this.direccionForm.controls);
    this.submitted = true;
    this.errorInForm = this.submitted && this.direccionForm.invalid;
    console.log(this.errorInForm ? 'True' : 'false')
    console.log(this.lastPosition)
    if (this.errorInForm) {
      this.direccionForm.controls.calle.markAsTouched();
      this.direccionForm.controls.distrito.markAsTouched();
      this.direccionForm.controls.numerocalle.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO() {
    console.log(this.direccionForm.controls.calle.value)
    this.direccion.calle = this.direccionForm.controls.calle.value;
    this.direccion.numerocalle = this.direccionForm.controls.numerocalle.value;
    this.direccion.descripcion = (this.direccionForm.controls.descripcion.value).trim();
    this.direccion.distritoId = this.direccionForm.controls.distrito.value;
    this.direccion.clienteId = this.direccionForm.controls.cliente.value;
    const ubicacion = new Ubicacion();
    ubicacion.lng = this.lastPosition.lng();
    ubicacion.lat = this.lastPosition.lat();
    this.direccion.ubicacion = ubicacion;

    if (this.updating) {
      this.direccion.id = this.direccionForm.controls.id.value;
      this.direccion.estado = this.direccionForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  private update() {
    console.log(this.direccion)
    console.log(this.direccion.ubicacion)
    this.direccionService.update(this.direccion).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }

  private save() {
    console.log(this.direccion)
    this.direccionService.save(this.direccion).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }

  showMap() {
    this.submitted = true;
    this.errorInForm = this.submitted && this.direccionForm.invalid;
    if (this.errorInForm) {
      this.direccionForm.controls.calle.markAsTouched();
      this.direccionForm.controls.distrito.markAsTouched();
      this.direccionForm.controls.numerocalle.markAsTouched();
    } else {
      this.init = false;
    }
    console.log(this.lastPosition);
    console.log(this.lastPosition.lat());
    console.log(this.lastPosition.lng());
  }

  prevMap() {
    this.init = true;
    this.position = this.lastPosition;
  }


  getCurrentPosition() {
    this.lastPosition = this.marker ? this.marker.getPosition() : this.lastPosition;
  }

}
