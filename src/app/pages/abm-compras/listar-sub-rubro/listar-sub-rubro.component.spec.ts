import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSubRubroComponent } from './listar-sub-rubro.component';

describe('ListarSubRubroComponent', () => {
  let component: ListarSubRubroComponent;
  let fixture: ComponentFixture<ListarSubRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarSubRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSubRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
