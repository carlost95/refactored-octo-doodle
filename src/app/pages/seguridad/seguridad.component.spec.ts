import { SeguridadComponent } from './seguridad.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('SeguridadComponent', () => {
  let component: SeguridadComponent;
  let fixture: ComponentFixture<SeguridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
