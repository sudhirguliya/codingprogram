import { TestBed, inject } from '@angular/core/testing';

import { App.GlobalService } from './app.global.service';

describe('App.GlobalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [App.GlobalService]
    });
  });

  it('should be created', inject([App.GlobalService], (service: App.GlobalService) => {
    expect(service).toBeTruthy();
  }));
});
