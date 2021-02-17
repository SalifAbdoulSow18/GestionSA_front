import { TestBed } from '@angular/core/testing';

import { GrpComprtenceService } from './grp-comprtence.service';

describe('GrpComprtenceService', () => {
  let service: GrpComprtenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrpComprtenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
