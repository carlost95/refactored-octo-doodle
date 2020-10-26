import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmComprasComponent } from './abm-compras.component';

describe('AbmComprasComponent', () => {
  let component: AbmComprasComponent;
  let fixture: ComponentFixture<AbmComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
