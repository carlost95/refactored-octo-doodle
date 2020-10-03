import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAjusteComponent } from './listar-ajuste.component';

describe('ListarAjunteComponent', () => {
  let component: ListarAjusteComponent;
  let fixture: ComponentFixture<ListarAjusteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListarAjusteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAjusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
