import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMarcaComponent } from './modificar-marca.component';

describe('ModificarMarcaComponent', () => {
  let component: ModificarMarcaComponent;
  let fixture: ComponentFixture<ModificarMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
