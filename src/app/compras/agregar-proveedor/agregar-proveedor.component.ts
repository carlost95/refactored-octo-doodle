import { Component, OnInit, Inject } from '@angular/core';
import { ProveedoresService } from '../../service/proveedores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proveedor } from '../../modelo/Proveedor';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {
  proveedor: Proveedor = new Proveedor();
  proveedorForm: FormGroup;
  errorInForm = false;
  submitted = false;
  updating = false;

  constructor(
    private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proveedor) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    if (this.data) {
      this.proveedorForm = this.formBuilder.group({
        id: [this.data.id, null],
        razonSocial: [this.data.razonSocial, Validators.required],
        domicilio: [this.data.domicilio, Validators.required],
        mail: [this.data.mail, Validators.required],
        celular: [this.data.celular, Validators.required],
        telefono: [this.data.telefono, Validators.required]
      })
      this.updating = true;
    } else {
      this.proveedorForm = this.formBuilder.group({
        razonSocial: ['', Validators.required],
        domicilio: ['', null]
      })
    }
  }

  // guardarProveedor(proveedor: Proveedor) {
  //   console.log("muestra de Proveedor===>");
  //   this.proveedor.id = null;
  //   console.log(proveedor);

  //   // this.proveedor.id = null;
  //   this.proveedor.razonSocial = this.proveedor.razonSocial.toUpperCase();
  //   this.proveedor.domicilio = this.proveedor.domicilio.toUpperCase();
  //   this.proveedor.habilitacion= 1;
  //   this.comprasService.guardarProveedor(this.proveedor).subscribe(data => {
  //     this.proveedor = data;
  //     alert("SE GUARDO UN NUEVO PROVEEDOR");
  //     window.history.back();
  //   });
  // }
  // tslint:disable-next-line: typedef
  // guardarProveedor(proveedot: Proveedor) {
  //   console.log(this.proveedor);
  //   this.proveedor.habilitado = 1;
  //   this.proveedor.id = null;
  //   this.proveedorService.guardarProveedor(this.proveedor).subscribe(data => {
  //     this.proveedor = data.data;
  //     alert('se guardo un nuevo proveedor');
  //     window.history.back();
  //   });
  // }
  // tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }
  // tslint:disable-next-line: typedef
  onSubmit() {
    this.errorInForm = this.submitted && this.proveedorForm.invalid;
    this.submitted = true;
    if (this.errorInForm) {
      console.log('Error en los datos')
    } else {
      this.makeDTO();
      console.log(this.proveedorForm.controls.razonScial.value)
      console.log(this.proveedorForm.controls.abreviatura.value)
    }

  }
  // tslint:disable-next-line: typedef
  makeDTO() {
    this.proveedor.razonSocial = this.proveedorForm.controls.nombre.value;
    this.proveedor.domicilio = this.proveedorForm.controls.abreviatura.value;
    if (this.updating) {
      this.proveedor.id = this.proveedorForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }
  // tslint:disable-next-line: typedef
  save() {
    this.proveedorService.guardarProveedor(this.proveedor).subscribe(data => {
      this.proveedor = data.data;
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line: typedef
  private update() {
    this.proveedorService.actualizarProveedor(this.proveedor).subscribe(data => {
      this.proveedor = data.data;
      this.dialogRef.close();
    });
  }
}
