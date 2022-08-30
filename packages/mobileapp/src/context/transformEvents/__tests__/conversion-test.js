import getConversionValue from '../conversion';

describe('conversion', () => {
  beforeEach(() => {
    /* eslint-disable */
    global._dataLayer = {
      pageName: 'test',
      siteType: 'global site',
      pageType: 'myplace',
    };
  });

  it('should resolve value from staticConversion if present', () => {
    expect(getConversionValue('prop27')).toBe('D=mid');
  });

  it('should resolve value from standardConversion', () => {
    expect(getConversionValue('pageName')).toBe('test');
  });

  it('should resolve value from varConversion', () => {
    expect(getConversionValue('eVar1')).toBe('global site');
  });

  it('should resolve value from propConversion', () => {
    expect(getConversionValue('prop2')).toBe('myplace');
  });
});
