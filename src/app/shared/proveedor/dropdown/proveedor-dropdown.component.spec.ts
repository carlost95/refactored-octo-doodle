import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorDropdownComponent } from './proveedor-dropdown.component';

describe('ProveedorDropdownComponent', () => {
  let component: ProveedorDropdownComponent;
  let fixture: ComponentFixture<ProveedorDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
