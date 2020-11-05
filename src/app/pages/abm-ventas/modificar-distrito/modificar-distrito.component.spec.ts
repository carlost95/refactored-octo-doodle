import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDistritoComponent } from './modificar-distrito.component';

describe('ModificarDistritoComponent', () => {
  let component: ModificarDistritoComponent;
  let fixture: ComponentFixture<ModificarDistritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarDistritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
