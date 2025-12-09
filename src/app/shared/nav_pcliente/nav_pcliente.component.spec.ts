import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPclienteComponent } from './nav_pcliente.component';

describe('NavPclienteComponent', () => {
  let component: NavPclienteComponent;
  let fixture: ComponentFixture<NavPclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavPclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});