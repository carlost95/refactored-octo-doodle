import { LogisticaModule } from './../../logistica/logistica.module';
import { LoginComponent } from './../../login/login.component';
import { SubRubro } from "./../../modelo/SubRubro";
import { Proveedor } from "./../../modelo/Proveedor";
import { Marca } from "./../../modelo/Marca";
import { Rubro } from "./../../modelo/Rubro";
import { AbmComprasService } from "src/app/service/abm-compras.service";
import { Router, NavigationEnd, RoutesRecognized } from "@angular/router";
import { ComprasService } from "./../../service/compras.service";
import { UnidadMedida } from "./../../modelo/UnidadMedida";
import { ArticuloDTO } from "./../../modelo/ArticuloDTO";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { filter, pairwise, map } from 'rxjs/operators';
import { resolve } from 'url';
import { Observable } from 'rxjs';


@Component({
  selector: "app-agregar-articulo",
  templateUrl: "./agregar-articulo.component.html",
  styleUrls: ["./agregar-articulo.component.css"]
})
export class AgregarArticuloComponent implements OnInit, OnDestroy {
  articuloDTO: ArticuloDTO = new ArticuloDTO();

  unidadMedidas: UnidadMedida[] = null;
  unidadMedidasFilter: UnidadMedida[] = null;
  idUnidadMedida: number = 1;
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
  idMarca: number = 1;
  nombreMarca: string = null;

  proveedores: Proveedor[] = null;
  proveedoresFilter: Proveedor[] = null;
  idProveedor: number = 1;
  nombreProveedor: string = null;
  // articuloDTOStorage: ArticuloDTO = new ArticuloDTO();
  subs:any;
  private previousUrl: string;
  articuloStorage: ArticuloStorage = new ArticuloStorage();


  constructor(
    private serviceAbmCompra: AbmComprasService,
    private serviceCompra: ComprasService,
    private router: Router) {}

  async ngOnInit() {
    this.serviceAbmCompra.listarUnidadMedidaTodos().subscribe(data => {
      this.unidadMedidas = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.unidadMedidasFilter = this.unidadMedidas.sort(
        (a, b) => a.nombre.length - b.nombre.length
      );
    });

    let rubroPromise = await this.serviceAbmCompra
      .listarRubrosHabilitados()
      .toPromise()
      .then(data => {
        this.rubros = Object.keys(data.data).map(key => data.data[key]);
        this.rubroFilter = this.rubros;
        this.rubroFilter.sort((a, b) => a.nombre.length - b.nombre.length);
      });

    this.serviceAbmCompra.listarSubRubrosHabilitados().subscribe(data => {
      this.subRubros = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.subRubroFilter = this.subRubros;
      this.subRubroFilter.sort((a, b) => a.nombre.length - b.nombre.length);
    });

    this.serviceAbmCompra.listarMarcaHabilitados().subscribe(data => {
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

  async getDataFromLocalStorage() {
    if ( localStorage.getItem('listar') === 'false' ) {

      const promise = new Promise( resolve => {
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

    for (var i = 0; i < this.unidadMedidas.length; i++) {
      if (this.unidadMedidas[i].nombre == this.articuloStorage.unidadMedida) {
        this.articuloDTO.unidadMedidaId = this.unidadMedidas[i].id;
      }
    }
    this.rubros.forEach(rubro => {
      if (rubro.nombre == this.articuloStorage.rubro) {
        this.articuloDTO.id = rubro.id;
      }
    });

    for (var i = 0; i < this.rubros.length; i++) {
      if (this.rubros[i].nombre == this.articuloStorage.rubro) {
        this.articuloDTO.rubroId = this.rubros[i].id;
      }
    }

    this.subRubros.forEach(subSubro => {
      if (subSubro.nombre == this.articuloStorage.subRubro) {
        this.articuloDTO.id = subSubro.id;
      }
    });

    for (var i = 0; i < this.subRubros.length; i++) {
      if (this.subRubros[i].nombre == this.articuloStorage.subRubro) {
        this.articuloDTO.subRubroId = this.subRubros[i].id;
      }
    }

    this.marcas.forEach(marca => {
      if (marca.nombre == this.articuloStorage.marca) {
        this.articuloDTO.id = marca.id;
      }
    });

    for (var i = 0; i < this.marcas.length; i++) {
      if (this.marcas[i].nombre == this.articuloStorage.marca) {
        this.articuloDTO.marcaId = this.marcas[i].id;
      }
    }
    this.proveedores.forEach(proveedor => {
      if (proveedor.razonSocial == this.articuloStorage.proveedor) {
        this.articuloDTO.id = proveedor.id;
      }
    });

    for (var i = 0; i < this.proveedores.length; i++) {
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
        alert("SE GUARDO UN NUEVO ARTICULO");
        window.history.back();
      },
      error => {
        alert("Se produjo un error en la carga");
      }
    );
  }
  listarUnidadMedida(filterVal: any) {
    if (filterVal == "0") this.unidadMedidasFilter = this.unidadMedidas;
    else
      this.unidadMedidasFilter = this.unidadMedidas.filter(
        item => item.nombre == filterVal
      );
  }
  listarRubros(filterVal: any) {
    if (filterVal == "0") this.rubroFilter = this.rubros;
    else
      this.rubroFilter = this.rubros.filter(item => item.nombre == filterVal);

    // TODO: VAlidar que no sea nulo rubroFilter
    let idRubro = this.rubroFilter[0].id;

    this.serviceAbmCompra.listarSubRubrosPorIdRubro(idRubro).subscribe(data => {
      this.subRubros = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      console.log(this.subRubros);
      this.subRubroFilter = this.subRubros;
      this.subRubroFilter.sort((a, b) => a.nombre.length - b.nombre.length);
    });
  }
  listarSubRubros(filterVal: any) {
    if (filterVal == "0") this.subRubroFilter = this.subRubros;
    else
      this.subRubroFilter = this.subRubros.filter(
        item => item.nombre == filterVal
      );
  }

  listarMarcas(filterVal: any) {
    if (filterVal == '0') this.marcasFilter = this.marcas;
    else
      this.marcasFilter = this.marcas.filter(item => item.nombre == filterVal);
  }
  listarProveedores(filterVal: any) {
    if (filterVal == "0") this.proveedoresFilter = this.proveedores;
    else
      this.proveedoresFilter = this.proveedores.filter(
        item => item.razonSocial == filterVal
      );
  }

  ngOnDestroy(): void {
    let list = localStorage.getItem('listar');

    if ( list === 'true'){
      localStorage.setItem('listar', 'false');
    }
    localStorage.setItem('articuloDTO', JSON.stringify(this.articuloDTO));
    localStorage.setItem('articuloStorage', JSON.stringify(this.articuloStorage));
  }

}
export class ArticuloStorage{
  unidadMedida: string;
  rubro: string;
  subRubro: string;
  marca: string;
  proveedor: string;
}
