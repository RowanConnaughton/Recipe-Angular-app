import { TestBed, inject } from '@angular/core/testing';

import { RecipequeryService } from './recipequery.service';

describe('RecipequeryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipequeryService]
    });
  });

  it('should be created', inject([RecipequeryService], (service: RecipequeryService) => {
    expect(service).toBeTruthy();
  }));
});
