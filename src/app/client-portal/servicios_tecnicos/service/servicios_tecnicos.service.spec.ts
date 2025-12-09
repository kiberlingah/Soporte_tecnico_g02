import { TestBed } from '@angular/core/testing';

import { ServiciosTecnicosService } from './servicios_tecnicos.service';

describe('ServiciosTecnicosService', () => {
  let service: ServiciosTecnicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosTecnicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});