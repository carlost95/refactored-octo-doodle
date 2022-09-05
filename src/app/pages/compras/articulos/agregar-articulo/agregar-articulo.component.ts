import { SubRubro } from '@models/SubRubro';
import { Proveedor } from '@models/Proveedor';
import { Marca } from '@models/Marca';
import { Rubro } from '@models/Rubro';
import { PedidosService } from '@service/pedidos.service';
import { UnidadMedida } from '@models/UnidadMedida';
import { ArticuloDTO } from '@models/ArticuloDTO';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AgregarMarcaComponent } from '../../../abm-compras/marca/agregar-marca/agregar-marca.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcasService } from '@service/marcas.service';
import { SubRubroService } from '@service/sub-rubro.service';
import { RubrosService } from '@service/rubros.service';
import { UnidadMedidaService } from '@service/unidad-medida.service';
import { AgregarRubroComponent } from '../../../abm-compras/rubros/agregar-rubro/agregar-rubro.component';
import { AgregarProveedorComponent } from '../../proveedores/agregar-proveedor/agregar-proveedor.component';
import { ProveedoresService } from '@service/proveedores.service';
import { AgregarSubRubroComponent } from '../../../abm-compras/sub-rubro/agregar-sub-rubro/agregar-sub-rubro.component';
import { AgregarUnidadMedidaComponent } from '../../../abm-compras/unidad-medida/agregar-unidad-medida/agregar-unidad-medida.component';
import { ArticulosService } from '@service/articulos.service';
import {TipoModal} from '../../../../shared/models/tipo-modal.enum';
import {ArticuloRest} from '@models/articulo-rest';


@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.css'],
})
export class AgregarArticuloComponent implements OnInit {
  titulo: string;
  tipoModal: TipoModal;
  articulo: ArticuloRest;
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
    @Inject(MAT_DIALOG_DATA) public data: any
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
    const { articulo }: {articulo: ArticuloRest} = this.data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.articuloForm = this.formBuilder.group({
      id: [{value: articulo.id}, null],
      codigo: [{ value: articulo.codigoArt, disabled }, Validators.required],
      nombre: [{ value: articulo.nombre, disabled }, Validators.required],
      abreviatura: [{ value: articulo.abreviatura, disabled }, Validators.required],
      stockMin: [{ value: articulo.stockMin, disabled }, null],
      stockMax: [{ value: articulo.stockMax, disabled }, null],
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

    if (
      this.errorInForm
    ) {
      this.articuloForm.controls.codigo.markAsTouched();
      this.articuloForm.controls.nombre.markAsTouched();
      this.articuloForm.controls.abreviatura.markAsTouched();
      this.articuloForm.controls.unidadMedidaId.markAsTouched();
      this.articuloForm.controls.rubroId.markAsTouched();
      this.articuloForm.controls.proveedorId.markAsTouched();
      this.articuloForm.controls.costo.markAsTouched();
      this.articuloForm.controls.precio.markAsTouched();
      console.log('Error en validacion de datos');
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    // this.articuloDTO.codigoArt = this.articuloForm.controls.codigo.value
    //   .trim()
    //   .toUpperCase();
    // this.articuloDTO.nombre = this.articuloForm.controls.nombre.value
    //   .trim()
    //   .toUpperCase();
    // this.articuloDTO.abreviatura = this.articuloForm.controls.abreviatura.value
    //   .trim()
    //   .toUpperCase();
    // this.articuloDTO.stockMin = this.articuloForm.controls.stockMin.value;
    // this.articuloDTO.stockMax = this.articuloForm.controls.stockMax.value;
    // this.articuloDTO.costo = this.articuloForm.controls.costo.value;
    // this.articuloDTO.precio = this.articuloForm.controls.precio.value;
    //
    // this.articuloDTO.unidadMedidaId = this.unidadMedidaSelect;
    // this.articuloDTO.rubroId = this.rubroSelect;
    // this.articuloDTO.subRubroId = this.subRubroSelect;
    // this.articuloDTO.marcaId = this.marcaSelect;
    // this.articuloDTO.proveedorId = this.proveedorSelect;
    //
    // if (this.updating) {
    //   this.articuloDTO.id = this.articuloForm.controls.id.value;
    //   this.update();
    // } else {
    //   this.save();
    // }
  }

  update(): void {
    // this.articulosService
    //   .actualizarArticulo(this.articuloDTO)
    //   .subscribe((data) => {
    //     this.msgSnack(data);
    //   });
  }

  save(): void {
    // console.warn(this.articuloDTO);
    // this.articulosService
    //   .guardarArticulo(this.articuloDTO)
    //   .subscribe((data) => {
    //     this.msgSnack(data);
    //   });
  }

  closeForm(): void {
    this.dialogRef.close();
  }

  // newUnidadMedida(): void {
  //   // this.consulting = false;
  //   // this.unidadToUpdate = null;
  //   this.openDialogUnidadMedida();
  // }
  //
  // newRubro(): void {
  //   // this.consulting = false;
  //   // this.rubroToUpdate = null;
  //   this.openDialogRubro();
  // }
  //
  // newSubRubro(): void {
  //   // this.consulting = false;
  //   // this.subRubroToUpdate = null;
  //   this.openDialogSubRubro();
  // }
  //
  // newMarca(): void {
  //   // this.consulting = false;
  //   // this.marcaToUpdate = null;
  //   this.openDialogMarca();
  // }
  //
  // newProveedor(): void {
  //   // this.consulting = false;
  //   // this.proveedorToUpdate = null;
  //   this.openDialogProveedor();
  // }
  //
  // openDialogUnidadMedida(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modalUnidadmedida-component';
  //   dialogConfig.height = '450px';
  //   dialogConfig.width = '300px';
  //   // dialogConfig.data = {
  //   //   unidMedida: this.unidadToUpdate,
  //   //   consulting,
  //   // };
  //   const modalDialog = this.matDialog.open(
  //     AgregarUnidadMedidaComponent,
  //     dialogConfig
  //   );
  //   modalDialog.afterClosed().subscribe((result) => {
  //     this.unidadMedidaService
  //       .listarUnidadMedidaHabilitados()
  //       .subscribe((data) => {
  //         // this.unidadMedidas = data.data;
  //       });
  //   });
  // }
  //
  // openDialogRubro(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modalRubro-component';
  //   dialogConfig.height = '400px';
  //   dialogConfig.width = '300px';
  //   dialogConfig.data = {
  //     rubro: this.rubroToUpdate,
  //     consulting: this.consulting,
  //   };
  //   const modalDialog = this.matDialog.open(
  //     AgregarRubroComponent,
  //     dialogConfig
  //   );
  //   modalDialog.afterClosed().subscribe((result) => {
  //     this.rubroService.listarRubrosHabilitados().subscribe((data) => {
  //       this.rubros = data.data;
  //     });
  //   });
  // }
  //
  // openDialogSubRubro(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modalSubRubro-component';
  //   dialogConfig.height = '500px';
  //   dialogConfig.width = '350px';
  //   dialogConfig.data = {
  //     subRubro: this.subRubroToUpdate,
  //     consulting: this.consulting,
  //   };
  //   const modalDialog = this.matDialog.open(
  //     AgregarSubRubroComponent,
  //     dialogConfig
  //   );
  //   modalDialog.afterClosed().subscribe((result) => {
  //     this.subRubroService.listarSubRubrosHabilitados().subscribe((data) => {
  //       this.subRubros = data.data;
  //     });
  //   });
  // }
  //
  // openDialogMarca(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modalMarca-component';
  //   dialogConfig.height = '400px';
  //   dialogConfig.width = '300px';
  //   dialogConfig.data = {
  //     marca: this.marcaToUpdate,
  //     consulting: this.consulting,
  //   };
  //   const modalDialog = this.matDialog.open(
  //     AgregarMarcaComponent,
  //     dialogConfig
  //   );
  //   modalDialog.afterClosed().subscribe((result) => {
  //     this.marcaService.listarMarcaHabilitados().subscribe((data) => {
  //       this.subRubros = data.data;
  //     });
  //   });
  // }
  //
  // openDialogProveedor(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modalProveedor-component';
  //   dialogConfig.height = 'auto';
  //   dialogConfig.width = '20rem';
  //   dialogConfig.data = {
  //     proveedor: this.proveedorToUpdate,
  //     consulting: this.consulting,
  //   };
  //   const modalDialog = this.matDialog.open(
  //     AgregarProveedorComponent,
  //     dialogConfig
  //   );
  //   modalDialog.afterClosed().subscribe((result) => {
  //     this.proveedorService.getEnabledSupplier().subscribe((data) => {
  //       this.proveedores = data;
  //     });
  //   });
  // }
  //
  // validarcodigo({ target }): void {
  //   const { value: nombre } = target;
  //   const finded = this.articulos.find(
  //     (p) => p.codigoArt.toLowerCase() === nombre.toLowerCase()
  //   );
  //   this.codigoRepe = finded !== undefined ? true : false;
  // }
  //
  // validarNombre({ target }): void {
  //   const { value: nombre } = target;
  //   const finded = this.articulos.find(
  //     (p) => p.nombre.toLowerCase() === nombre.toLowerCase()
  //   );
  //   this.nombreRepe = finded !== undefined ? true : false;
  // }
  //
  // validarAbreviatura({ target }): void {
  //   const { value: nombre } = target;
  //   const finded = this.articulos.find(
  //     (p) => p.abreviatura.toLowerCase() === nombre.toLowerCase()
  //   );
  //   this.abreviaturaRepe = finded !== undefined ? true : false;
  // }
  msgSnack(data): void {
    const { msg } = data;
    if (data.code === 200) {
      this.dialogRef.close(msg);
    } else {
      this.dialogRef.close('Error en el proceso');
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.articuloForm.controls[control].hasError(error);
  }


  establecerUnidad(unidadMedidaId: number): void {
      this.articuloForm.patchValue({ unidadMedidaId});
  }
}
