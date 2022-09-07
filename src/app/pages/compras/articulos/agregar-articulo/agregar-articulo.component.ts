import { PedidosService } from '@service/pedidos.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcasService } from '@service/marcas.service';
import { SubRubroService } from '@service/sub-rubro.service';
import { RubrosService } from '@service/rubros.service';
import { UnidadMedidaService } from '@service/unidad-medida.service';
import { ProveedoresService } from '@service/proveedores.service';
import { ArticulosService } from '@service/articulos.service';
import {TipoModal} from '@shared/models/tipo-modal.enum';
import {ArticuloRest} from '@models/articulo-rest';
import {SnackConfirmComponent} from '@shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.css'],
})
export class AgregarArticuloComponent implements OnInit {
  titulo: string;
  tipoModal: TipoModal;
  articulo: ArticuloRest = new ArticuloRest();
  articuloForm: FormGroup;
  submitted: boolean;
  errorInForm: any;

  constructor(
    private readonly articuloService: ArticulosService,
    private serviceCompra: PedidosService,
    private subRubroService: SubRubroService,
    private marcaService: MarcasService,
    private rubroService: RubrosService,
    private unidadMedidaService: UnidadMedidaService,
    private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.tipoModal = this.data.tipo;

    if (this.tipoModal === TipoModal.consulta || this.tipoModal === TipoModal.actualizacion) {
      this.establecerModalDatos(this.data, this.tipoModal);
    } else {
      this.establecerModalVacio();
    }
  }

  private establecerModalDatos(data: any, tipoModal: any): void {
    const { articulo }: {articulo: ArticuloRest} = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.articuloForm = this.formBuilder.group({
      id: [{value: articulo.id}, null],
      codigo: [{ value: articulo.codigoArt, disabled }, Validators.required],
      nombre: [{ value: articulo.nombre, disabled }, Validators.required],
      abreviatura: [{ value: articulo.abreviatura, disabled }, Validators.required],
      stockMin: [{ value: articulo.stockMin, disabled }, null],
      stockMax: [{ value: articulo.stockMax, disabled }, null],
      estado: [{value: articulo.habilitado, disabled}, null],
      unidadMedidaId: [{ value: articulo.idUnidadMedida, disabled }, Validators.required],
      rubroId: [{ value: articulo.idRubro, disabled }, Validators.required],
      subRubroId: [{ value: articulo.idSubRubro, disabled }, null],
      marcaId: [{ value: articulo.idMarca, disabled }, null],
      proveedorId: [{ value: articulo.idProveedor, disabled }, Validators.required],
      costo: [{ value: articulo.costo, disabled }, Validators.required],
      precio: [{ value: articulo.precio, disabled }, Validators.required],
    });
  }

  private establecerModalVacio(): void{
    this.articuloForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      abreviatura: ['', Validators.required],
      stockMin: ['', null],
      stockMax: ['', null],
      unidadMedidaId: ['', Validators.required],
      rubroId: ['', Validators.required],
      subRubroId: ['', null],
      marcaId: ['', null],
      proveedorId: ['', Validators.required],
      costo: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.articuloForm.invalid;

    if ( this.errorInForm ) {
      this.articuloForm.controls.codigo.markAsTouched();
      this.articuloForm.controls.nombre.markAsTouched();
      this.articuloForm.controls.abreviatura.markAsTouched();
      this.articuloForm.controls.stockMin.markAsTouched();
      this.articuloForm.controls.stockMax.markAsTouched();
      this.articuloForm.controls.unidadMedidaId.markAsTouched();
      this.articuloForm.controls.rubroId.markAsTouched();
      this.articuloForm.controls.subRubroId.markAsTouched();
      this.articuloForm.controls.marcaId.markAsTouched();
      this.articuloForm.controls.proveedorId.markAsTouched();
      this.articuloForm.controls.costo.markAsTouched();
      this.articuloForm.controls.precio.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    this.articulo.codigoArt =  this.articuloForm.controls.codigo.value.trim();
    this.articulo.nombre =  this.articuloForm.controls.nombre.value.trim();
    this.articulo.abreviatura =  this.articuloForm.controls.abreviatura.value.trim();
    this.articulo.stockMin =  this.articuloForm.controls.stockMin.value;
    this.articulo.stockMax =  this.articuloForm.controls.stockMax.value;
    this.articulo.idUnidadMedida =  this.articuloForm.controls.unidadMedidaId.value;
    this.articulo.idRubro =  this.articuloForm.controls.rubroId.value;
    this.articulo.idSubRubro =  this.articuloForm.controls.subRubroId.value;
    this.articulo.idMarca =  this.articuloForm.controls.marcaId.value;
    this.articulo.idProveedor =  this.articuloForm.controls.proveedorId.value;
    this.articulo.costo =  this.articuloForm.controls.costo.value;
    this.articulo.precio =  this.articuloForm.controls.precio.value;

    if (this.tipoModal === TipoModal.actualizacion) {
      this.articulo.id = this.articuloForm.controls.id.value.value;
      this.articulo.habilitado = this.articuloForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.articuloService.guardar(this.articulo).subscribe((data) => {
      this.msgSnack('Guardado con éxito');
    }, ({error}) => {
      this.openSnackBar(error);
    });
  }

  update(): void {
    this.articuloService.actualizar(this.articulo).subscribe((data) => {
      this.msgSnack('Actualizado con éxito');
    }, ({error}) => {
      this.openSnackBar(error);
    });
  }

  closeForm(): void {
    this.dialogRef.close();
  }

  msgSnack(msg: string): void {
    this.dialogRef.close(msg);
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

  establecerUnidad(unidadMedidaId: number): void {
      this.articuloForm.patchValue({ unidadMedidaId});
  }

  establecerRubro(rubroId: number): void {
    this.articuloForm.patchValue({rubroId});
  }

  establecerSubRubro(subRubroId: number): void {
    this.articuloForm.patchValue({subRubroId});
  }

  establecerMarca(marcaId: number): void {
    this.articuloForm.patchValue({marcaId});
  }

  establecerProveedor(proveedorId: number): void {
    this.articuloForm.patchValue({proveedorId});
  }
}
