import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDepartamentoComponent } from './modificar-departamento.component';

describe('ModificarDepartamentoComponent', () => {
  let component: ModificarDepartamentoComponent;
  let fixture: ComponentFixture<ModificarDepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarDepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
