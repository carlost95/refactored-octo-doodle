import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardParadaComponent } from './card-parada.component';

describe('CardParadaComponent', () => {
  let component: CardParadaComponent;
  let fixture: ComponentFixture<CardParadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardParadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardParadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
