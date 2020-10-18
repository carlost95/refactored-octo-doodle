import { Proveedor } from './../../modelo/Proveedor';
import { Marca } from './../../modelo/Marca';
import { SubRubro } from './../../modelo/SubRubro';
import { UnidadMedida } from './../../modelo/UnidadMedida';
import { AbmComprasService } from './../../service/abm-compras.service';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from '../../service/compras.service';
import { Rubro } from './../../modelo/Rubro';
import { ArticuloDTO } from './../../modelo/ArticuloDTO';
import { Articulo } from './../../modelo/Articulo';
import { Component, OnInit } from '@angular/core';
import { Key } from 'protractor';
import {SubRubroService} from '../../service/sub-rubro.service';
import {RubrosService} from '../../service/rubros.service';
import {MarcasService} from '../../service/marcas.service';
import {UnidadMedidaService} from '../../service/unidad-medida.service';
import {ArticulosService} from '../../service/articulos.service';

@Component({
  selector: 'app-modificar-articulo',
  templateUrl: './modificar-articulo.component.html',
  styleUrls: ['./modificar-articulo.component.css']
})
export class ModificarArticuloComponent implements OnInit {
  articulo: Articulo = new Articulo();
  articuloDTO: ArticuloDTO = new ArticuloDTO();

  unidadMedidaFilter: UnidadMedida[] = null;
  unidadMedidas: UnidadMedida[] = null;
  unidadMedidaSelected: UnidadMedida = null;
  nombreUnidadMedida: string = null;
  idUnidadMedida: number = null;
  unidadMedida: UnidadMedida;

  rubrosFilter: Rubro[] = null;
  rubros: Rubro[] = null;
  rubroSelected: Rubro;
  nombreRubro: string = null;
  idRubro: number = null;
  rubro: Rubro;

  subRubrosFilter: SubRubro[] = null;
  subRubros: SubRubro[] = null;
  subRubroSelected: SubRubro;
  nombreSubRubro: string = null;
  idSubRubro: number = null;
  subRubro: SubRubro;

  marcasFilter: Marca[] = null;
  marcas: Marca[] = null;
  marcaSelected: Marca;
  nombreMarca: string = null;
  idMarca: number = null;
  marca: Marca;

  proveedorFilter: Proveedor[] = null;
  proveedores: Proveedor[] = null;
  proveedorSelected: Proveedor;
  nombreProveedor: string = null;
  idPrveedor: number = null;
  proveedor: Proveedor;

  constructor(
    private serviceAbmCompra: AbmComprasService,
    private subRubroService: SubRubroService,
    private rubroService: RubrosService,
    private serviceCompra: ArticulosService,
    private serviceCompra1: ComprasService,
    private marcasService: MarcasService,
    private unidadMedidaService: UnidadMedidaService,
    private id: ActivatedRoute
  ) {}

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    let id: number;
    this.id.params.subscribe(data => (id = data.id));
    console.log('se muestra -->' + id);

    const promise = await this.serviceCompra
      .listarArticuloId(id)
      .toPromise()
      .then(data => {
        this.articulo = data.data;
        console.log(this.articulo);
      });

    this.unidadMedidaService.listarUnidadMedidaHabilitados().subscribe(data => {
      this.unidadMedidas = data.data;
      // console.log(data.data);
      this.unidadMedidaSelected = this.articulo.unidadMedidaId;
    });

    this.rubroService.listarRubrosHabilitados().subscribe(data => {
      this.rubros = data.data;
      this.rubroSelected = this.articulo.rubroId;
    });

    this.subRubroService.listarSubRubrosHabilitados().subscribe(data => {
      this.subRubros = data.data;
      this.subRubroSelected = this.articulo.subRubroId;
    });

    this.marcasService.listarMarcaHabilitados().subscribe(data => {
      this.marcas = data.data;
      this.marcaSelected = this.articulo.marcaId;
    });

    this.serviceCompra1.listarProveedoresHabilitados().subscribe(data => {
      this.proveedores = data.data;
      this.proveedorSelected = this.articulo.proveedorId;
    });
  }

  // tslint:disable-next-line:typedef
  volverAtras() {
    window.history.back();
  }

  // -----------------
  // tslint:disable-next-line:typedef
  actualizarArticulo(articulo: Articulo) {
    this.articuloDTO.nombre = this.articulo.nombre;
    this.articuloDTO.id = articulo.id;
    this.articuloDTO.abreviatura = articulo.abreviatura;
    this.articuloDTO.codigoArt = articulo.codigoArt;
    this.articuloDTO.stockMax = articulo.stockMax;
    this.articuloDTO.stockMin = articulo.stockMin;
    this.articuloDTO.habilitacion = articulo.habilitacion;
    this.articuloDTO.unidadMedidaId = articulo.unidadMedidaId.id;
    this.articuloDTO.rubroId = articulo.rubroId.id;
    this.articuloDTO.subRubroId = articulo.subRubroId.id;
    this.articuloDTO.marcaId = articulo.marcaId.id;


    console.log(this.articuloDTO);

    this.serviceCompra.actualizarArticulo(this.articuloDTO).subscribe(data => {
      this.articuloDTO = data.data;
      alert('SE ACTUALIZO EL SUB RUBRO ' + this.articuloDTO.nombre);
      window.history.back();
    });
  }

}
