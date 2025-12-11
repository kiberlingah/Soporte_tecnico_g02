import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmpresaComponent } from './login-empresa.component';

describe('LoginEmpresaComponent', () => {
  let component: LoginEmpresaComponent;
  let fixture: ComponentFixture<LoginEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
