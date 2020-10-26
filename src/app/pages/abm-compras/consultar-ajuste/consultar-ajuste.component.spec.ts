import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAjusteComponent } from './consultar-ajuste.component';

describe('ConsultarAjusteComponent', () => {
  let component: ConsultarAjusteComponent;
  let fixture: ComponentFixture<ConsultarAjusteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarAjusteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarAjusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
