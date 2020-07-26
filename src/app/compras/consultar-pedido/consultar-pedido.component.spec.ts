import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPedidoComponent } from './consultar-pedido.component';

describe('ConsultarPedidoComponent', () => {
  let component: ConsultarPedidoComponent;
  let fixture: ComponentFixture<ConsultarPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
