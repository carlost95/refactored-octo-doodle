import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarArticulosComponent } from './listar-articulos.component';

describe('ListarArticulosComponent', () => {
  let component: ListarArticulosComponent;
  let fixture: ComponentFixture<ListarArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
