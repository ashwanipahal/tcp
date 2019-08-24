const validStreetAddress = 'Please enter a valid street address';
const validExpirationDate = 'Please enter a valid expiration date';

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
  noCountryZip: {
    required: 'Please enter your zip code',
    noCountryZip: 'Please enter a valid zip code',
  },
  recaptchaToken: {
    required: 'Please check the recaptcha value',
  },
  cardNumber: {
    required: 'Please enter a valid credit card number',
    cardNumberForType: 'Please enter a valid credit card number',
    plccEnabled: 'This card can only be used when shopping the US store',
  },
  expYear: {
    required: validExpirationDate,
    expiration: validExpirationDate,
  },
  expMonth: {
    required: validExpirationDate,
    expiration: validExpirationDate,
  },
  giftCardNumber: 'Please enter a valid gift card number',
  cardPin: 'Please enter your gift card pin number',

  Email: {
    required: `Please enter a valid email`,
    validEmail: 'Email format is invalid',
  },
  emailAddress: {
    required: `ERROR: Please enter a valid email`,
    emailPattern: 'ERROR: Email format is invalid',
  },
  confirmEmailAddress: {
    required: 'Please confirm your email address',
    matchEmail: 'Email addresses must match',
  },
  password: {
    required: 'Please enter your password',
    password: 'Please enter a valid password',
  },
  currentPassword: {
    required: 'Please enter your password',
    password: 'Your current password is incorrect. Please try again.',
  },
  confirmPassword: {
    required: 'Please enter a valid password',
    equalTo: 'Passwords must match',
  },
  emailAddressNoAsync: {
    required: `ERROR: Please enter a valid email`,
    email: 'ERROR: Email format is invalid.',
    validEmail: 'ERROR: Email format is invalid',
  },
  iAgree: {
    required: 'Please Select',
  },
  orderNumber: 'ERROR: Please enter a valid order number.',
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
  noCountryZip: {
    required: true,
    noCountryZip: true,
  },
  recaptchaToken: {
    required: true,
  },
  cardNumber: {
    required: true,
    cardNumberForType: {
      linkedProps: ['cardType', 'isPLCCEnabled'],
    },
    plccEnabled: {
      linkedProps: ['cardType', 'isPLCCEnabled'],
    },
  },
  expMonth: {
    required: true,
    expiration: {
      linkedFields: ['expMonth', 'expYear'],
      depends: {
        expYY: { required: true },
      },
    },
  },
  expYear: {
    required: true,
    expiration: { linkedFields: ['expMonth', 'expYear'] },
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
  Email: {
    required: true,
    validEmail: true,
  },
  emailAddress: {
    required: true,
    emailPattern: 'isValid',
    validEmail: true,
  },
  confirmEmailAddress: {
    required: true,
    matchEmail: {
      linkedFields: ['emailAddress'],
    },
  },
  password: {
    required: true,
    password: true,
  },
  currentPassword: {
    required: true,
    password: true,
  },
  confirmPassword: {
    required: true,
    equalTo: {
      linkedFields: ['password'],
    },
  },
  emailAddressNoAsync: {
    required: true,
    email: true,
  },
  legacyPassword: {
    required: true,
  },
  orderNumber: {
    required: true,
    minLength: 6,
    number: true,
  },
  iAgree: {
    required: true,
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
