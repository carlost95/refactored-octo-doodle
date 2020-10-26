import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAjusteComponent } from './agregar-ajuste.component';

describe('AgregarAjusteComponent', () => {
  let component: AgregarAjusteComponent;
  let fixture: ComponentFixture<AgregarAjusteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAjusteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAjusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
