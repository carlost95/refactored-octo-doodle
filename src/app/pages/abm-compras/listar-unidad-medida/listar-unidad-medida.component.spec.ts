import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUnidadMedidaComponent } from './listar-unidad-medida.component';

describe('ListarUnidadMedidaComponent', () => {
  let component: ListarUnidadMedidaComponent;
  let fixture: ComponentFixture<ListarUnidadMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarUnidadMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
