import { Departamento } from "../../../../models/Departamento";
import { Distrito } from "../../../../models/Distrito";
import {Component, Inject, OnInit} from "@angular/core";
import {DistritoService} from "../../../../service/distrito.service";
import {DepartamentosService} from "../../../../service/departamentos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-agregar-distrito",
  templateUrl: "./agregar-distrito.component.html",
  styleUrls: ["./agregar-distrito.component.css"]
})
export class AgregarDistritoComponent implements OnInit {

  distritoForm: FormGroup;
  distrito: Distrito = new Distrito();
  distritos: Distrito[] = [];
  departamentos: Departamento[] = [];
  consultar: boolean = false;
  updating: boolean = false;

  constructor(
    private distritoService: DistritoService,
    private departamentoService: DepartamentosService,
    public dialogRef: MatDialogRef<AgregarDistritoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.departamentoService.getActive().subscribe(resp => {
      this.departamentos = resp.data;
      this.initForm(resp.data);
    });
  }

  private initForm(data: any) {
    const {distrito} = this.data;
    if (distrito) {
      this.consultar = this.data.consultar;
      this.distritoForm = this.formBuilder.group({
        id: [distrito.id, null],
        nombre: [{value: distrito.nombre, disabled: this.consultar}, Validators.required],
        abreviatura: [{value: distrito.abreviatura, disabled: this.consultar}, Validators.required],
        departamento: [{value: distrito.departamento, disabled: this.consultar}, Validators.required],
        estado: [{value: distrito.estado, disabled: this.consultar}, null],
      });
      this.updating = !this.consultar;
    } else {
      this.distritoForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        abreviatura: ['', Validators.required],
        departamento: ['', Validators.required],
        estado: ['', null],
      })
    }
  }

  nuevoDistrito(distrito: Distrito) {
    // this.distrito.idDepartamento = 1;
    //
    // this.departamentos.forEach(departamento => {
    //   if (departamento.nombre == this.nombreDepto) {
    //     this.distrito.idDepartamento = departamento.id;
    //   }
    // });
    //
    // for (var i = 0; i < this.departamentos.length; i++) {
    //   if (this.departamentos[i].nombre == this.nombreDepto) {
    //     this.distrito.idDepartamento = this.departamentos[i].id;
    //   }
    // }
    // this.distrito.habilitacion = 1;
    // this.service.guardarDistrito(this.distrito).subscribe(data => {
    //   alert("se guardo un nuevo distrto");
    //   window.history.back();
    // });
  }

  listarDepartamentos(filterVal: any) {
    // if (filterVal == "0") this.departamentosFilter = this.departamentos;
    // else
    //   this.departamentosFilter = this.departamentos.filter(
    //     item => item.nombre == filterVal
    //   );
  }

  validate($event: KeyboardEvent) {

  }

  close() {

  }

  onSubmit() {

  }


}
