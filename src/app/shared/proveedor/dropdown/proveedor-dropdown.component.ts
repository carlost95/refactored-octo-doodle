import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ProveedorRest} from '@models/proveedor-rest';
import {ProveedoresService} from '@service/proveedores.service';
import {Proveedor} from '@models/Proveedor';

@Component({
  selector: 'proveedor-dropdown',
  templateUrl: './proveedor-dropdown.component.html',
  styleUrls: ['./proveedor-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProveedorDropdownComponent),
    multi: true
  }]
})
export class ProveedorDropdownComponent implements ControlValueAccessor, OnInit{

  proveedores: ProveedorRest[] | Proveedor[] = [];
  @Input() consulta: boolean;
  @Input() formControlName: string;
  control: AbstractControl;
  isLoading = true;

  // tslint:disable-next-line:no-output-rename
  @Output('proveedorChange') proveedorId: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private readonly proveedorService: ProveedoresService,
    private controlContainer: ControlContainer) {
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit(): void {
    if (this.consulta){
    this.proveedorService.getAllProveedores()
      .subscribe((proveedores: ProveedorRest[] | Proveedor[]) => {
        console.log(proveedores)
        this.proveedores = proveedores;
        this.isLoading = false;
      });
  } else {
    this.proveedorService.getEnabledSupplier()
      .subscribe((proveedores: ProveedorRest[]| Proveedor[]) => {
        this.proveedores = proveedores;
        this.isLoading = false;
      });
  }
    if (this.controlContainer && this.formControlName) {
    this.control = this.controlContainer?.control?.get(this.formControlName);
  }

}

  onChange(event: any): void {
    this.proveedorId.emit(event.value);
  }

}

