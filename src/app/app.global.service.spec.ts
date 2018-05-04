import { TestBed, inject } from '@angular/core/testing';

import { AppGlobals } from './app.global.service';

describe('App.GlobalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppGlobals]
    });
  });

  it('should be created', inject([AppGlobals], (service: AppGlobals) => {
    expect(service).toBeTruthy();
  }));
});
