import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarBancoComponent } from './modificar-banco.component';

describe('ModificarBancoComponent', () => {
  let component: ModificarBancoComponent;
  let fixture: ComponentFixture<ModificarBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
