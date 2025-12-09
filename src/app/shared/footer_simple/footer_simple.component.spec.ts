import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSimpleComponent } from './footer_simple.component';

describe('FooterSimpleComponent', () => {
  let component: FooterSimpleComponent;
  let fixture: ComponentFixture<FooterSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});