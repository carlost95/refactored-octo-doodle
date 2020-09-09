import { Banco } from "./../../modelo/Banco";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { BancosService } from "../../service/bancos.service";

@Component({
  selector: "app-agregar-banco",
  templateUrl: "./agregar-banco.component.html",
  styleUrls: ["./agregar-banco.component.scss"]
})
export class AgregarBancoComponent implements OnInit {
  banco: Banco = new Banco();
  bancoForm: FormGroup;
  errorInForm: boolean = false;
  submitted = false;
  updating = false;
  nombreRepe = false;
  abreRepe = false;
  bancos: Banco[] = [];

  constructor(private service: BancosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarBancoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Banco) {
  }


  ngOnInit() {
    this.service.listarBancosTodos().subscribe(resp => this.bancos = resp.data);

    if (this.data) {
      this.bancoForm = this.formBuilder.group({
        id: [this.data.id, null],
        nombre: [this.data.nombre, Validators.required],
        abreviatura: [this.data.abreviatura, Validators.required]
      })
      this.updating = true;
    } else {
      this.bancoForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        abreviatura: ['', null]
      })
    }

  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    this.errorInForm = this.submitted && this.bancoForm.invalid;
    if (this.errorInForm || this.nombreRepe || this.abreRepe) {
      this.bancoForm.controls.nombre.markAsTouched();
      this.bancoForm.controls.abreviatura.markAsTouched();
      console.log('Error en los datos')
    } else {
      this.makeDTO();

    }

  }

  makeDTO() {
    this.banco.nombre = this.bancoForm.controls.nombre.value;
    this.banco.abreviatura = this.bancoForm.controls.abreviatura.value;
    if (this.updating) {
      this.banco.id = this.bancoForm.controls.id.value;
      this.update();
    } else {
      this.save();
    }
  }


  save() {
    this.service.guardarBanco(this.banco).subscribe(data => {
      this.banco = data.data;
      this.dialogRef.close();
    });
  }

  private update() {
    this.service.actualizarBanco(this.banco).subscribe(data => {
      this.banco = data.data;
      this.dialogRef.close();
    });
  }
  // tslint:disable-next-line: typedef
  validar({ target }) {
    const { value: nombre } = target;
    const finded = this.bancos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    const finded2 = this.bancos.find(p => p.abreviatura.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
    this.abreRepe = (finded2 !== undefined) ? true : false;
  }
}

