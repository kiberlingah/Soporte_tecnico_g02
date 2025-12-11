import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalAdminEmpComponent } from './portal-admin-emp.component';

describe('PortalAdminEmpComponent', () => {
  let component: PortalAdminEmpComponent;
  let fixture: ComponentFixture<PortalAdminEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalAdminEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalAdminEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
