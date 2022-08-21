import {Component, Inject, OnInit} from '@angular/core';
import {ProveedoresService} from '@service/proveedores.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Proveedor} from '@models/Proveedor';
import {TipoModal} from '@app/pages/compras/proveedores/model/tipo-modal.enum';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {
  proveedorForm: FormGroup;
  proveedor: Proveedor = new Proveedor();
  proveedores: Proveedor[] = [];
  errorInForm = false;
  submitted = false;
  updating = false;
  nombreRepe = false;
  consulting: boolean;

  titulo: string;
  tipoModal: TipoModal;

  constructor(
    private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.titulo = this.data.titulo.value;
    this.tipoModal = this.data.tipoModal;

    if (this.tipoModal === TipoModal.consulta || this.tipoModal === TipoModal.actualizacion){
      this.establecerModalDatos(this.data, this.tipoModal);
    } else {
      this.establecerModalVacio();
    }
  }

  establecerModalDatos(data: any, tipoModal: TipoModal): void {
    const {proveedor} = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.proveedorForm = this.formBuilder.group({
      id: [{value: proveedor.id, disabled}, null],
      razonSocial: [{value: proveedor.razonSocial, disabled}, Validators.required],
      domicilio: [{value: proveedor.domicilio, disabled}, Validators.required],
      mail: [{value: proveedor.mail, disabled}, Validators.required],
      celular: [{value: proveedor.celular, disabled}, null],
      telefono: [{value: proveedor.telefono, disabled}, null],
      bancos: [{value: proveedor.bancos, disabled}, Validators.required]
    });
    return;
  }

  establecerModalVacio(): void{
    this.proveedorForm = this.formBuilder.group({
      razonSocial: ['', Validators.required],
      domicilio: ['', Validators.required],
      mail: ['', Validators.required],
      celular: ['', null],
      telefono: ['', null],
      bancos: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.proveedorForm);
    this.submitted = true;
    this.errorInForm = this.submitted && this.proveedorForm.invalid;

    if (this.errorInForm || this.nombreRepe) {
      this.proveedorForm.controls.razonSocial.markAllAsTouched();
      this.proveedorForm.controls.domicilio.markAllAsTouched();
      this.proveedorForm.controls.mail.markAllAsTouched();
      this.proveedorForm.controls.bancos.markAllAsTouched();
      console.log('Error en los datos');

    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    console.log(this.proveedorForm.value);
    this.proveedor.razonSocial = (this.proveedorForm.controls.razonSocial.value).trim().toUpperCase();
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

  private save(): void {
    this.proveedorService.guardarProveedor(this.proveedor).subscribe(data => {
      this.msgSnack(data);
    });
  }

  private update(): void {
    this.proveedorService.actualizarProveedor(this.proveedor).subscribe(data => {
      this.msgSnack(data);
    });
  }

  validar({target}): void {
    const {value: nombre} = target;
    const finded = this.proveedores.find(p => p.razonSocial.toLowerCase() === nombre.toLowerCase().trim());
    this.nombreRepe = (finded !== undefined) ? true : false;
    console.log(nombre)
  }

  msgSnack(data): void {
    const {msg} = data;
    if (data.code === 200) {
      this.dialogRef.close(msg);
    } else {
      this.dialogRef.close('Error en el proceso');
    }
  }

  establecerBanco(idBanco: number): void {
    this.proveedorForm.patchValue({bancos: idBanco});
  }
}
