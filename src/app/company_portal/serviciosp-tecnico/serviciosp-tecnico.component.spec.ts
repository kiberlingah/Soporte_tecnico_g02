import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciospTecnicoComponent } from './serviciosp-tecnico.component';

describe('ServiciospTecnicoComponent', () => {
  let component: ServiciospTecnicoComponent;
  let fixture: ComponentFixture<ServiciospTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciospTecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciospTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
