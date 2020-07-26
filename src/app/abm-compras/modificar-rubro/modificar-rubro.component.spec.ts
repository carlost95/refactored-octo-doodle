import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRubroComponent } from './modificar-rubro.component';

describe('ModificarRubroComponent', () => {
  let component: ModificarRubroComponent;
  let fixture: ComponentFixture<ModificarRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
