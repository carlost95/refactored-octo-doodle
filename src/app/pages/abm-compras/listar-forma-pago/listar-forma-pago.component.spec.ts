import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFormaPagoComponent } from './listar-forma-pago.component';

describe('ListarFormaPagoComponent', () => {
  let component: ListarFormaPagoComponent;
  let fixture: ComponentFixture<ListarFormaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarFormaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
