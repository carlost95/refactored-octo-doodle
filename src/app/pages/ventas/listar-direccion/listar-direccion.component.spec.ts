import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDireccionComponent } from './listar-direccion.component';

describe('ListarDireccionComponent', () => {
  let component: ListarDireccionComponent;
  let fixture: ComponentFixture<ListarDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
