import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTecnicosComponent } from './nav-tecnicos.component';

describe('NavTecnicosComponent', () => {
  let component: NavTecnicosComponent;
  let fixture: ComponentFixture<NavTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavTecnicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
