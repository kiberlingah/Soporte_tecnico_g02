import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaspTecnicoComponent } from './citasp-tecnico.component';

describe('CitaspTecnicoComponent', () => {
  let component: CitaspTecnicoComponent;
  let fixture: ComponentFixture<CitaspTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaspTecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaspTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
