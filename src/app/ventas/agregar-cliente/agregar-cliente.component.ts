import {Cliente} from "./../../modelo/Cliente";
import {Component, Inject, Input, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClienteService} from "../../service/cliente.service";

@Component({
  selector: "app-agregar-cliente",
  templateUrl: "./agregar-cliente.component.html",
  styleUrls: ["./agregar-cliente.component.css"],
})
export class AgregarClienteComponent implements OnInit {
  client: Cliente = new Cliente();
  updating: boolean = false;
  clientForm: any;
  clients: Cliente[] = [];
  duplicateDni: boolean = false;
  submitted: boolean = false;
  errorInForm: boolean = true;


  constructor(private service: ClienteService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AgregarClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Cliente) {
  }

  ngOnInit() {
    this.service.getAll().subscribe(resp => {
      this.clients = resp.data;
      console.log(resp);
    });

    if (this.data) {
      this.clientForm = this.formBuilder.group({
        id: [this.data.id, null],
        apellido: [this.data.apellido, Validators.required],
        nombre: [this.data.nombre, Validators.required],
        dni: [this.data.dni, Validators.required],
        mail: [this.data.mail, null],
        estado: [this.data.estado, null],
      });
      this.updating = true;
    } else {
      this.clientForm = this.formBuilder.group({
        apellido: ['', Validators.required],
        nombre: ['', Validators.required],
        dni: ['', Validators.required],
        mail: ['', null]
      })
    }
  }
  validar({target}) {
    const {value: dni} = target;
    const finded = this.clients.find(c => dni === c.dni);
    this.duplicateDni = finded ? true : false;
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    this.errorInForm = this.submitted && this.clientForm.invalid;
    if (this.errorInForm || this.duplicateDni) {
      this.clientForm.controls.dni.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO() {
    this.client.apellido = (this.clientForm.controls.apellido.value).trim();
    this.client.nombre = (this.clientForm.controls.nombre.value).trim();
    this.client.dni = (this.clientForm.controls.dni.value).trim();
    this.client.mail = (this.clientForm.controls.mail.value).trim();
    if (this.updating) {
      this.client.id = this.clientForm.controls.id.value;
      this.client.estado = this.clientForm.controls.estado.value;
      this.update();
    } else {
      this.save();
    }
  }


  save() {
    this.service.save(this.client).subscribe(data => {
      this.client = data.data;
      this.dialogRef.close();
    });
  }

  update() {
    // this.service.actualizarBanco(this.banco).subscribe(data => {
    //   this.banco = data.data;
    //   this.dialogRef.close();
    // });
  }
}
