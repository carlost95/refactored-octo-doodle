import { logging } from 'protractor';
import { Proveedor } from "./../../modelo/Proveedor";
import { MovimientoArticuloDTO } from "./../../modelo/MovimientoArticuloDTO";
import { Articulo } from "./../../modelo/Articulo";
import { ComprasService } from "./../../service/compras.service";
import { Pedido } from "./../../modelo/Pedido";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-agregar-pedido",
  templateUrl: "./agregar-pedido.component.html",
  styleUrls: ["./agregar-pedido.component.css"]
})
export class AgregarPedidoComponent implements OnInit {
  pedido: Pedido = new Pedido();

  articulos: Articulo[] = [];

  movimientoArticuloDTO: MovimientoArticuloDTO = new MovimientoArticuloDTO();
  movimientoArticulosDTO: MovimientoArticuloDTO[] = [];

  articulosFilter: Articulo[] = null;
  stockArticulo: number[] = [];
  proveedores: Proveedor[] = [];
  razonSocial: string  = ' ';
  movimientoFilter: MovimientoArticuloDTO[] = [];

  constructor(private comprasService: ComprasService) {}

  async ngOnInit() {
    await this.fetchEvent2().then(() => {
      this.articulos.forEach((a, index) => {
        this.movimientoArticulosDTO.push(new MovimientoArticuloDTO());
        this.movimientoArticulosDTO[index].movimiento = null;
        this.movimientoArticulosDTO[index].articuloId = a.id;

      });
    });
    this.fetchEvent().then(() => {});
    this.listaProveedor();
    this.movimientoFilter = this.movimientoArticulosDTO;
    console.log('Razon social: ' + this.razonSocial);

  }

  guardarPedido(pedido: Pedido) {
    this.pedido.id = null;
    this.pedido.nombre = pedido.nombre.toUpperCase();
    // let fechaString = this.jsonStringDate(this.pedido.fecha);
    // let fechaCorrecta = new Date(fechaString);
    // fechaCorrecta.setMinutes(
    //   fechaCorrecta.getMinutes() + fechaCorrecta.getTimezoneOffset()
    // );
    // this.pedido.fecha = fechaCorrecta;
    this.pedido.descripcion = pedido.descripcion.toUpperCase();

    this.comprasService.guardarPedidos(this.pedido).then(data => {
      console.log(data);

      this.pedido = data.data;

      this.movimientoArticulosDTO.forEach((element, index) => {
        if (element.movimiento !== null) {
          this.movimientoArticuloDTO.id = null;
          // let fechaString = this.jsonStringDate(this.pedido.fecha);
          // let fechaCorrecta = new Date(fechaString);
          // fechaCorrecta.setMinutes(
          //   fechaCorrecta.getMinutes() + fechaCorrecta.getTimezoneOffset()
          // );

          // this.movimientoArticuloDTO.fecha = fechaCorrecta;

          this.movimientoArticuloDTO.articuloId = this.articulos[index].id;
          this.movimientoArticuloDTO.movimiento = this.movimientoArticulosDTO[
            index
          ].movimiento;
          this.movimientoArticuloDTO.pedidoId = data.data.id;

          console.log(this.movimientoArticuloDTO);

          // console.log("muetra fecha");
          // console.log(this.movimientoArticuloDTO.fecha);
          // console.log("fecha correcta");
          // console.log(fechaCorrecta);

          this.comprasService
            .guardarMovimiento(this.movimientoArticuloDTO)
            .subscribe(resp => {
              console.log("entre :V");
            });
        }
      });

      // }
    });

    alert("SE GUARDO UN NUEVO PEDIDO");
    window.history.back();
    // for (let index = 0; index < this.movimientoArticulosDTO.length; index++) {
    //   const element = array[index];
  }
  listaProveedor() {
    this.comprasService.listarProveedoresHabilitados().subscribe(data => {
      this.proveedores = data.data;
      this.proveedores.sort((a,b) => a.razonSocial.length - b.razonSocial.length)

      // this.razonSocial = this.proveedores[0].razonSocial;
    });
  }
  fetchEvent2() {
    return this.comprasService
      .listarArticuloHabilitados()
      .toPromise()
      .then(data => {
        this.articulos = data.data;
        this.articulosFilter = this.articulos;
      });
  }
  fetchEvent() {
    return this.comprasService
      .listarStockArticulo()
      .toPromise()
      .then(data => {
        this.articulos.forEach((a, index) => {
          this.stockArticulo.push(data.data[a.id]);
        });
      });
  }
  volverAtras() {
    window.history.back();
  }

  async listarFiltro() {
    this.articulosFilter = [];

    // ;

    if( this.razonSocial === ' ') {
      this.articulosFilter = this.articulos;
      this.movimientoFilter = this.movimientoArticulosDTO;
    } else {
      await this.articulos.forEach(p => (p.proveedorId.razonSocial === this.razonSocial) ? this.articulosFilter.push(p) : false);
      // (p.id == this.movimientoFilter) ? this.articulosFilter.push(p) : false;

      // if(p.proveedorId.razonSocial === this.razonSocial){
      //   this.articulosFilter.push(p);

        // this.movimientoArticulosDTO.filter( (w) => p.id == w.articuloId );
      // }
      this.movimientoFilter = [];
      console.warn('Movimiento filter');

      for( let articulo of this.articulosFilter) {
        for( let movimiento of this.movimientoArticulosDTO) {
          if( movimiento.articuloId == articulo.id){
            this.movimientoFilter.push(movimiento);

            console.log(movimiento.articuloId + ' - ' + articulo.id);
          }

          }
      }
      // for( let movimiento of this.movimientoArticulosDTO) {
      //   for( let articulo of this.articulosFilter) {
      //     if( movimiento.articuloId == articulo.id){
      //       this.movimientoFilter.push(movimiento);
      //     }
      //   }
      // }

      // this.movimientoArticulosDTO.forEach((w, index) => {
      //   this.articulosFilter.forEach( q => (w.articuloId == q.id) ? ) q.movimiento = this.movimientoFilter[index].movimiento
      //   (this.articulosFilter[index].id == w.articuloId)? w.movimiento = this.movimientoFilter[index].movimiento : false
      // });


    }
    console.error('Sali');

    console.log('Movimiento Filter');

    console.log(this.movimientoFilter);

    console.log('Movimiento articulo');
    console.log(this.movimientoArticulosDTO);

    // this.movimientoArticulosDTO.forEach( (p, index) => console.log(`Articulo  ${index} : - ${p.movimiento} `));
  }

  actualizarStockFiltro(articulosFilter: Articulo[] ) {
    this.stockArticulo = [];
    return this.comprasService
    .listarStockArticulo()
    .toPromise()
    .then(data => {
      articulosFilter.forEach((a, index) => {
        this.stockArticulo.push(data.data[a.id]);
      });
    });
  }
  guardarCarga() {
    console.log('Entre');
  }




  jsonStringDate(jdate): string {
    if (jdate != null) {
      const resp = new Date(jdate);
      return resp.toISOString().substring(0, 10);
    }
    return "";
  }
}

