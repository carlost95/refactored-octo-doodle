import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Direccion } from '../../../../models/Direccion';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgregarDireccionComponent } from '../agregar-direccion/agregar-direccion.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistritoService } from '../../../../service/distrito.service';
import { DireccionesService } from '../../../../service/direcciones.service';
import { DistritoRest } from '../../../../models/distrito-rest';
import { TipoModal } from '@shared/models/tipo-modal.enum';
import { direccion } from '../../../../../environments/global-route';

@Component({
  selector: 'app-crear-direccion',
  templateUrl: './crear-direccion.component.html',
  styleUrls: ['./crear-direccion.component.scss']
})
export class CrearDireccionComponent implements OnInit {

  direccion: Direccion = new Direccion();
  direccionForm: FormGroup;
  distritos: DistritoRest[] = [];
  consultar: boolean;
  updating: boolean;

  titulo: string;
  tipoModal: TipoModal;
  idCliente: number;

  constructor(
    public dialogRef: MatDialogRef<AgregarDireccionComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private distritoService: DistritoService,
    private direccionService: DireccionesService,
    private elementRef: ElementRef

  ) { }

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.tipoModal = this.data.tipoModal;
    this.idCliente = this.data.idCliente;

    console.log('titulo de modal', this.titulo);
    console.log('id cliente', this.idCliente);

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
    console.log('direccion', direccion);

    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.direccionForm = this.formBuilder.group({
      idDireccion: [{ value: direccion.idDireccion, disabled }, null],
      calle: [{ value: direccion.calle, disabled }, Validators.required],
      numeroCalle: [{ value: direccion.numeroCalle, disabled }, Validators.required],
      entreCalle: [{ value: direccion.entreCalle, disabled }, null],
      barrio: [{ value: direccion.barrio, disabled }, null],
      descripcion: [{ value: direccion.descripcion, disabled }, null],
      ubicacion: [{ value: direccion.ubicacion, disabled }, Validators.required],
      idDistrito: [{ value: direccion.idDistrito, disabled }, Validators.required],
    });
    return;
  }
  establecerModalVacio(): void {
    this.direccionForm = this.formBuilder.group({
      calle: ['', Validators.required],
      numeroCalle: ['', Validators.required],
      entreCalle: ['', null],
      barrio: ['', null],
      descripcion: ['', null],
      ubicacion: ['', Validators.required],
      idDistrito: ['', Validators.required],
    });

  }
  close(): void {
    this.dialogRef.close();
  }
  // initForm(data: any): void {
  // const { direccion, cliente } = this.data;

  // if (direccion) {
  //   this.consultar = this.data.consultar;
  //   this.direccionForm = this.formBuilder.group({
  //     idDireccion: [direccion.id, null],
  //     calle: [
  //       { value: direccion.calle, disabled: this.consultar },
  //       Validators.required,
  //     ],
  //     numeroCalle: [{ value: direccion.numeroCalle, disabled: this.consultar }, Validators.required],
  //     entreCalle: [{ value: direccion.entreCalle, disabled: this.consultar }, Validators.required],
  //     barrio: [{ value: direccion.barrio, disabled: this.consultar }, Validators.required],
  //     descripcion: [{ value: direccion.descripcion, disabled: this.consultar }, null],

  //     distrito: [{ value: direccion.distritoId, disabled: this.consultar },
  //     Validators.required,
  //     ],
  //     estado: [{ value: direccion.estado, disabled: this.consultar }, null],
  //     cliente: [cliente, null],
  //   });
  // this.setPosition(direccion.ubicacion);
  //   this.updating = !this.consultar;
  // } else {
  //   this.direccionForm = this.formBuilder.group({
  //     calle: ['', Validators.required],
  //     distrito: ['', Validators.required],
  //     descripcion: ['', null],
  //     numerocalle: ['', Validators.required],
  //     cliente: [cliente, null],
  //   });
  // const ubicacion = new Ubicacion();
  // ubicacion.lat = -29.164942382332168;
  // ubicacion.lng = -67.49530922355653;
  // this.setPosition(ubicacion);
  // }
  // this.showMarker = true;
  // }

}
