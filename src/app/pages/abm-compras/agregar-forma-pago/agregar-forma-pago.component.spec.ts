import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFormaPagoComponent } from './agregar-forma-pago.component';

describe('AgregarFormaPagoComponent', () => {
  let component: AgregarFormaPagoComponent;
  let fixture: ComponentFixture<AgregarFormaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarFormaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
