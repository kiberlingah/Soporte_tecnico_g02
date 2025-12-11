import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaspAdminComponent } from './citasp-admin.component';

describe('CitaspAdminComponent', () => {
  let component: CitaspAdminComponent;
  let fixture: ComponentFixture<CitaspAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaspAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaspAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
