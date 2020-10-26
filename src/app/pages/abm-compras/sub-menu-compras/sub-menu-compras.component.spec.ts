import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuComprasComponent } from './sub-menu-compras.component';

describe('SubMenuComprasComponent', () => {
  let component: SubMenuComprasComponent;
  let fixture: ComponentFixture<SubMenuComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubMenuComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
