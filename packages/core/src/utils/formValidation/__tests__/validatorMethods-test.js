import validatorMethods from '../validatorMethods';

describe('validator methods', () => {
  describe('required', () => {
    it('should return true if value is non empty', () => {
      expect(validatorMethods.required('12345', true)).toBeTruthy();
    });
    it('should return false if value is non empty', () => {
      expect(validatorMethods.required('', true)).toBeFalsy();
    });
    it('should return true if isRequired is false', () => {
      expect(validatorMethods.required('', false)).toBeTruthy();
    });
  });

  describe('nonEmptyValidator', () => {
    it('should return true if value is non empty', () => {
      expect(validatorMethods.nonEmpty('12345', true)).toBeTruthy();
    });
    it('should return false if value is non empty', () => {
      expect(validatorMethods.nonEmpty('', true)).toBeFalsy();
    });
    it('should return false if value is contain only spaces', () => {
      expect(validatorMethods.nonEmpty('  ', true)).toBeFalsy();
    });

    it('should return true if isRequired is false', () => {
      expect(validatorMethods.nonEmpty('', false)).toBeTruthy();
    });
  });

  describe('minLengthValidator', () => {
    it('should return true if length is more than min length provided', () => {
      expect(validatorMethods.minLength('12345', 5)).toBeTruthy();
    });
    it('should return false if value is less than min length provided', () => {
      expect(validatorMethods.minLength('12345', 10)).toBeFalsy();
    });
  });

  describe('maxLengthValidator', () => {
    it('should return true if length is less than max length provided', () => {
      expect(validatorMethods.maxLength('12345', 5)).toBeTruthy();
    });
    it('should return false if value is more than max length provided', () => {
      expect(validatorMethods.maxLength('12345', 2)).toBeFalsy();
    });
  });

  describe('phoneValidator', () => {
    it('should return true for valid phone number', () => {
      expect(validatorMethods.phone('5417543010')).toBeTruthy();
    });
    it('should return true for empty values', () => {
      expect(validatorMethods.phone('')).toBeTruthy();
    });
    it('should return false if number contain alphabets', () => {
      expect(validatorMethods.phone('1111aaaaaa')).toBeFalsy();
    });
    it('should return false for invalid formats', () => {
      expect(validatorMethods.phone('1111111111')).toBeFalsy();
    });
  });

  describe('zipcode', () => {
    it('should return true for valid zipCode US', () => {
      expect(validatorMethods.zipcode('12345', null, ['US'], [''])).toBeTruthy();
    });

    it('should return true for valid zipCode CA', () => {
      expect(validatorMethods.zipcode('A1A 0A0', null, ['CA'], [''])).toBeTruthy();
    });
    it('should return false if country is not provided', () => {
      expect(validatorMethods.zipcode('A1A 0A0', null, [''], [''])).toBeFalsy();
    });
  });

  describe('address', () => {
    it('should return true for valid address', () => {
      expect(validatorMethods.address('12345')).toBeTruthy();
    });

    it('should return false for invalid address', () => {
      expect(validatorMethods.address('@@@@@')).toBeFalsy();
    });
  });

  describe('name', () => {
    it('should return true for valid name', () => {
      expect(validatorMethods.name('abcde')).toBeTruthy();
    });

    it('should return false for invalid name', () => {
      expect(validatorMethods.name('12345')).toBeFalsy();
    });
  });

  describe('city', () => {
    it('should return true for valid city', () => {
      expect(validatorMethods.city('abcde')).toBeTruthy();
    });

    it('should return false for invalid city', () => {
      expect(validatorMethods.city('12345')).toBeFalsy();
    });
  });

  describe('stateRequired', () => {
    it('should return true if value is present', () => {
      expect(validatorMethods.stateRequired('abcde', null, null, [])).toBeTruthy();
    });

    it('should return true for non US CA countries', () => {
      expect(validatorMethods.stateRequired('', null, null, [])).toBeTruthy();
    });

    it('should return false for if value is not present', () => {
      expect(validatorMethods.stateRequired('', null, null, ['US'])).toBeFalsy();
    });
  });

  describe('alphanumericValidator', () => {
    it('should return true if nothing is provided in value', () => {
      expect(validatorMethods.alphanumeric('')).toBeTruthy();
    });
    it('should return false if provided value is more or less than 12', () => {
      expect(validatorMethods.alphanumeric('12345')).toBeFalsy();
    });
    it('should return true if provided value is exact 12', () => {
      expect(validatorMethods.alphanumeric('123456789123')).toBeTruthy();
    });
  });

  describe('ssnValidator', () => {
    it('should return false if provided value is more or less than 4', () => {
      expect(validatorMethods.ssn('12345')).toBeFalsy();
    });
    it('should return true if provided value is exact 4', () => {
      expect(validatorMethods.ssn('1234')).toBeTruthy();
    });
  });

  describe('dobValidator', () => {
    it('should return false if the value is not empty', () => {
      expect(validatorMethods.dob('')).toBeTruthy();
    });
    it('should return false value is any of -->  Mm Dd Yyyy', () => {
      expect(validatorMethods.dob('Mm')).toBeFalsy();
    });
    it('should return true value is not amongst Mm Dd Yyyy', () => {
      expect(validatorMethods.dob('23')).toBeTruthy();
    });
  });
});
