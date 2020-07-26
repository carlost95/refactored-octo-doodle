import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRubroComponent } from './listar-rubro.component';

describe('ListarRubroComponent', () => {
  let component: ListarRubroComponent;
  let fixture: ComponentFixture<ListarRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
