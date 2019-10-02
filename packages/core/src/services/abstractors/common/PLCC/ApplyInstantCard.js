import { executeStatefulAPICall } from '../../../handler';
import endpoints from '../../../endpoints';
import { getSiteId } from '../../../../utils';
import { API_CONFIG } from '../../../config';
import { getFormattedError } from '../../../../utils/errorMessage.util';

export const isCanada = () => {
  const siteId = getSiteId();
  return siteId === API_CONFIG.siteIds.ca;
};

const getStatusCodeRes = (returnCode, body, args, errorsMapping) => {
  if (returnCode) {
    const { address } = body;
    switch (body.returnCode) {
      case '02':
        return {
          status: 'PENDING',
        };
      case '04':
        return {
          status: errorsMapping.ERR_REQUEST_TIMEOUT,
        };
      case '01':
        return {
          onFileCardId: body.xCardId.toString(),
          cardNumber: body.cardNumber,
          cardType: 'PLACE CARD',
          isExpirationRequired: false,
          isCVVRequired: false,
          isDefault: false,

          address: address && {
            firstName: address.firstName,
            lastName: address.lastName,
            addressLine1: address.address1,
            addressLine2: address.address2,
            zipCode: address.zipCode,
            state: address.state,
            city: address.city,
            country: address.country,
          },

          emailAddress: args.emailAddress,
          phoneNumber: body.phoneNumber || args.phoneNumber,

          status: body.returnCode === '01' ? 'APPROVED' : 'EXISTING', // error code 03 = EXISTING but if we got to this point we assume! that the status is always exisiting if returnCode !== 1
          creditLimit: parseFloat(body.creditLimit.toString().replace(/\$/gi, '')),
          // apr: parseFloat(credit.apr),
          couponCode: body.couponCode,
          savingAmount: parseFloat(body.savingAmount.replace(/\$/gi, '')) || 0,
          discount: parseFloat(body.percentOff), // '30%' but we'll need to calculate on it, so parseFloat
        };
      case '13007':
        return {
          status: 'INVALID_PRESCREEN_CODE',
        };
      default:
        return {
          status: 'Something went wrong.',
        };
    }
  }
  return false;
};

const applyInstantCard = (args, errorsMapping) => {
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
      emailAddress: args.emailAddress,
      country: getSiteId(),
      ssn: args.ssNumber,
      prescreenId: args.preScreenCode,
      mobilePhoneNumber: args.phoneNumberWithAlt,
      phoneNumber: args.altPhoneNumber,
      birthdayDate: `${args.month}${args.date}${args.year}`,
      userId: -1002,
    },
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      const response = res.body;
      if (!response) {
        return { status: errorsMapping.INTERNAL_SERVER_ERROR };
      }
      const body = res.body && res.body.response ? res.body.response : res.body;
      const returnCode = body.returnCode || body.errorCode;
      return getStatusCodeRes(returnCode, body, args, errorsMapping);
    })
    .catch(err => {
      const error = getFormattedError(err, errorsMapping);
      error.errorMessages = error.errorMessages || {
        internalError: errorsMapping.INTERNAL_SERVER_ERROR,
      };
      const { errorMessages } = error;
      errorMessages.internalError = {
        status: errorMessages.internalError,
      };
      return error.errorMessages && error.errorMessages.internalError;
    });
};

export default applyInstantCard;
