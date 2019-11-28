import { transformClickEvent, transformPageEvent, getTransformedObject } from '../transformEvents';

describe('transformEvents', () => {
  it('transformPageEvent should return null if screenName is not passed', () => {
    expect(transformPageEvent()).toBeNull();
  });

  it('transformPageEvent should return null if no mapping is present for screenName', () => {
    expect(transformPageEvent('test')).toBeNull();
  });

  it('transformPageEvent should return object if mapping is present for screenName', () => {
    const t = transformPageEvent('Navigation');
    expect(Object.keys(t).length).toBeGreaterThan(1);
  });

  it('transformClickEvent should return null if name is not passed', () => {
    expect(transformClickEvent()).toBeNull();
  });

  it('transformClickEvent should return null if no mapping is present for name and module', () => {
    expect(transformClickEvent('test')).toBeNull();
  });

  it('transformClickEvent should return object if mapping is present for name and module', () => {
    const t = transformClickEvent('login-success', 'account');
    expect(Object.keys(t).length).toBeGreaterThan(1);
  });

  it('getTransformedObject should convert string to transformed object', () => {
    const t = getTransformedObject('pageName, prop27');
    expect(t.prop27).toBe('D=mid');
  });
});
