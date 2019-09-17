import { getSflItemCount } from '../cookie.util';

describe('cookie util test', () => {
  it('should return us cookie value', () => {
    expect(getSflItemCount('US')).toEqual(0);
  });
  it('should return CA cookie value', () => {
    expect(getSflItemCount('CA')).toEqual(0);
  });
});
