import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdminEmpComponent } from './nav-admin-emp.component';

describe('NavAdminEmpComponent', () => {
  let component: NavAdminEmpComponent;
  let fixture: ComponentFixture<NavAdminEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAdminEmpComponent ]
    })
    .compileComponents();
      });

  beforeEach(() => {

    fixture = TestBed.createComponent(NavAdminEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
