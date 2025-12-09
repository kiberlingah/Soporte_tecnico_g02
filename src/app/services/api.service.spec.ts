import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Ejemplo: si ApiService solo tiene helpers
  it('should have a buildUrl method', () => {
    expect(typeof service.buildUrl).toBe('function');
  });
});
