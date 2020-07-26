import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSubRubroComponent } from './modificar-sub-rubro.component';

describe('ModificarSubRubroComponent', () => {
  let component: ModificarSubRubroComponent;
  let fixture: ComponentFixture<ModificarSubRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarSubRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarSubRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
