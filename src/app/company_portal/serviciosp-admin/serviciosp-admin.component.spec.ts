import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciospAdminComponent } from './serviciosp-admin.component';

describe('ServiciospAdminComponent', () => {
  let component: ServiciospAdminComponent;
  let fixture: ComponentFixture<ServiciospAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciospAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciospAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
