import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubrubroDropdownComponent } from './subrubro-dropdown.component';

describe('SubrubroDropdownComponent', () => {
  let component: SubrubroDropdownComponent;
  let fixture: ComponentFixture<SubrubroDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubrubroDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubrubroDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
