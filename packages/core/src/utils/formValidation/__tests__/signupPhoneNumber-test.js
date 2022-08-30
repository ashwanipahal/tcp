import { validatePhoneNumber, formatPhoneNumber } from '../phoneNumber';

describe('validatePhoneNumber', () => {
  it('Should validate phone number with 123131', () => {
    expect(validatePhoneNumber('123131')).toEqual(false);
  });
  it('Should validate phone number with 1234567891', () => {
    expect(validatePhoneNumber('1234567891')).toEqual(true);
  });
  it('Should validate phone number with (123) 456-7891', () => {
    expect(validatePhoneNumber('(123) 456-7891')).toEqual(true);
  });
});

describe('formatPhoneNumber', () => {
  it('Should format phone number with 1234', () => {
    expect(formatPhoneNumber('1234')).toEqual('(123) 4');
  });
  it('Should format phone number with 1234567891', () => {
    expect(formatPhoneNumber('1234567891')).toEqual('(123) 456-7891');
  });
});
