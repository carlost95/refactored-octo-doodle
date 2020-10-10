import {LogisticaModule} from './../../logistica/logistica.module';
import {LoginComponent} from './../../login/login.component';
import {SubRubro} from './../../modelo/SubRubro';
import {Proveedor} from './../../modelo/Proveedor';
import {Marca} from './../../modelo/Marca';
import {Rubro} from './../../modelo/Rubro';
import {AbmComprasService} from 'src/app/service/abm-compras.service';
import {Router, NavigationEnd, RoutesRecognized} from '@angular/router';
import {ComprasService} from './../../service/compras.service';
import {UnidadMedida} from './../../modelo/UnidadMedida';
import {ArticuloDTO} from './../../modelo/ArticuloDTO';
import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {filter, pairwise, map} from 'rxjs/operators';
import {resolve} from 'url';
import {Observable} from 'rxjs';
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
import {Banco} from '../../modelo/Banco';
import {BancosService} from '../../service/bancos.service';
import {AgregarBancoComponent} from '../../abm-compras/agregar-banco/agregar-banco.component';
import {Articulo} from '../../modelo/Articulo';


@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.css']
})
export class AgregarArticuloComponent implements OnInit, OnDestroy {
  articuloDTO: ArticuloDTO = new ArticuloDTO();

  unidadMedidas: UnidadMedida[] = null;
  unidadMedidasFilter: UnidadMedida[] = null;
  idUnidadMedida = 1;
  nombreUnidadMedida: string = null;

  rubros: Rubro[] = [];
  rubroFilter: Rubro[] = [];
  idRubro: number = null;
  nombreRubro: string = null;

  subRubros: SubRubro[] = null;
  subRubroFilter: SubRubro[] = null;
  idSubRubro: number = null;
  nombreSubRubro: string = null;

  marcas: Marca[] = null;
  marcasFilter: Marca[] = null;
  idMarca = 1;
  nombreMarca: string = null;

  proveedores: Proveedor[] = null;
  proveedoresFilter: Proveedor[] = null;
  idProveedor = 1;
  nombreProveedor: string = null;
  subs: any;
  private previousUrl: string;
  articuloStorage: ArticuloStorage = new ArticuloStorage();


  // nuevos de prueba
  errorInForm = false;
  submitted = false;
  updating = false;
  codigoRepe = false;
  nombreRepe = false;
  abreviaturaRepe = false;

  articulos: ArticuloDTO[] = [];


  constructor(
    private serviceCompra: ComprasService,
    private subRubroService: SubRubroService,
    private marcaService: MarcasService,
    private rubroService: RubrosService,
    private unidadMedidaService: UnidadMedidaService,
    private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog,
    // private router: Router,
    // private service: BancosService,
    // public dialogRef: MatDialogRef<AgregarArticuloComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: ArticuloDTO
  ) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.unidadMedidaService.listarUnidadMedidaHabilitados().subscribe(data => {
      // tslint:disable-next-line:only-arrow-functions typedef
      this.unidadMedidas = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.unidadMedidasFilter = this.unidadMedidas.sort(
        (a, b) => a.nombre.length - b.nombre.length
      );
    });

    const rubroPromise = await this.rubroService
      .listarRubrosHabilitados()
      .toPromise()
      .then(data => {
        this.rubros = Object.keys(data.data).map(key => data.data[key]);
        this.rubroFilter = this.rubros;
        this.rubroFilter.sort((a, b) => a.nombre.length - b.nombre.length);
      });
    this.serviceCompra.listarArticuloTodos().subscribe(data => {
      this.articulos = data.data;
      console.warn('muetra de todos los articulos');
      console.warn(this.articulos);
    });
    this.subRubroService.listarSubRubrosHabilitados().subscribe(data => {
      this.subRubros = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.subRubroFilter = this.subRubros;
      this.subRubroFilter.sort((a, b) => a.nombre.length - b.nombre.length);
    });

    this.marcaService.listarMarcaHabilitados().subscribe(data => {
      this.marcas = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.marcasFilter = this.marcas.sort(
        (a, b) => a.nombre.length - b.nombre.length
      );
    });
    await this.serviceCompra.listarProveedoresHabilitados().subscribe(data => {
      this.proveedores = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.proveedoresFilter = this.proveedores.sort(
        (a, b) => a.razonSocial.length - b.razonSocial.length
      );
    });

    await this.getDataFromLocalStorage().then(() => console.log('Resolve!'));

  }

  // tslint:disable-next-line:typedef
  async getDataFromLocalStorage() {
    if (localStorage.getItem('listar') === 'false') {

      const promise = new Promise(resolve => {
        setTimeout(() => {
          // this.nombreUnidadMedida = localStorage.getItem('nombreUnidadMedida');
          this.articuloStorage = JSON.parse(localStorage.getItem('articuloStorage'));
          this.articuloDTO = JSON.parse(localStorage.getItem('articuloDTO'));
        }, 100);
      });
    }
  }

  volverAtras() {
    window.history.back();
  }

  nuevoArticulo(articuloDTO: ArticuloDTO) {
    // this.articuloDTO.unidadMedidaId = 1;

    this.unidadMedidas.forEach(unidadMedida => {
      if (unidadMedida.nombre == this.articuloStorage.unidadMedida) {
        this.articuloDTO.id = unidadMedida.id;
      }
    });

    for (let i = 0; i < this.unidadMedidas.length; i++) {
      if (this.unidadMedidas[i].nombre == this.articuloStorage.unidadMedida) {
        this.articuloDTO.unidadMedidaId = this.unidadMedidas[i].id;
      }
    }
    this.rubros.forEach(rubro => {
      if (rubro.nombre == this.articuloStorage.rubro) {
        this.articuloDTO.id = rubro.id;
      }
    });

    for (let i = 0; i < this.rubros.length; i++) {
      if (this.rubros[i].nombre == this.articuloStorage.rubro) {
        this.articuloDTO.rubroId = this.rubros[i].id;
      }
    }

    this.subRubros.forEach(subSubro => {
      if (subSubro.nombre == this.articuloStorage.subRubro) {
        this.articuloDTO.id = subSubro.id;
      }
    });

    for (let i = 0; i < this.subRubros.length; i++) {
      if (this.subRubros[i].nombre == this.articuloStorage.subRubro) {
        this.articuloDTO.subRubroId = this.subRubros[i].id;
      }
    }

    this.marcas.forEach(marca => {
      if (marca.nombre == this.articuloStorage.marca) {
        this.articuloDTO.id = marca.id;
      }
    });

    for (let i = 0; i < this.marcas.length; i++) {
      if (this.marcas[i].nombre == this.articuloStorage.marca) {
        this.articuloDTO.marcaId = this.marcas[i].id;
      }
    }
    this.proveedores.forEach(proveedor => {
      if (proveedor.razonSocial == this.articuloStorage.proveedor) {
        this.articuloDTO.id = proveedor.id;
      }
    });

    for (let i = 0; i < this.proveedores.length; i++) {
      if (this.proveedores[i].razonSocial == this.articuloStorage.proveedor) {
        this.articuloDTO.proveedorId = this.proveedores[i].id;
      }
    }
    articuloDTO.habilitacion = 1;
    this.articuloDTO.habilitacion = 1;
    this.articuloDTO.id = null;
    this.articuloDTO.nombre = articuloDTO.nombre.toUpperCase();
    this.articuloDTO.abreviatura = articuloDTO.abreviatura.toUpperCase();
    this.articuloDTO.codigoArt = articuloDTO.codigoArt.toUpperCase();
    this.articuloDTO.stockMin = articuloDTO.stockMin;
    this.articuloDTO.stockMax = articuloDTO.stockMax;
    this.articuloDTO.marcaId = articuloDTO.marcaId;
    this.articuloDTO.proveedorId = articuloDTO.proveedorId;
    this.articuloDTO.rubroId = articuloDTO.rubroId;
    this.articuloDTO.subRubroId = articuloDTO.subRubroId;

    this.serviceCompra.guardarArticulo(this.articuloDTO).subscribe(
      resp => {
        alert('SE GUARDO UN NUEVO ARTICULO');
        window.history.back();
      },
      error => {
        alert('Se produjo un error en la carga');
      }
    );
  }

  // tslint:disable-next-line:typedef
  listarUnidadMedida(filterVal: any) {
    if (filterVal == '0') {
      this.unidadMedidasFilter = this.unidadMedidas;
    } else {
      this.unidadMedidasFilter = this.unidadMedidas.filter(
        item => item.nombre == filterVal
      );
    }
  }

  listarRubros(filterVal: any) {
    if (filterVal == '0') {
      this.rubroFilter = this.rubros;
    } else {
      this.rubroFilter = this.rubros.filter(item => item.nombre == filterVal);
    }

    // TODO: VAlidar que no sea nulo rubroFilter
    const idRubro = this.rubroFilter[0].id;

    this.subRubroService.listarSubRubrosPorIdRubro(idRubro).subscribe(data => {
      this.subRubros = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      console.log(this.subRubros);
      this.subRubroFilter = this.subRubros;
      this.subRubroFilter.sort((a, b) => a.nombre.length - b.nombre.length);
    });
  }

  listarSubRubros(filterVal: any) {
    if (filterVal == '0') {
      this.subRubroFilter = this.subRubros;
    } else {
      this.subRubroFilter = this.subRubros.filter(
        item => item.nombre == filterVal
      );
    }
  }

  listarMarcas(filterVal: any) {
    if (filterVal == '0') {
      this.marcasFilter = this.marcas;
    } else {
      this.marcasFilter = this.marcas.filter(item => item.nombre == filterVal);
    }
  }

  listarProveedores(filterVal: any) {
    if (filterVal == '0') {
      this.proveedoresFilter = this.proveedores;
    } else {
      this.proveedoresFilter = this.proveedores.filter(
        item => item.razonSocial == filterVal
      );
    }
  }

  ngOnDestroy(): void {
    const list = localStorage.getItem('listar');

    if (list === 'true') {
      localStorage.setItem('listar', 'false');
    }
    localStorage.setItem('articuloDTO', JSON.stringify(this.articuloDTO));
    localStorage.setItem('articuloStorage', JSON.stringify(this.articuloStorage));
  }

  // tslint:disable-next-line:typedef
  newMarca() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = null;
    this.matDialog.open(AgregarMarcaComponent, dialogConfig);
    this.marcaService.listarMarcaHabilitados().subscribe(data => {
      this.marcas = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.marcasFilter = this.marcas.sort(
        (a, b) => a.nombre.length - b.nombre.length
      );
    });
  }

  // tslint:disable-next-line:typedef
  newRubro(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = null;
    this.matDialog.open(AgregarRubroComponent, dialogConfig);
    this.rubroService.listarRubrosHabilitados().subscribe(data => {
      this.rubros = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.rubroFilter = this.rubros.sort(
        (a, b) => a.nombre.length - b.nombre.length
      );
    });
  }


  newProveedor(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '400px';
    dialogConfig.data = null;
    this.matDialog.open(AgregarProveedorComponent, dialogConfig);
    this.proveedorService.listarProveedoresHabilitados().subscribe(data => {
      this.proveedores = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.proveedoresFilter = this.proveedores.sort(
        (a, b) => a.razonSocial.length - b.razonSocial.length
      );
    });
  }

  newSubRubro(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = null;
    this.matDialog.open(AgregarSubRubroComponent, dialogConfig);
    this.subRubroService.listarSubRubrosHabilitados().subscribe(data => {
      this.subRubros = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.subRubroFilter = this.subRubros.sort(
        (a, b) => a.nombre.length - b.nombre.length
      );
    });
  }

  newUnidadMedida(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = null;
    this.matDialog.open(AgregarUnidadMedidaComponent, dialogConfig);
    this.unidadMedidaService.listarUnidadMedidaHabilitados().subscribe(data => {
      this.unidadMedidas = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.unidadMedidasFilter = this.unidadMedidas.sort(
        (a, b) => a.nombre.length - b.nombre.length
      );
    });
  }

  // tslint:disable-next-line:typedef
  validarcodigo({target}) {
    const {value: nombre} = target;
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

  // banco: Banco = new Banco();
  // bancoForm: FormGroup;
  // errorInForm: boolean = false;
  // submitted = false;
  // updating = false;
  // nombreRepe = false;
  // abreRepe = false;
  // bancos: Banco[] = [];
  //
  // constructor(private service: BancosService,
  //             private formBuilder: FormBuilder,
  //             public dialogRef: MatDialogRef<AgregarArticuloComponent>,
  //             @Inject(MAT_DIALOG_DATA) public data: Banco) {
  // }
  //
  //
  // ngOnInit() {
  //   this.service.listarBancosTodos().subscribe(resp => this.bancos = resp.data);
  //
  //   if (this.data) {
  //     this.bancoForm = this.formBuilder.group({
  //       id: [this.data.id, null],
  //       nombre: [this.data.nombre, Validators.required],
  //       abreviatura: [this.data.abreviatura, Validators.required]
  //     })
  //     this.updating = true;
  //   } else {
  //     this.bancoForm = this.formBuilder.group({
  //       nombre: ['', Validators.required],
  //       abreviatura: ['', null]
  //     })
  //   }
  //
  // }
  //
  // close() {
  //   this.dialogRef.close();
  // }
  //
  // onSubmit() {
  //   this.submitted = true;
  //   this.errorInForm = this.submitted && this.bancoForm.invalid;
  //   if (this.errorInForm || this.nombreRepe || this.abreRepe) {
  //     this.bancoForm.controls.nombre.markAsTouched();
  //     this.bancoForm.controls.abreviatura.markAsTouched();
  //     console.log('Error en los datos')
  //   } else {
  //     this.makeDTO();
  //
  //   }
  //
  // }
  //
  // makeDTO() {
  //   this.banco.nombre = this.bancoForm.controls.nombre.value;
  //   this.banco.abreviatura = this.bancoForm.controls.abreviatura.value;
  //   if (this.updating) {
  //     this.banco.id = this.bancoForm.controls.id.value;
  //     this.update();
  //   } else {
  //     this.save();
  //   }
  // }
  //
  //
  // save() {
  //   this.service.guardarBanco(this.banco).subscribe(data => {
  //     this.banco = data.data;
  //     this.dialogRef.close();
  //   });
  // }
  //
  // private update() {
  //   this.service.actualizarBanco(this.banco).subscribe(data => {
  //     this.banco = data.data;
  //     this.dialogRef.close();
  //   });
  // }
  // // tslint:disable-next-line: typedef
  // validar({ target }) {
  //   const { value: nombre } = target;
  //   const finded = this.bancos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
  //   const finded2 = this.bancos.find(p => p.abreviatura.toLowerCase() === nombre.toLowerCase());
  //   this.nombreRepe = (finded !== undefined) ? true : false;
  //   this.abreRepe = (finded2 !== undefined) ? true : false;
  // }
  //
  // ngOnDestroy(): void {
  // }
}

export class ArticuloStorage {
  unidadMedida: string;
  rubro: string;
  subRubro: string;
  marca: string;
  proveedor: string;
}
