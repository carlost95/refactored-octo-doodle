import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {RubroRest} from '@models/rubro-rest';
import {RubrosService} from '@service/rubros.service';

@Component({
  selector: 'rubro-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubRubroDropdownComponent),
      multi: true
    }
  ]
})
export class SubRubroDropdownComponent  implements ControlValueAccessor, OnInit {

  rubros: RubroRest[] = [];
  @Input() consulta: boolean
  @Input() formControlName: string;
  control: AbstractControl;
  isLoading = true;


  @Output('rubroChange') rubroId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly rubroService: RubrosService,
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
    if(this.consulta){
      this.rubroService.obtenerRubros()
        .subscribe((rubros: RubroRest[]) => {
          this.rubros = rubros;
          this.isLoading = false;
        });
    } else {
      this.rubroService.obtenerHabilitados()
        .subscribe((rubros: RubroRest[]) => {
          this.rubros = rubros;
          this.isLoading = false;
        });
    }
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer?.control?.get(this.formControlName);
    }

  }

  onChange(event: any): void {
    this.rubroId.emit(event.value);
  }

}
