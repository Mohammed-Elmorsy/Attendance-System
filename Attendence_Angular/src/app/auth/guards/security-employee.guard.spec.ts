import { TestBed, async, inject } from '@angular/core/testing';

import { SecurityEmployeeGuard } from './security-employee.guard';

describe('SecurityEmployeeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityEmployeeGuard]
    });
  });

  it('should ...', inject([SecurityEmployeeGuard], (guard: SecurityEmployeeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
