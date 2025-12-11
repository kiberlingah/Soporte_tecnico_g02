import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalTecnicoComponent } from './portal-tecnico.component';

describe('PortalTecnicoComponent', () => {
  let component: PortalTecnicoComponent;
  let fixture: ComponentFixture<PortalTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalTecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
