import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuVentasComponent } from './sub-menu-ventas.component';

describe('SubMenuVentasComponent', () => {
  let component: SubMenuVentasComponent;
  let fixture: ComponentFixture<SubMenuVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubMenuVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
