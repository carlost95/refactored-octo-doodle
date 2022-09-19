import {Component, OnInit, ViewChild} from '@angular/core';
import {ProveedoresService} from '@service/proveedores.service';
import {Proveedor} from '@models/Proveedor';
import {ArticulosService} from '@service/articulos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ArticuloStock} from '@models/articulo-rest';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ArticuloStock> = new MatTableDataSource<ArticuloStock>();
  proveedores: Proveedor[];
  pedidoForm: FormGroup;
  displayedColumns = ['nombre', 'codigoArt', 'stockActual', 'cantidad' ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly proveedorService: ProveedoresService,
    private readonly articuloService: ArticulosService
  ){}
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.proveedorService
      .getEnabledSupplier()
      .subscribe(proveedores => this.proveedores = proveedores);
    this.inicializarPedidoFormDatos();
  }

  inicializarPedidoFormDatos(): void {
    this.pedidoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }


}

