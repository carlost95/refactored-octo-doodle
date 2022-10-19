import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaPorMesComponent } from './venta-por-mes.component';

describe('VentaPorMesComponent', () => {
  let component: VentaPorMesComponent;
  let fixture: ComponentFixture<VentaPorMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaPorMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaPorMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
