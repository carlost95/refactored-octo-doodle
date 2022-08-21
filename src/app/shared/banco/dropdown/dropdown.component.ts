import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {BancosService} from '@service/bancos.service';
import {BancoRest} from '@models/banco-rest';
import {AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'banco-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
})
export class DropdownComponent implements ControlValueAccessor, OnInit {

  bancos: BancoRest[] = [];
  @Input() formControlName: string;
  control: AbstractControl;


  @Output('bancoChange') idBanco: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly bancoService: BancosService,
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
    this.bancoService.obtenerHabilitados()
      .subscribe((bancos: BancoRest[]) => this.bancos = bancos);
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer?.control?.get(this.formControlName);
    }

  }

  onChange(event: any): void {
    this.idBanco.emit(event.value);
  }

}
