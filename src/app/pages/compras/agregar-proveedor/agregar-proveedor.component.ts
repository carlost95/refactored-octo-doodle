import {Component, OnInit, Inject} from '@angular/core';
import {ProveedoresService} from '../../../service/proveedores.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Proveedor} from '../../../modelo/Proveedor';
import {LoginComponent} from '../../../login/login.component';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {
  proveedor: Proveedor = new Proveedor();
  proveedorForm: FormGroup;
  proveedores: Proveedor[] = [];
  errorInForm = false;
  submitted = false;
  updating = false;
  nombreRepe = false;
  consulting: boolean;

  constructor(
    private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.proveedorService.listarProveedoresTodos().subscribe(resp =>
      this.proveedores = resp.data);
    const {provider} = this.data;

    if (provider) {
      this.consulting = this.data.consulting;

      this.proveedorForm = this.formBuilder.group({
        id: [{value: provider.id, disabled: this.consulting}, null],
        razonSocial: [{value: provider.razonSocial, disabled: this.consulting}, Validators.required],
        domicilio: [{value: provider.domicilio, disabled: this.consulting}, Validators.required],
        mail: [{value: provider.mail, disabled: this.consulting}, Validators.required],
        celular: [{value: provider.celular, disabled: this.consulting}, null],
        telefono: [{value: provider.telefono, disabled: this.consulting}, null]
      });
      this.updating = !this.consulting;
    } else {
      this.proveedorForm = this.formBuilder.group({
        razonSocial: ['', Validators.required],
        domicilio: ['', Validators.required],
        mail: ['', Validators.required],
        celular: ['', null],
        telefono: ['', null]
      });
    }
  }


// tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }

// tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    this.errorInForm = this.submitted && this.proveedorForm.invalid;

    if (this.errorInForm || this.nombreRepe) {
      this.proveedorForm.controls.razonSocial.markAllAsTouched();
      this.proveedorForm.controls.domicilio.markAllAsTouched();
      this.proveedorForm.controls.mail.markAllAsTouched();
      console.log('Error en los datos');

    } else {
      this.makeDTO();
    }
  }

// tslint:disable-next-line: typedef
  makeDTO() {
    this.proveedor.razonSocial = this.proveedorForm.controls.razonSocial.value;
    this.proveedor.domicilio = this.proveedorForm.controls.domicilio.value;
    this.proveedor.mail = this.proveedorForm.controls.mail.value;
    this.proveedor.telefono = this.proveedorForm.controls.telefono.value;
    this.proveedor.celular = this.proveedorForm.controls.celular.value;
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

  // tslint:disable-next-line:typedef
  validar({target}) {
    const {value: nombre} = target;
    const finded = this.proveedores.find(p => p.razonSocial.toLowerCase() === nombre.toLowerCase().trim());
    console.log(finded);
    this.nombreRepe = (finded !== undefined) ? true : false;

  }
}
