import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAjunteComponent } from './listar-ajunte.component';

describe('ListarAjunteComponent', () => {
  let component: ListarAjunteComponent;
  let fixture: ComponentFixture<ListarAjunteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAjunteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAjunteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
