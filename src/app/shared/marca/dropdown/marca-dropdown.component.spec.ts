import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaDropdownComponent } from './marca-dropdown.component';

describe('MarcaDropdownComponent', () => {
  let component: MarcaDropdownComponent;
  let fixture: ComponentFixture<MarcaDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
