const required = value => (value ? '' : 'Please enter a ');
const specialChar = value =>
  value && !/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(value)
    ? 'Field should not contain any special characters'
    : undefined;

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength50 = maxLength(50);
const maxLength30 = maxLength(30);
const maxLength20 = maxLength(20);
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
const minValue = min => value => (value && value < min ? `Must be at least ${min}` : undefined);
const minValue18 = minValue(18);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export {
  required,
  maxLength,
  specialChar,
  maxLength50,
  maxLength30,
  maxLength20,
  number,
  minValue,
  minValue18,
  email,
};
