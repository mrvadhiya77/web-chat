import { TestBed } from '@angular/core/testing';

import { AuthWithEmailService } from './auth-with-email.service';

describe('AuthWithEmailService', () => {
  let service: AuthWithEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthWithEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
