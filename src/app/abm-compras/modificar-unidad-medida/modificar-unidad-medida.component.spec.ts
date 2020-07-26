import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUnidadMedidaComponent } from './modificar-unidad-medida.component';

describe('ModificarUnidadMedidaComponent', () => {
  let component: ModificarUnidadMedidaComponent;
  let fixture: ComponentFixture<ModificarUnidadMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarUnidadMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
