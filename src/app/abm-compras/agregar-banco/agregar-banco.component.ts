import {Banco} from "./../../modelo/Banco";
import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {BancosService} from "../../service/bancos.service";

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

  constructor(private service: BancosService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AgregarBancoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Banco) {
  }


  ngOnInit() {
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
        abreviatura: ['',null]
      })
    }

  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.errorInForm = this.submitted && this.bancoForm.invalid;
    this.submitted = true;
    if (this.errorInForm) {
      console.log('Error en los datos')
    } else {
      this.makeDTO();
      console.log(this.bancoForm.controls.nombre.value)
      console.log(this.bancoForm.controls.abreviatura.value)
    }

  }

  makeDTO() {
    this.banco.nombre = this.bancoForm.controls.nombre.value;
    this.banco.abreviatura = this.bancoForm.controls.abreviatura.value;
    if (this.updating){
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
}
