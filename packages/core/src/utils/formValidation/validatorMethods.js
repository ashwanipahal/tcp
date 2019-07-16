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

function nameValidator(value) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ]*$/.test(value);
}

function cityNameValidator(value) {
  return /^[a-zA-Z áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ '#.-]*$/.test(value);
}

function stateRequiredValidator(value, param, _, linkedFieldsValues) {
  return value || (linkedFieldsValues[0] !== 'US' && linkedFieldsValues[0] !== 'CA');
}

function numberValidator(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

function lengthValidator(value, length) {
  const len = (value || '').length;
  return len === 0 || len === length;
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
  number: numberValidator,
  exactLength: lengthValidator,
};

export default validatorMethods;
