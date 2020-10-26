import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarBancoComponent } from './agregar-banco.component';

describe('AgregarBancoComponent', () => {
  let component: AgregarBancoComponent;
  let fixture: ComponentFixture<AgregarBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
