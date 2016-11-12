/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AiService } from './puzzle.service';

describe('Service: AiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AiService]
    });
  });

  it('should ...', inject([AiService], (service: AiService) => {
    expect(service).toBeTruthy();
  }));
});
