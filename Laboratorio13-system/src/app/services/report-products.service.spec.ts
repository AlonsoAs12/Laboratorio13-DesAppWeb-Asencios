import { TestBed } from '@angular/core/testing';

import { ReportProductsService } from './report-products.service';

describe('ReportProductsService', () => {
  let service: ReportProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
