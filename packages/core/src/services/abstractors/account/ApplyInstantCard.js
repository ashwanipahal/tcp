import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getSiteId } from '../../../utils/utils.web';
import { API_CONFIG } from '../../config';

export const errorHandler = err => {
  if (err.response && err.response.body && err.response.body.errors) {
    throw new Error(err.response.body.errors[0].errorMessage);
  }
  throw new Error('Your action could not be completed due to system error');
};

export const isCanada = () => {
  const siteId = getSiteId();
  return siteId === API_CONFIG.siteIds.ca;
};

export const applyInstantCard = args => {
  const payload = {
    // Overriding 'application/json' - specific to processWIC
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    webService: endpoints.instantCreditApplication,
    body: {
      firstName: args.firstName,
      lastName: args.lastName,
      middleInitial: args.middleNameInitial,
      address1: args.addressLine1,
      address2: args.addressLine2 || '',
      city: args.city,
      state: args.statewocountry,
      zipCode: args.noCountryZip,
      country: getSiteId(),
      ssn: args.ssNumber,
      prescreenId: args.preScreenCode,
      mobilePhoneNumber: args.phoneNumber,
      phoneNumber: args.alternatePhone,
      birthdayDate: `${args.month}${args.date}${args.year}`,
      userId: args.userId || -1002,
    },
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      const response = res.body;
      if (!response) {
        throw new Error('res body is null');
        // TODO - Set API Helper to filter if error exists in response
      }
      const body = res.body && res.body.response ? res.body.response : res.body;
      const returnCode = body.returnCode || body.errorCode;
      if (returnCode) {
        switch (body.returnCode) {
          case '02':
            return { status: 'PENDING' };
          case '04':
            return { status: 'TIMEOUT' };
          default:
            return { status: 'ERROR' };
        }
      }
      return true;
    })
    .catch(errorHandler);
};
