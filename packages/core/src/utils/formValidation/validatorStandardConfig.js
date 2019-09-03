const enterPhoneNumber = 'lbl_err_phonenumber_required';
const validPhoneNumber = 'lbl_err_phonenumber_phone';
const validStreetAddress = 'lbl_err_validstreetaddress';
const validExpirationDate = 'lbl_err_validexpirationedate';

export const formValidationMessages = {
  addressLine1: {
    required: validStreetAddress,
    address: 'lbl_err_addressline1_address',
    minLength: validStreetAddress,
    maxLength: 'lbl_err_addressline1_maxlength',
  },
  addressLine2: {
    address: 'lbl_err_addressline2_address',
    maxLength: validStreetAddress,
  },
  city: {
    nonEmpty: 'lbl_err_city_nonempty',
    city: 'lbl_err_city_city',
    maxLength: 'lbl_err_city_nonempty',
  },
  country: {
    required: 'lbl_err_country_required',
  },
  state: {
    stateRequired: (linkedPropsValues, linkedFieldsValues) =>
      linkedFieldsValues[0] === 'US'
        ? 'lbl_err_state_staterequired_us'
        : 'lbl_err_state_staterequired_nonus',
  },
  firstName: {
    nonEmpty: 'lbl_err_firstname_nonempty',
    name: 'lbl_err_firstname_name',
    maxLength: 'lbl_err_firstname_maxlength',
  },
  lastName: {
    nonEmpty: 'lbl_err_lastname_nonempty',
    name: 'lbl_err_lastname_name',
    maxLength: 'lbl_err_lastname_maxlength',
  },
  phoneNumber: {
    required: enterPhoneNumber,
    phone: validPhoneNumber,
  },
  zipCode: {
    required: 'lbl_err_zipcode_required',
    zipcode: 'lbl_err_zipcode_zipcode',
  },
  noCountryZip: {
    required: 'lbl_err_zipcode_required',
    noCountryZip: 'lbl_err_zipcode_zipcode',
  },
  recaptchaToken: {
    required: 'lbl_err_recaptchatoken_required',
  },
  cardNumber: {
    required: 'lbl_err_cardnumber_required',
    cardNumberForType: 'lbl_err_cardnumber_type',
    plccEnabled: 'lbl_err_cardnumber_plccenabled',
  },
  expYear: {
    required: validExpirationDate,
    expiration: validExpirationDate,
  },
  expMonth: {
    required: validExpirationDate,
    expiration: validExpirationDate,
  },
  giftCardNumber: 'lbl_err_giftcardnumber',
  cardPin: 'lbl_err_cardpin',

  Email: {
    required: `lbl_err_email_req`,
    validEmail: 'lbl_err_email_validemail',
  },
  emailAddress: {
    required: `lbl_err_email_req`,
    emailPattern: 'lbl_err_email',
  },
  confirmEmailAddress: {
    required: 'lbl_err_confirmemailaddress_required',
    matchEmail: 'lbl_err_confirmemailaddress_matchemail',
  },
  password: {
    required: 'lbl_err_password_required',
    password: 'lbl_err_password_password',
  },
  currentPassword: {
    required: 'lbl_err_password_required',
    password: 'lbl_err_currentpassword_password',
  },
  confirmPassword: {
    required: 'lbl_err_password_password',
    equalTo: 'lbl_err_currentpassword_equalto',
  },
  emailAddressNoAsync: {
    required: `lbl_err_email_req`,
    email: 'lbl_err_email',
    validEmail: 'ERROR: Email format is invalid',
  },
  dateOfBirthBothRequired: {
    userDateOfBirth: 'lbl_err_dob_required',
  },
  airMilesAccountNumber: 'lbl_err_airmilesaccountnumber',
  associateId: 'lbl_err_associateid',
  iAgree: {
    required: 'lbl_err_iagree',
  },
  preScreenCode: {
    alphanumeric: 'lbl_err_prescreencode',
  },
  ssNumber: {
    ssn: 'lbl_err_ssnumber_ssn',
  },
  birthDate: 'lbl_err_birthdate',
  statewocountry: {
    required: 'lbl_err_statewocountry_required',
  },
  date: {
    dob: 'lbl_err_date_dob',
  },
  month: {
    dob: 'lbl_err_month_dob',
  },
  year: {
    dob: 'lbl_err_year_dob',
  },
  orderNumber: 'lbl_err_ordernumber',
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
