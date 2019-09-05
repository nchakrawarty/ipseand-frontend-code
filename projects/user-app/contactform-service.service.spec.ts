import { TestBed } from '@angular/core/testing';

import { ContactformServiceService } from './contactform-service.service';

describe('ContactformServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactformServiceService = TestBed.get(ContactformServiceService);
    expect(service).toBeTruthy();
  });
});
