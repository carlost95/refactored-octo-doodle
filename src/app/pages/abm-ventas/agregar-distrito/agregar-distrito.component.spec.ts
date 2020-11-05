import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDistritoComponent } from './agregar-distrito.component';

describe('AgregarDistritoComponent', () => {
  let component: AgregarDistritoComponent;
  let fixture: ComponentFixture<AgregarDistritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDistritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
