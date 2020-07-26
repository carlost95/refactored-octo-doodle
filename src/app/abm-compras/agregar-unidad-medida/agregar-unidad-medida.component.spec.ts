import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUnidadMedidaComponent } from './agregar-unidad-medida.component';

describe('AgregarUnidadMedidaComponent', () => {
  let component: AgregarUnidadMedidaComponent;
  let fixture: ComponentFixture<AgregarUnidadMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarUnidadMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
