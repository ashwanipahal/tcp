function requiredValidator(value, isRequired) {
  return !isRequired || (value || '').toString().length > 0;
}

function nonEmptyValidator(value, isRequired) {
  return !isRequired || (value.trim() || '').toString().length > 0;
}

function minLengthValidator(value, minLength) {
  return (value || '').length >= minLength;
}

function maxLengthValidator(value, maxLength) {
  return (value || '').length <= maxLength;
}

function phoneValidator(value) {
  if ((value || '').length === 0) {
    return true; // otherwise it's always mandatory
  }
  // (ddd) ddd-dddd or ddd-ddd-dddd
  const validFormat = /^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})[- ]?[2-9]\d{2}-?\d{4}$/.test(value);

  if (!validFormat) {
    return false;
  }

  const numbersOnly = value.replace(/\D/g, '');
  const isInvalid =
    /^(\d)\1\1\1\1\1\1\1\1\1$/gi.test(numbersOnly) ||
    '0123456789012345678'.indexOf(value) > -1 ||
    '9876543210987654321'.indexOf(numbersOnly) > -1;
  return !isInvalid;
}

function addressValidator(value) {
  return /^[0-9a-zA-Z '#.\-,]*$/.test(value);
}

function zipcodeValidator(valueParam, param, linkedPropsValues, linkedFieldsValues) {
  const value = (valueParam || '').toUpperCase();
  const country = linkedFieldsValues[0] || linkedPropsValues[0];

  return (
    (country === 'US' && /^\d{5}-\d{4}$|^\d{5}$/.test(value) && value.substr(0, 5) !== '00000') ||
    (country === 'CA' && /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/.test(value))
  );
}

function noCountryZipValidator(valueParam) {
  let validZip;
  const value = (valueParam || '').toUpperCase();
  if (/^\d{5}-\d{4}$|^\d{5}$/.test(value) && value.substr(0, 5) !== '00000') validZip = true;
  else if (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/.test(value))
    validZip = true;
  else validZip = false;
  return validZip;
}

function nameValidator(value) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ]*$/.test(value);
}

function cityNameValidator(value) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ '#.-]*$/.test(value);
}

function stateRequiredValidator(value, param, _, linkedFieldsValues) {
  return value || (linkedFieldsValues[0] !== 'US' && linkedFieldsValues[0] !== 'CA');
}

function expirationValidator(value, param, linkedPropsValues, datePieces) {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const month = datePieces[0] * 1;
  const year = datePieces[1] * 1;

  return !(year < nowYear || (year === nowYear && month < nowMonth + 1));
}

function cardNumberForTypeValidator(value, param, linkedProps) {
  const cleanValue = (value || '').replace(/\D/g, '');
  // no type, invalid CC numbr
  if (!linkedProps[0]) {
    return false;
  }

  const isAmex = linkedProps[0] === 'AMEX';
  const isValidAmex = isAmex && (cleanValue.length === 15 || /[*]{11}\d{4}$/.test(value));
  const isValidNonAmex = !isAmex && (cleanValue.length === 16 || /[*]{12}\d{4}$/.test(value));

  return (
    cleanValue.length === 0 ||
    isValidAmex || // editing amex card
    isValidNonAmex
  ); // editing amex card
}

function plccEnabledValidator(value, param, linkedProps) {
  const cleanValue = (value || '').replace(/\D/g, '');
  return !(cleanValue.length > 0 && linkedProps[0] === 'PLACE CARD' && !linkedProps[1]);
}

// TODO - Add test case (Ajay Saini)
function numberValidator(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

// TODO - Add test case (Ajay Saini)
function lengthValidator(value, length) {
  const len = (value || '').length;
  return len === 0 || len === length;
}

function emailValidator(value) {
  return /^(\s*)([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*)$/.test(
    value
  );
}

function matchEmailValidator(value, param, linkedPropsValues, linkedFieldsValues) {
  return (value || '').trim() === (linkedFieldsValues[0] || '').trim();
}

function passwordValidator(value) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[$@#%^$<>.,!%*?&\-_~`()+={}[\]|:;"'/])[A-Za-z\d$@#%^$<>.,!%*?&\-_~`()+={}[\]|:;“’/]{8,}$/g.test(
    value
  );
}

function equalToValidator(value, param, linkedPropsValues, linkedFieldsValues) {
  return value === linkedFieldsValues[0];
}

function legacyPasswordValidator(value) {
  return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@#%^$<>.,!%*?&\-_~`()+={}[\]|:;"'/]{8,}$/g.test(value);
}

function alphanumericValidator(value) {
  return !value ? true : /^[0-9A-Za-z]{12}$/.test(value);
}

function ssnValidator(value) {
  return /^[0-9]{4}$/.test(value);
}

function dobValidator(value) {
  return ['Mm', 'Dd', 'Yyyy'].indexOf(value) === -1;
}

const validatorMethods = {
  required: requiredValidator,
  nonEmpty: nonEmptyValidator,
  minLength: minLengthValidator,
  maxLength: maxLengthValidator,
  phone: phoneValidator,
  zipcode: zipcodeValidator,
  address: addressValidator,
  name: nameValidator,
  city: cityNameValidator,
  stateRequired: stateRequiredValidator,
  cardNumberForType: cardNumberForTypeValidator,
  expiration: expirationValidator,
  plccEnabled: plccEnabledValidator,
  number: numberValidator,
  exactLength: lengthValidator,
  validEmail: emailValidator,
  emailPattern: emailValidator,
  noCountryZip: noCountryZipValidator,
  matchEmail: matchEmailValidator,
  password: passwordValidator,
  equalTo: equalToValidator,
  legacyPassword: legacyPasswordValidator,
  email: emailValidator,
  alphanumeric: alphanumericValidator,
  ssn: ssnValidator,
  dob: dobValidator,
};

export default validatorMethods;
