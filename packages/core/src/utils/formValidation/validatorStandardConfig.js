const enterPhoneNumber = 'Please enter your phone number';
const validPhoneNumber = 'Please enter a valid phone number';
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
  userBirthMonth: {
    required: 'Please select a month',
  },
  userBirthYear: {
    required: 'Please select a year',
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
    maxLength: 'Please enter a valid last Name',
  },
  phoneNumber: {
    required: enterPhoneNumber,
    phone: validPhoneNumber,
  },
  zipCode: {
    required: 'Please enter your zip code.',
    zipcode: 'Please enter a valid zip code.',
  },
  noCountryZip: {
    required: 'Please enter your zip code.',
    noCountryZip: 'Please enter a valid zip code.',
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
    required: `Please enter a valid email`,
    emailPattern: 'Please Enter Valid Email Id',
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
    required: `Please enter a valid email`,
    email: 'Please Enter Valid Email Id',
    validEmail: 'ERROR: Email format is invalid',
  },
  dateOfBirthBothRequired: {
    userDateOfBirth: 'Please enter a valid birth date',
  },
  airMilesAccountNumber: 'Please enter a valid 11 digit Air Miles ID',
  associateId: 'The Associate ID you entered does not exist. Please try again',
  iAgree: {
    required: 'You must agree to the Terms and Conditions to submit the form',
  },
  preScreenCode: {
    alphanumeric: 'Please enter a valid pre-screen code',
  },
  ssNumber: {
    ssn: 'Please enter the last 4 digits of your social security number',
  },
  birthDate: 'Please enter a valid date of birth',
  statewocountry: {
    required: 'Please enter a valid state',
  },
  date: {
    dob: 'Please select a day',
  },
  month: {
    dob: 'Please select a month',
  },
  year: {
    dob: 'Please select a year',
  },
  orderNumber: 'ERROR: Please enter a valid order number.',
  phoneNumberWithAlt: {
    eitherRequired: enterPhoneNumber,
    phone: validPhoneNumber,
    required: validPhoneNumber,
  },
  altPhoneNumber: {
    eitherRequired: enterPhoneNumber,
    phone: validPhoneNumber,
    notEqualTo: 'Phone numbers must not match',
  },
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

  userBirthMonth: {
    required: true,
  },
  userBirthYear: {
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
  dateOfBirthBothRequired: {
    userDateOfBirth: { linkedFields: ['userBirthYear'] },
  },
  airMilesAccountNumber: {
    number: true,
    exactLength: 11,
  },
  associateId: {
    required: true,
    number: true,
  },
  iAgree: {
    required: true,
  },
  preScreenCode: {
    alphanumeric: true,
  },
  ssNumber: {
    ssn: true,
  },
  statewocountry: {
    required: true,
  },
  date: {
    dob: true,
  },
  month: {
    dob: true,
  },
  year: {
    dob: true,
  },
  phoneNumberWithAlt: {
    phone: true,
    eitherRequired: {
      linkedFields: ['altPhoneNumber'],
    },
  },
  altPhoneNumber: {
    phone: true,
    eitherRequired: {
      linkedFields: ['phoneNumberWithAlt'],
    },
    notEqualTo: {
      linkedFields: ['phoneNumberWithAlt'],
    },
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
