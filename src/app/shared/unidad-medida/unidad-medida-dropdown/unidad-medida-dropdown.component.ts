import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {UnidadMedidaRest} from '@models/unidad-medida-rest';
import {UnidadMedidaService} from '@service/unidad-medida.service';

@Component({
  selector: 'unidad-medida-dropdown',
  templateUrl: './unidad-medida-dropdown.component.html',
  styleUrls: ['./unidad-medida-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UnidadMedidaDropdownComponent),
      multi: true
    }
  ]
})
export class UnidadMedidaDropdownComponent implements ControlValueAccessor, OnInit {

  unidadesDeMedida: UnidadMedidaRest[] = [];
  @Input() consulta: boolean;
  @Input() formControlName: string;
  control: AbstractControl;
  isLoading = true;

  @Output('unidadChange') unidadId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly unidadDeMedidaService: UnidadMedidaService,
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
      this.unidadDeMedidaService.obtenerUnidadesMedida()
        .subscribe((unidadesDeMedida: UnidadMedidaRest[]) => {
          this.unidadesDeMedida = unidadesDeMedida;
          this.isLoading = false;
        });
    } else {
      this.unidadDeMedidaService.obtenerUnidadesMedidaHabilitadas()
        .subscribe((unidadesDeMedida: UnidadMedidaRest[]) => {
          this.unidadesDeMedida = unidadesDeMedida;
          this.isLoading = false;
        });
    }
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer?.control?.get(this.formControlName);
    }

  }

  onChange(event: any): void {
    this.unidadId.emit(event.value);
  }

}
