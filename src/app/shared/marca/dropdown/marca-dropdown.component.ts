import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MarcaRest} from '@models/marca-rest';
import {MarcasService} from '@service/marcas.service';

@Component({
  selector: 'marca-dropdown',
  templateUrl: './marca-dropdown.component.html',
  styleUrls: ['./marca-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MarcaDropdownComponent),
    multi: true
  }]
})
export class MarcaDropdownComponent implements ControlValueAccessor, OnInit{

  marcas: MarcaRest[] = [];
  @Input() consulta: boolean;
  @Input() formControlName: string;
  control: AbstractControl;
  isLoading = true;

  // tslint:disable-next-line:no-output-rename
  @Output('marcaChange') marcaId: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private readonly marcaService: MarcasService,
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
      this.marcaService.obtenerMarcas()
        .subscribe((marcas: MarcaRest[]) => {
          this.marcas = marcas;
          this.isLoading = false;
        });
    } else {
      this.marcaService.obtenerMarcasHabilitadas()
        .subscribe((marcas: MarcaRest[]) => {
          this.marcas = marcas;
          this.isLoading = false;
        });
    }
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer?.control?.get(this.formControlName);
    }

  }

  onChange(event: any): void {
    this.marcaId.emit(event.value);
  }

}

