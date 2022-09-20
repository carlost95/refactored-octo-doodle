import { DistritoService } from './../../../service/distrito.service';
import { DistritoRest } from '../../../models/distrito-rest';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'distrito-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DistritoDropdownComponent),
      multi: true,
    },
  ],
})
export class DistritoDropdownComponent implements ControlValueAccessor, OnInit {
  distritos: DistritoRest[] = [];
  control: AbstractControl;
  @Input() formControlName: string;
  @Input() classNames = 'w-100';
  @Output('distritoChange') idDistrito: EventEmitter<number> =
    new EventEmitter<number>();


  constructor(
    private readonly distritoService: DistritoService,
    private controlContainer: ControlContainer
  ) { }
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {
    this.distritoService.listarDistritosHabilitados()
      .subscribe((distritos: DistritoRest[]) => (this.distritos = distritos));
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer?.control?.get(this.formControlName);
    }
  }
  onChange(event: any): void {
    this.idDistrito.emit(event.value);
  }
}
