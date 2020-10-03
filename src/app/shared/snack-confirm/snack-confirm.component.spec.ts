import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackConfirmComponent } from './snack-confirm.component';

describe('SnackConfirmComponent', () => {
  let component: SnackConfirmComponent;
  let fixture: ComponentFixture<SnackConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
