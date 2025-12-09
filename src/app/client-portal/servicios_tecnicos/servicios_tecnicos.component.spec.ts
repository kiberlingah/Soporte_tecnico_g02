import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosTecnicosComponent } from './servicios_tecnicos.component';

describe('ServiciosTecnicosComponent', () => {
  let component: ServiciosTecnicosComponent;
  let fixture: ComponentFixture<ServiciosTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosTecnicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
