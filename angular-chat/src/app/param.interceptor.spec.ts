import { TestBed } from '@angular/core/testing';

import { ParamInterceptor } from './param.interceptor';

describe('ParamInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ParamInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ParamInterceptor = TestBed.inject(ParamInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
