const required = value => {
  return value ? '' : 'REQUIRED_FIELD';
};
const isSpecialChar = value =>
  value && !/^[a-zA-Z0-9 ]+$/i.test(value) ? 'SPECIAL_CHARACTER' : undefined;

const zipcodeUS = value =>
  value && /^\d{5}-\d{4}$|^\d{5}$/.test(value) && value.substr(0, 5) !== '00000'
    ? ''
    : 'VALID_ZIPCODE';
const zipcodeCA = value =>
  value && /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/.test(value)
    ? ''
    : 'VALID_POSTALCODE';
const phoneNumber = value =>
  value && !/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i.test(value) ? 'VALID_PHONE' : '';

const number = value => (value && !/^\d+$/.test(value) ? 'VALID_PHONE' : undefined);
const minValue = min => value => (value && value.length < min ? `VALID_PHONE` : undefined);
const minValue10 = minValue(10);
const minValue18 = minValue(18);

export {
  required,
  isSpecialChar,
  minValue10,
  number,
  minValue,
  minValue18,
  zipcodeCA,
  zipcodeUS,
  phoneNumber,
};
