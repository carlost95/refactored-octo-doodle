import {SubRubro} from './../../modelo/SubRubro';
import {Proveedor} from './../../modelo/Proveedor';
import {Marca} from './../../modelo/Marca';
import {Rubro} from './../../modelo/Rubro';
import {ComprasService} from './../../service/compras.service';
import {UnidadMedida} from './../../modelo/UnidadMedida';
import {ArticuloDTO} from './../../modelo/ArticuloDTO';
import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AgregarMarcaComponent} from '../../abm-compras/agregar-marca/agregar-marca.component';
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MarcasService} from '../../service/marcas.service';
import {SubRubroService} from '../../service/sub-rubro.service';
import {RubrosService} from '../../service/rubros.service';
import {UnidadMedidaService} from '../../service/unidad-medida.service';
import {AgregarRubroComponent} from '../../abm-compras/agregar-rubro/agregar-rubro.component';
import {AgregarProveedorComponent} from '../agregar-proveedor/agregar-proveedor.component';
import {ProveedoresService} from '../../service/proveedores.service';
import {AgregarSubRubroComponent} from '../../abm-compras/agregar-sub-rubro/agregar-sub-rubro.component';
import {AgregarUnidadMedidaComponent} from '../../abm-compras/agregar-unidad-medida/agregar-unidad-medida.component';
import {Articulo} from '../../modelo/Articulo';
import {ArticulosService} from '../../service/articulos.service';


@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.css']
})
export class AgregarArticuloComponent implements OnInit {

  articulos: Articulo[] = [];
  unidadMedidas: UnidadMedida[] = null;
  rubros: Rubro[] = null;
  subRubros: SubRubro[] = null;
  marcas: Marca[] = null;
  proveedores: Proveedor[] = null;


  unidadMedidaSelect: string = null;
  rubroSelect: string = null;
  subRubroSelect: string = null;
  marcaSelect: string = null;
  proveedorSelect: string = null;

  unidadToUpdate: UnidadMedida = new UnidadMedida();
  rubroToUpdate: Rubro = new Rubro();
  subRubroToUpdate: SubRubro = new SubRubro();
  marcaToUpdate: Marca = new Marca();
  proveedorToUpdate: Proveedor = new Proveedor();

  errorInForm = false;
  submitted = false;
  updating = false;
  codigoRepe = false;
  nombreRepe = false;
  abreviaturaRepe = false;
  articuloForm: FormGroup;

  articulo: Articulo = new Articulo();
  articuloDTO: ArticuloDTO = new ArticuloDTO();


  constructor(
    private serviceCompra: ComprasService,
    private articulosService: ArticulosService,
    private subRubroService: SubRubroService,
    private marcaService: MarcasService,
    private rubroService: RubrosService,
    private unidadMedidaService: UnidadMedidaService,
    private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog,
    public matDialogUnidMed: MatDialog,
    public dialogRef: MatDialogRef<AgregarArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Articulo
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.unidadMedidaService.listarUnidadMedidaHabilitados().subscribe(resp =>
      this.unidadMedidas = resp.data);
    this.rubroService.listarRubrosHabilitados().subscribe(resp =>
      this.rubros = resp.data);
    this.subRubroService.listarSubRubrosHabilitados().subscribe(resp =>
      this.subRubros = resp.data);
    this.marcaService.listarMarcaHabilitados().subscribe(resp =>
      this.marcas = resp.data);
    this.proveedorService.listarProveedoresHabilitados().subscribe(resp =>
      this.proveedores = resp.data);
    this.articulosService.listarArticuloTodos().subscribe(resp =>
      this.articulos = resp.data);

    if (this.data) {
      this.unidadMedidaSelect = this.data.unidadMedidaId.nombre;

      this.articuloForm = this.formBuilder.group({
        id: [this.data.id, null],
        codigo: [this.data.codigoArt, Validators.required],
        nombre: [this.data.nombre, Validators.required],
        abreviatura: [this.data.abreviatura, Validators.required],
        stockMin: [this.data.stockMin, null],
        stockMax: [this.data.stockMax, null],
        unidadMedidaId: [this.data.unidadMedidaId, Validators.required],
        rubroId: [this.data.rubroId, Validators.required],
        subRubroId: [this.data.subRubroId, null],
        marcaId: [this.data.marcaId, null],
        proveedorId: [this.data.proveedorId, Validators.required],
        costo: [this.data.costo, Validators.required],
        precio: [this.data.precio, Validators.required]
      });
      this.updating = true;
    } else {
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
        precio: ['', Validators.required]

      });
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    this.errorInForm = this.submitted && this.articuloForm.invalid;

    if (this.errorInForm || this.codigoRepe || this.nombreRepe || this.abreviaturaRepe) {
      this.articuloForm.controls.codigo.markAsTouched();
      this.articuloForm.controls.nombre.markAsTouched();
      this.articuloForm.controls.abreviatura.markAsTouched();
      this.articuloForm.controls.unidadMedidaId.markAsTouched();
      this.articuloForm.controls.rubroId.markAsTouched();
      this.articuloForm.controls.proveedorId.markAsTouched();
      this.articuloForm.controls.costo.markAsTouched();
      this.articuloForm.controls.precio.markAsTouched();
      console.log('Error en los datos');
    } else {
      this.makeDTO();

    }
  }

  // tslint:disable-next-line:typedef
  makeDTO() {
    this.articuloDTO.codigoArt = this.articuloForm.controls.codigo.value;
    this.articuloDTO.nombre = this.articuloForm.controls.nombre.value;
    this.articuloDTO.abreviatura = this.articuloForm.controls.abreviatura.value;
    this.articuloDTO.stockMin = this.articuloForm.controls.stockMin.value;
    this.articuloDTO.stockMax = this.articuloForm.controls.stockMax.value;
    this.articuloDTO.costo = this.articuloForm.controls.costo.value;
    this.articuloDTO.precio = this.articuloForm.controls.precio.value;

    if (this.unidadMedidaSelect !== null) {
      this.unidadMedidas.forEach(unid => {
        if (this.unidadMedidaSelect.toLowerCase() === unid.nombre.toLowerCase()) {
          this.articuloDTO.unidadMedidaId = unid.id;
        }
      });
    }
    if (this.rubroSelect !== null) {
      this.rubros.forEach(rub => {
        if (this.rubroSelect.toLowerCase() === rub.nombre.toLowerCase()) {
          this.articuloDTO.rubroId = rub.id;
        }
      });
    }
    if (this.subRubroSelect !== null) {
      this.subRubros.forEach(subRub => {
        if (this.subRubroSelect.toLowerCase() === subRub.nombre.toLowerCase()) {
          this.articuloDTO.subRubroId = subRub.id;
        }
      });
    }
    if (this.marcaSelect !== null) {
      this.marcas.forEach(marca => {
        if (this.marcaSelect.toLowerCase() === marca.nombre.toLowerCase()) {
          this.articuloDTO.marcaId = marca.id;
        }
      });
    }
    if (this.proveedorSelect !== null) {
      this.proveedores.forEach(prov => {
        if (this.proveedorSelect.toLowerCase() === prov.razonSocial.toLowerCase()) {
          this.articuloDTO.proveedorId = prov.id;
        }
      });
    }

    if (this.updating) {
      this.articuloDTO.id = this.articuloForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }

  // tslint:disable-next-line:typedef
  update() {
    this.articulosService.actualizarArticulo(this.articuloDTO).subscribe(data => {
      this.articuloDTO = data.data;
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line: typedef
  save() {
    this.articulosService.guardarArticulo(this.articuloDTO).subscribe(data => {
      this.articuloDTO = data.data;
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line:typedef
  closeForm() {
    this.dialogRef.close();
  }

  // tslint:disable-next-line:typedef
  newUnidadMedida() {
    this.unidadToUpdate = null;
    this.openDialogUnidadMedida();
  }

  // tslint:disable-next-line:typedef
  newRubro() {
    this.rubroToUpdate = null;
    this.openDialogRubro();
  }

  // tslint:disable-next-line:typedef
  newSubRubro() {
    this.subRubroToUpdate = null;
    this.openDialogSubRubro();
  }

  // tslint:disable-next-line:typedef
  newMarca() {
    this.marcaToUpdate = null;
    this.openDialogMarca();
  }

  // tslint:disable-next-line:typedef
  newProveedor() {
    this.proveedorToUpdate = null;
    this.openDialogProveedor();
  }

  openDialogUnidadMedida(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modalUnidadmedida-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = this.unidadToUpdate;
    const modalDialog = this.matDialog.open(AgregarUnidadMedidaComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.unidadMedidaService.listarUnidadMedidaHabilitados().subscribe(data => {
        this.unidadMedidas = data.data;
      });
    });
  }


  // tslint:disable-next-line:typedef
  openDialogRubro(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modalRubro-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = this.rubroToUpdate;
    const modalDialog = this.matDialog.open(AgregarRubroComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.rubroService.listarRubrosHabilitados().subscribe(data => {
        this.rubros = data.data;
      });
    });

  }

  openDialogSubRubro(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modalSubRubro-component';
    dialogConfig.height = '500px';
    dialogConfig.width = '350px';
    dialogConfig.data = this.subRubroToUpdate;
    const modalDialog = this.matDialog.open(AgregarSubRubroComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.subRubroService.listarSubRubrosHabilitados().subscribe(data => {
        this.subRubros = data.data;
      });
    });
  }

// tslint:disable-next-line:typedef
  openDialogMarca(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modalMarca-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = this.marcaToUpdate;
    const modalDialog = this.matDialog.open(AgregarMarcaComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.marcaService.listarMarcaHabilitados().subscribe(data => {
        this.subRubros = data.data;
      });
    });
  }

  openDialogProveedor(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modalProveedor-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '400px';
    dialogConfig.data = this.proveedorToUpdate;
    const modalDialog = this.matDialog.open(AgregarProveedorComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.proveedorService.listarProveedoresHabilitados().subscribe(data => {
        this.proveedores = data.data;
      });
    });
  }

  // tslint:disable-next-line:typedef
  validarcodigo({target}) {
    const {value: nombre} = target;
    console.log('NOMBRE-------', nombre);
    const finded = this.articulos.find(p => p.codigoArt.toLowerCase() === nombre.toLowerCase());
    this.codigoRepe = (finded !== undefined) ? true : false;
  }

  // tslint:disable-next-line:typedef
  validarNombre({target}) {
    const {value: nombre} = target;
    const finded = this.articulos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
  }

  // tslint:disable-next-line:typedef
  validarAbreviatura({target}) {
    const {value: nombre} = target;
    const finded = this.articulos.find(p => p.abreviatura.toLowerCase() === nombre.toLowerCase());
    this.abreviaturaRepe = (finded !== undefined) ? true : false;
  }
}
