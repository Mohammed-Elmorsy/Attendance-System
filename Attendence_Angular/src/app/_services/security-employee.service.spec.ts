import { TestBed } from '@angular/core/testing';

import { SecurityEmployeeService } from './security-employee.service';

describe('SecurityEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurityEmployeeService = TestBed.get(SecurityEmployeeService);
    expect(service).toBeTruthy();
  });
});
