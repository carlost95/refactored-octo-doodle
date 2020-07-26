import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuSeguridadComponent } from './sub-menu-seguridad.component';

describe('SubMenuSeguridadComponent', () => {
  let component: SubMenuSeguridadComponent;
  let fixture: ComponentFixture<SubMenuSeguridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubMenuSeguridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
