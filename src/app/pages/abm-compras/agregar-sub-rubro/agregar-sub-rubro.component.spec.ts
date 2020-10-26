import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSubRubroComponent } from './agregar-sub-rubro.component';

describe('AgregarSubRubroComponent', () => {
  let component: AgregarSubRubroComponent;
  let fixture: ComponentFixture<AgregarSubRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarSubRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSubRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
