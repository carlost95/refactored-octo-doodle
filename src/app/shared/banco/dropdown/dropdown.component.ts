import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BancosService} from '@service/bancos.service';
import {BancoRest} from '@models/banco-rest';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'banco-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  bancos: BancoRest[] = [];

  @Output('bancoChange') idBanco: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly bancoService: BancosService) { }

  ngOnInit(): void {
    this.bancoService.obtenerHabilitados()
      .subscribe((bancos: BancoRest[]) => this.bancos = bancos);
  }

  onChange(event: any): void {
    this.idBanco.emit(event.value);
  }

}
