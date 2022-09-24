import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { Direccion } from '../../../../models/Direccion';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistritoService } from '../../../../service/distrito.service';
import { DireccionesService } from '../../../../service/direcciones.service';
import { DistritoRest } from '../../../../models/distrito-rest';
import { TipoModal } from '@shared/models/tipo-modal.enum';
import { direccion } from '../../../../../environments/global-route';
import { PlaceService } from '@app/service/place.service';
import { Subscriber } from 'rxjs';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MapService } from '../../../../service/map.service';

@Component({
  selector: 'app-crear-direccion',
  templateUrl: './crear-direccion.component.html',
  styleUrls: ['./crear-direccion.component.scss']
})
export class CrearDireccionComponent implements OnInit {
  direccion: Direccion = new Direccion();
  direccionForm: FormGroup;
  distritos: DistritoRest[] = [];
  consulting: boolean;
  updating: boolean;

  titulo: string;
  tipoModal: TipoModal;
  idCliente: number;
  ubicationActual: [number, number];

  submitted: boolean;
  errorInForm: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearDireccionComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private direccionService: DireccionesService,
    private placeService: PlaceService,
  ) {

  }
  get isUserLocationReady() {
    return this.placeService.isUserLocationReady;
  }

  ngOnInit() {
    this.titulo = this.data.titulo;
    this.tipoModal = this.data.tipoModal;
    this.idCliente = this.data.idCliente;

    if (
      this.tipoModal === TipoModal.consulta ||
      this.tipoModal === TipoModal.actualizacion
    ) {
      this.establecerModalDatos(this.data, this.tipoModal);
    } else {
      this.establecerModalVacio();
    }
  }


  establecerModalDatos(data: any, tipoModal: TipoModal): void {
    const { direccion } = data;
    this.placeService.setLocation([direccion.longitud, direccion.latitud]);

    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.direccionForm = this.formBuilder.group({
      idDireccion: [{ value: direccion.idDireccion, disabled }, null],
      calle: [{ value: direccion.calle, disabled }, Validators.required],
      numeroCalle: [{ value: direccion.numeroCalle, disabled }, Validators.required],
      entreCalle: [{ value: direccion.entreCalle, disabled }, null],
      barrio: [{ value: direccion.barrio, disabled }, null],
      descripcion: [{ value: direccion.descripcion, disabled }, null],
      longitud: [{ value: direccion.longitud, disabled }, Validators.required],
      latitud: [{ value: direccion.latitud, disabled }, Validators.required],
      idDistrito: [{ value: direccion.idDistrito, disabled }, Validators.required],
      status: [{ value: direccion.status, disabled }, Validators.required],
    });
    this.updating = !TipoModal.consulta;
    return;
  }

  async establecerModalVacio() {
    await this.loadingLocation();
    this.direccionForm = this.formBuilder.group({
      calle: ['', Validators.required],
      numeroCalle: ['', Validators.required],
      entreCalle: ['', null],
      barrio: ['', null],
      descripcion: ['', null],
      longitud: [this.ubicationActual[0], Validators.required],
      latitud: [this.ubicationActual[1], Validators.required],
      idDistrito: ['', Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.direccionForm.invalid;

    if (this.errorInForm) {
      this.direccionForm.controls.calle.markAsTouched();
      this.direccionForm.controls.numeroCalle.markAsTouched();
      this.direccionForm.controls.idDistrito.markAsTouched();
    }
    else {
      this.makeDTO();
    }
  }
  makeDTO(): void {
    const { calle, numeroCalle, entreCalle, barrio, descripcion, longitud, latitud, idDistrito } = this.direccionForm.value;
    this.direccion.calle = calle.trim().toUpperCase();
    this.direccion.numeroCalle = numeroCalle;
    this.direccion.entreCalle = entreCalle.trim().toUpperCase();
    this.direccion.barrio = barrio.trim().toUpperCase();
    this.direccion.descripcion = descripcion.trim().toUpperCase();
    this.direccion.longitud = longitud;
    this.direccion.latitud = latitud;
    this.direccion.idDistrito = idDistrito;
    this.direccion.idCliente = this.idCliente;
    if (this.updating) {
      this.direccion.idDireccion = this.direccionForm.value.idDireccion;
      this.direccion.status = this.direccionForm.value.status;
      this.updateDireccion();
    }
    else {
      this.createDireccion();
    }
  }
  updateDireccion() {
    this.direccionService.updatedDirection(this.direccion).subscribe(
      (response) => {
        this.msgSnack('Dirección actualizada con exito')
      },
      (error) => { this.msgSnack('Error al actualizar dirección \n' + error) }
    )
  }
  createDireccion() {
    this.direccionService.saveDirection(this.direccion).subscribe(
      (response) => { this.msgSnack(response.calle + ' guardada con exito') },
      (error) => { this.msgSnack('Error  al guargar Direccion\n' + error) }
    );
  }
  async loadingLocation() {
    this.ubicationActual = await this.placeService.getUserLocation();
  }

  establecerLocation(ubicacion: [number, number]): void {
    this.direccionForm.patchValue({ longitud: ubicacion[0] });
    this.direccionForm.patchValue({ latitud: ubicacion[1] });
  }

  establecerDistrito(idDistrito: number): void {
    this.direccionForm.patchValue({ idDistrito: idDistrito });
  }
  msgSnack(data): void {
    this.dialogRef.close(data);
  }
}
