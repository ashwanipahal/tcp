const validStreetAddress = 'Please enter a valid street address';
export const formValidationMessages = {
  addressLine1: {
    required: validStreetAddress,
    address: 'The value entered in the street address has special character',
    minLength: validStreetAddress,
    maxLength: 'Please shorten the street address',
  },
  addressLine2: {
    address: 'The value entered in the street address has special character',
    maxLength: validStreetAddress,
  },
  city: {
    nonEmpty: 'Please enter a valid city',
    city: 'The value entered in the city has special character',
    maxLength: 'Please enter a valid city',
  },
  country: {
    required: 'Please select a country',
  },
  state: {
    stateRequired: (linkedPropsValues, linkedFieldsValues) =>
      linkedFieldsValues[0] === 'US' ? 'Please select a state' : 'Please select a province',
  },
  firstName: {
    nonEmpty: 'Please enter a first name',
    name: 'First name field should not contain any special characters',
    maxLength: 'Please enter a valid first name',
  },
  lastName: {
    nonEmpty: 'Please enter a last name',
    name: 'Last name field should not contain any special characters',
    maxLength: 'Please enter a valid last name',
  },
  phoneNumber: {
    required: 'Please enter your phone number',
    phone: 'Please enter a valid phone number',
  },
  zipCode: {
    required: 'Please enter your zip code',
    zipcode: 'Please enter a valid zip code',
  },
  recaptchaToken: {
    required: 'Please check the reCaptcha value',
  },
  giftCardNumber: 'Please enter a valid gift card number',
  cardPin: 'Please enter your gift card pin number',
};

export const formValidationRules = {
  addressLine1: {
    required: true,
    address: true,
    minLength: 5,
    maxLength: 30,
  },
  addressLine2: {
    address: true,
    maxLength: 30,
  },
  city: {
    nonEmpty: true,
    city: true,
    maxLength: 20,
  },
  state: {
    stateRequired: {
      linkedFields: ['country'],
    },
  },
  country: {
    required: true,
  },
  firstName: {
    nonEmpty: true,
    name: true,
    maxLength: 50,
  },
  lastName: {
    nonEmpty: true,
    name: true,
    maxLength: 50,
  },
  phoneNumber: {
    required: true,
    phone: true,
  },
  zipCode: {
    required: true,
    zipcode: {
      linkedFields: ['country'],
    },
  },
  recaptchaToken: {
    required: true,
  },
  giftCardNumber: {
    number: true,
    required: true,
    exactLength: 19,
  },
  cardPin: {
    required: true,
    number: true,
    exactLength: 4,
  },
};

function getFieldAndConfigNames(element) {
  if (typeof element === 'string') {
    // element is the name of the form field as well as the name of the config entry
    return { fieldName: element, configName: element };
  }
  if (typeof element === 'object') {
    // element is actually a key-value pair mapping a form field name to a config entry name
    const elementKeys = Object.keys(element);
    return { fieldName: elementKeys[0], configName: element[elementKeys[0]] };
  }
  return null;
}

export function getStandardConfigMessages(fieldNames) {
  const result = {};
  fieldNames.forEach(element => {
    const { fieldName, configName } = getFieldAndConfigNames(element);
    if (formValidationMessages[configName]) {
      result[fieldName] = formValidationMessages[configName];
    }
  });
  return result;
}

export function getStandardConfigRules(fieldNames) {
  const result = {};
  fieldNames.forEach(element => {
    const { fieldName, configName } = getFieldAndConfigNames(element);
    if (formValidationRules[configName]) {
      result[fieldName] = formValidationRules[configName];
    }
  });
  return result;
}

export default function getStandardConfig(fieldNames) {
  return {
    rules: getStandardConfigRules(fieldNames),
    messages: getStandardConfigMessages(fieldNames),
  };
}
