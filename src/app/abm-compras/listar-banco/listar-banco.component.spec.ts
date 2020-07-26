import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBancoComponent } from './listar-banco.component';

describe('ListarBancoComponent', () => {
  let component: ListarBancoComponent;
  let fixture: ComponentFixture<ListarBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
