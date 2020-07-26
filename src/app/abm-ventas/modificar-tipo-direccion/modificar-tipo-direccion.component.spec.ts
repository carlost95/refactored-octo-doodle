import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoDireccionComponent } from './modificar-tipo-direccion.component';

describe('ModificarTipoDireccionComponent', () => {
  let component: ModificarTipoDireccionComponent;
  let fixture: ComponentFixture<ModificarTipoDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarTipoDireccionComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTipoDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
