import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BancosService} from '@service/bancos.service';
import {TipoModal} from '@shared/models/tipo-modal.enum';
import {BancoRest} from '@models/banco-rest';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackConfirmComponent} from '@shared/snack-confirm/snack-confirm.component';

@Component({
  selector: 'app-agregar-banco',
  templateUrl: './agregar-banco.component.html',
  styleUrls: ['./agregar-banco.component.scss']
})
export class AgregarBancoComponent implements OnInit {
  bancoForm: FormGroup;
  errorInForm = false;
  submitted = false;
  titulo: string;
  tipoModal: TipoModal;
  bancos: BancoRest[] = [];
  banco: BancoRest = new BancoRest();

  constructor(private service: BancosService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AgregarBancoComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.tipoModal = this.data.tipo;
    this.service.obtenerBancos().subscribe(bancos => this.bancos = bancos);

    if (this.tipoModal === TipoModal.consulta || this.tipoModal === TipoModal.actualizacion) {
      this.establecerModalDatos(this.data, this.tipoModal);
    } else {
      this.establecerModalVacio();
    }
  }

  establecerModalDatos(data, tipoModal): void {
    const {banco} = data;
    const disabled = tipoModal === TipoModal.consulta ? true : false;
    this.bancoForm = this.formBuilder.group({
      id: [{value: banco.idBanco, disabled}, null],
      nombre: [{value: banco.nombre, disabled}, Validators.required],
      abreviatura: [{value: banco.abreviatura, disabled}, Validators.required],
      habilitado: [{value: banco.habilitado, disabled}, null]
    });
  }

  establecerModalVacio(): void {
    this.bancoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      abreviatura: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.bancoForm.invalid;
    if (this.errorInForm) {
      this.bancoForm.controls.nombre.markAsTouched();
      this.bancoForm.controls.abreviatura.markAsTouched();
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    console.log(this.bancoForm);
    this.banco.nombre = this.bancoForm.controls.nombre.value.trim().toUpperCase();
    this.banco.abreviatura = this.bancoForm.controls.abreviatura.value.trim().toUpperCase();
    if (this.tipoModal === TipoModal.actualizacion) {
      this.banco.idBanco = this.bancoForm.controls.id.value;
      this.banco.habilitado = this.bancoForm.controls.habilitado.value;
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    this.service.guardar(this.banco).subscribe(data => {
      this.msgSnack('Guardado con éxito');
    }, ({error}) => {
      this.openSnackBar(error);
    });

  }


  update(): void {
    this.service.actualizar(this.banco).subscribe(data => {
      this.msgSnack('Actualizado con éxito');
    }, ({error}) => {
      this.openSnackBar(error);
    });
  }

  msgSnack(data): void {
    this.dialogRef.close(data);
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}

