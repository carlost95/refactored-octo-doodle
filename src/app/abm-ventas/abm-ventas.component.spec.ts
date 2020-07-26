import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmVentasComponent } from './abm-ventas.component';

describe('AbmVentasComponent', () => {
  let component: AbmVentasComponent;
  let fixture: ComponentFixture<AbmVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
