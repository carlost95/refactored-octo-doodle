import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDireccionComponent } from './agregar-direccion.component';

describe('AgregarDireccionComponent', () => {
  let component: AgregarDireccionComponent;
  let fixture: ComponentFixture<AgregarDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
