import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SubRubroRest} from '@models/subrubro-rest';
import {SubRubroService} from '@service/sub-rubro.service';

@Component({
  selector: 'subrubro-dropdown',
  templateUrl: './subrubro-dropdown.component.html',
  styleUrls: ['./subrubro-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SubrubroDropdownComponent),
    multi: true
  }]
})
export class SubrubroDropdownComponent implements ControlValueAccessor, OnInit{

  subrubros: SubRubroRest[] = [];
  @Input() consulta: boolean;
  @Input() formControlName: string;
  control: AbstractControl;
  isLoading = true;

  @Output('subrubroChange') subrubroId: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private readonly subrubroService: SubRubroService,
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
    this.subrubroService.obtenerSubRubros()
      .subscribe((subrubros: SubRubroRest[]) => {
        this.subrubros = subrubros;
        this.isLoading = false;
      });
  } else {
    this.subrubroService.obtenerHabilitados()
      .subscribe((subrubros: SubRubroRest[]) => {
        this.subrubros = subrubros;
        this.isLoading = false;
      });
  }
    if (this.controlContainer && this.formControlName) {
    this.control = this.controlContainer?.control?.get(this.formControlName);
  }

}

  onChange(event: any): void {
    this.subrubroId.emit(event.value);
  }

}
