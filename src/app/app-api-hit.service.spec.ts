import { TestBed, inject } from '@angular/core/testing';

import { AppApiHitService } from './app-api-hit.service';

describe('AppApiHitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppApiHitService]
    });
  });

  it('should be created', inject([AppApiHitService], (service: AppApiHitService) => {
    expect(service).toBeTruthy();
  }));
});
