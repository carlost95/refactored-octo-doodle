import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoDoreccionComponent } from './agregar-tipo-direccion.component';

describe('AgregarTipoDoreccionComponent', () => {
  let component: AgregarTipoDoreccionComponent;
  let fixture: ComponentFixture<AgregarTipoDoreccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoDoreccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoDoreccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
