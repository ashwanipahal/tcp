import { required, isSpecialChar, zipcodeUS } from '../FormValidation';

describe('required', () => {
  it('should check for required field', () => {
    expect(required(null)).toBe('REQUIRED_FIELD');
  });
});

describe('isSpecialChar', () => {
  it('should check for SPECIAL_CHARACTER field', () => {
    expect(isSpecialChar('@this')).toBe('SPECIAL_CHARACTER');
  });
});

describe('zipcodeUS', () => {
  it('should check for VALID_ZIPCODE field', () => {
    expect(zipcodeUS('@this')).toBe('VALID_ZIPCODE');
  });
});
