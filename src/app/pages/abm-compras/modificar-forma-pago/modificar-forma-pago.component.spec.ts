import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFormaPagoComponent } from './modificar-forma-pago.component';

describe('ModificarFormaPagoComponent', () => {
  let component: ModificarFormaPagoComponent;
  let fixture: ComponentFixture<ModificarFormaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarFormaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
