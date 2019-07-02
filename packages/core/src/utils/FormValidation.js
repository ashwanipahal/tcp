const required = value => (value ? '' : 'Please enter a ');
const isSpecialChar = value =>
  value && !/^[a-zA-Z0-9 ]+$/i.test(value)
    ? 'Field should not contain any special characters'
    : undefined;

const zipcodeUS = value =>
  value && /^\d{5}-\d{4}$|^\d{5}$/.test(value) && value.substr(0, 5) !== '00000'
    ? ''
    : 'Please enter a valid zip code';
const zipcodeCA = value =>
  value && /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/.test(value)
    ? ''
    : 'Please enter your postal code';

const maxLength = max => (value, allValues, props) => {
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
};
const number = value =>
  value && !/^\d+$/.test(value) ? 'Please enter a valid phone number' : undefined;
const minValue = min => value =>
  value && value.length < min ? `Please enter a valid phone number` : undefined;
const minValue10 = minValue(10);
const minValue18 = minValue(18);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export {
  required,
  maxLength,
  isSpecialChar,
  minValue10,
  number,
  minValue,
  minValue18,
  email,
  zipcodeCA,
  zipcodeUS,
};
