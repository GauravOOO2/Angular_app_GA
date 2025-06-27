import { TestBed } from '@angular/core/testing';

import { GoogleAnalyticsService } from './google-analytics';

describe('GoogleAnalytics', () => {
  let service: GoogleAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
