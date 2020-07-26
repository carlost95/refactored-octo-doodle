import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoDireccionComponent } from './listar-tipo-direccion.component';

describe('ListarTipoDireccionComponent', () => {
  let component: ListarTipoDireccionComponent;
  let fixture: ComponentFixture<ListarTipoDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTipoDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTipoDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
