import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Direccion } from '../../../../models/Direccion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistritoService } from '../../../../service/distrito.service';
import { DireccionesService } from '../../../../service/direcciones.service';
import { MapMarker } from '@angular/google-maps';
import { Ubicacion } from '../../../../models/Ubicacion';
import { DistritoRest } from '../../../../models/distrito-rest';
import LatLng = google.maps.LatLng;

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.component.html',
  styleUrls: ['./agregar-direccion.component.scss'],
})
export class AgregarDireccionComponent implements OnInit {
  // Apunta al componente marker que aparece en el html
  @ViewChild(MapMarker) marker: google.maps.Marker = new google.maps.Marker();
  direccion: Direccion = new Direccion();
  consultar: boolean;
  updating: boolean;
  direccionForm: FormGroup;
  distritos: DistritoRest[] = [];
  submitted: boolean;
  errorInForm: any;

  position: LatLng;
  lastPosition: LatLng;
  label = {
    color: 'black',
    text: 'ubicacion',
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
  };

  init = true;
  showMarker = false;

  constructor(
    public dialogRef: MatDialogRef<AgregarDireccionComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private distritoService: DistritoService,
    private direccionService: DireccionesService,
    // tslint:disable-next-line:variable-name
    private _elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.distritoService.listarDistritosHabilitados().subscribe((res) => {
      this.distritos = res;
      this.initForm(res);
    });
  }

  initForm(data: any): void {
    const { direccion, cliente } = this.data;

    if (direccion) {
      this.consultar = this.data.consultar;
      this.direccionForm = this.formBuilder.group({
        id: [direccion.id, null],
        calle: [
          { value: direccion.calle, disabled: this.consultar },
          Validators.required,
        ],
        distrito: [
          { value: direccion.distritoId, disabled: this.consultar },
          Validators.required,
        ],
        descripcion: [
          { value: direccion.descripcion, disabled: this.consultar },
          null,
        ],
        numerocalle: [
          { value: direccion.numerocalle, disabled: this.consultar },
          Validators.required,
        ],
        estado: [{ value: direccion.estado, disabled: this.consultar }, null],
        cliente: [cliente, null],
      });
      this.setPosition(direccion.ubicacion);
      this.updating = !this.consultar;
    } else {
      this.direccionForm = this.formBuilder.group({
        calle: ['', Validators.required],
        distrito: ['', Validators.required],
        descripcion: ['', null],
        numerocalle: ['', Validators.required],
        cliente: [cliente, null],
      });
      const ubicacion = new Ubicacion();
      ubicacion.lat = -29.164942382332168;
      ubicacion.lng = -67.49530922355653;
      this.setPosition(ubicacion);
    }
    this.showMarker = true;
  }

  setPosition(ubicacion: Ubicacion): void {
    console.log(ubicacion);
    this.position = new LatLng(ubicacion.lat, ubicacion.lng);
    this.lastPosition = new LatLng(ubicacion.lat, ubicacion.lng);
    console.log(this.lastPosition);
  }

  close(): void {
    this.data.save = false;
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    console.log(this.direccionForm.controls);
    this.submitted = true;
    this.errorInForm = this.submitted && this.direccionForm.invalid;
    console.log(this.errorInForm ? 'True' : 'false');
    console.log(this.lastPosition);
    if (this.errorInForm) {
      this.direccionForm.controls.calle.markAsTouched();
      this.direccionForm.controls.distrito.markAsTouched();
      this.direccionForm.controls.numerocalle.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    console.log(this.direccionForm.controls.calle.value);
    this.direccion.calle = this.direccionForm.controls.calle.value;
    // this.direccion.numerocalle = this.direccionForm.controls.numerocalle.value;
    this.direccion.descripcion = (this.direccionForm.controls.descripcion.value).trim();
    // idDistrito = this.direccionForm.controls.distrito.value;
    // this.direccion.clienteId = this.direccionForm.controls.cliente.value;
    // const ubicacion = new Ubicacion();
    // ubicacion.lng = this.lastPosition.lng();
    // ubicacion.lat = this.lastPosition.lat();

    if (this.updating) {
      this.direccion.idDireccion = this.direccionForm.controls.id.value;
      this.direccion.status = this.direccionForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  private update(): void {
    console.log(this.direccion);
    this.direccionService.update(this.direccion).subscribe((resp) => {
      this.dialogRef.close(true);
    });
  }

  private save(): void {
    console.log(this.direccion);
    this.direccionService.save(this.direccion).subscribe((resp) => {
      this.dialogRef.close(true);
    });
  }

  showMap(): void {
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

  prevMap(): void {
    this.init = true;
    this.position = this.lastPosition;
  }

  getCurrentPosition(): void {
    this.lastPosition = this.marker
      ? this.marker.getPosition()
      : this.lastPosition;
  }
}
