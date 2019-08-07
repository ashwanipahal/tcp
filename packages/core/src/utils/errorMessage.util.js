const GLOBAL_ERROR = '_error';
const OopsErrorMessage =
  'Oops... The card and/or pin number you entered is incorrect. Please try again.';
const ERRORS_MAP = {
  ERR_ORDER_NOT_FOUND: {
    errorMessage: 'Sorry, that order was not found. Please try again.',
    formFieldName: '',
  },
  TCPGC06: {
    errorMessage: 'Please try again.',
    formFieldName: '',
  },
  _ERR_DUPLICATE_GIFT_CARD: {
    errorMessage:
      'That gift card number has already been applied to your order. Please enter a different gift card number.',
    formFieldName: '',
  },
  _ERR_DUPLICATE_CARD: {
    errorMessage: 'Please check if the card is already in use.',
    formFieldName: '',
  },
  _ERR_PAY_CARD_NUMBER_INVALID: {
    errorMessage:
      'The credit card number is not valid. Type the number of the credit card in the Credit card number field and try again.',
    formFieldName: '',
  },
  '500': {
    errorMessage: 'Uh oh... System error. Please try again.',
    formFieldName: '',
  },
  ERR_PROMOTION_CODE_INVALID: {
    errorMessage: 'Sorry, this code is invalid. Please verify it and try again.',
    formFieldName: '',
  },
  _ERR_MISSING_CMD_PARAMETER: {
    errorMessage:
      "My Place Rewards cannot be applied when you're shopping as a guest. Please log in.",
    formFieldName: '',
  },
  _TCP_PROMOTION_LOYALTY_COUPON_NOT_IN_WALLET: {
    errorMessage:
      'The code you used is not applicable. Note: My Place Rewards are not transferable between accounts. Please verify your code and try again.',
    formFieldName: '',
  },
  _TCP_PROMOTION_LOYALTY_AVAILABE_ONLY_FOR_REGISTERED_USER: {
    errorMessage:
      "My Place Rewards cannot be applied when you're shopping as a guest. Please log in",
    formFieldName: '',
  },
  _ERR_USER_AUTHORITY: {
    errorMessage: 'The user does not have the authority to run this command.',
    formFieldName: '',
  },
  PAYPAL_CC_ERROR_CODE_US_CROSS_SITE_ADDRESS_NOT_SUPPORTED: {
    errorMessage:
      'You cannot use a United States based Paypal account when shipping to Canada, and conversely you cannot use a Canadian based Paypal account when shipping to the United States.',
    formFieldName: '',
  },
  TCP02: {
    errorMessage: OopsErrorMessage,
    formFieldName: '',
  },
  _ERR_INVALID_PIN_CARD: {
    errorMessage: OopsErrorMessage,
    formFieldName: '',
  },
  CMN0409E: {
    errorMessage: OopsErrorMessage,
    formFieldName: '',
  },
  _ERR_GIFTCARD_SVS15: {
    errorMessage: OopsErrorMessage,
    formFieldName: '',
  },
  SVS15: {
    errorMessage: 'Oops... The card and/or pin number you entered is incorrect. Please try again',
    formFieldName: '',
  },
  SVS16: {
    errorMessage:
      'We are sorry; however, the Gift Card isn’t currently valid. Please try again with another form of payment.',
    formFieldName: '',
  },
  INVALID_PARAM: {
    errorMessage: 'element will have name of parameter having problem.',
    formFieldName: '',
  },
  MANDATORY_PARAM_NOT_PASSED: {
    errorMessage: 'one of the mandatory parameters not passed.',
    formFieldName: '',
  },
  _ERR_BAD_PARMS: {
    errorMessage:
      "Sorry, we couldn't find an account associated with that email address. Please try again.",
    formFieldName: '',
  },
  OOS_OR_UNAVAILABLE: {
    errorMessage:
      'Some of the item(s) in your bag are either sold out or need updating. Continuing with checkout will remove them from your bag.',
    formFieldName: '',
  },
  SVS07: {
    errorMessage:
      'Sorry, the gift card entered does not have an available balance. Please enter a new gift card or select a new payment type.',
    formFieldName: '',
  },
  SVS08: {
    errorMessage: 'Giftcard authorization declined.',
    formFieldName: '',
  },
  TCP_ERROR_CODE_CARD_DECLINED: {
    errorMessage: 'Giftcard authorization declined.',
    formFieldName: '',
  },
  DEFAULT: {
    errorMessage: 'Oops... an error occured',
    formFieldName: '',
  },
  _TCP_PAYMENT_PROCESSING_ERR: {
    errorMessage:
      'We are sorry, however we are unable to obtain authorization to charge this credit card. Please try again with an another form of payment.',
    formFieldName: '',
  },
  _DBG_API_DO_PAYMENT_BAD_XDATE: {
    errorMessage:
      'Uh oh... It looks like the credit card has expired. Please update or add a new card.',
    formFieldName: '',
  },
  ERR_TAXWARE_UTL_GENERAL_CC: {
    errorMessage:
      'Sorry, we are having difficulty calculating the tax. This may be a system error or an issue with the address provided. Please confirm and try again.',
    formFieldName: '',
  },
  _CODE_NOT_APPLICABLE: {
    errorMessage:
      'Coupon is not applicable. Note: If you are applying a My Place Rewards Credit card coupon, coupon will not apply until your card has been entered at checkout.',
    formFieldName: '',
  },
  _TCP_COUPON_USED_ALREADY: {
    errorMessage:
      'One or more of your coupons have already been redeemed. Please remove the coupon(s) and try again.',
    formFieldName: '',
  },
  _WIC_RTPS_COUPON_NOT_APPLIED: {
    errorMessage:
      'We attempted to apply your offer, but, it does not combine with offers already applied to your order. We’ve saved your coupon to your My Place Rewards account',
    formFieldName: '',
  },
  _RTPS_INACTIVE_PAYMENT: {
    errorMessage:
      'Sorry, there was an issue with your payment. Please re-enter your payment information and try again.',
    formFieldName: '',
  },
  _TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_CVV_ERROR: {
    errorMessage: 'There was a problem processing your payment, please try again.',
    formFieldName: '',
  },
  ERR_CREDENTIALS_EXPIRED: {
    errorMessage: 'User name / password did not match.',
    formFieldName: '',
  },
  '.ERR_CREDENTIALS_EXPIRED': {
    errorMessage: 'User name / password did not match.',
    formFieldName: '',
  },
  _TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_AUTH_ERROR: {
    errorMessage:
      'The payment method entered could not be authorized for this purchase. Please review the information entered and try again or try an alternate form of payment',
    formFieldName: '',
  },
  '.INVALID_RECAPTCHA': {
    errorMessage: 'Please re-check the recaptcha value.',
    formFieldName: '',
  },
  '.EMPTY_RECAPTCHA': {
    errorMessage: 'Please check the recaptcha value.',
    formFieldName: '',
  },
  _TCP_PAYMENT_INSUFFICIENT: {
    errorMessage: 'There was a problem processing your payment, please try again.',
    formFieldName: '',
  },
  '.LOYALTY_NOT_ACTIVE': {
    errorMessage:
      "This account has been deactivated, please contact The Children's Place Customer Service by phone: Toll Free: 1-877-752-2387 International Number: 1-204-272-8312 (CAUTION: this is a local number in Canada, therefore you may be charged long distance and International Calling rates)",
    formFieldName: '',
  },
  ERR_MAX_ITEMCOUNT: {
    errorMessage: 'Save more by creating a new list or buying current items.',
    formFieldName: '',
  },
  _ERR_INVALID_ADDR: {
    errorMessage:
      'Sorry, there was an issue. This may be an issue with the address provided. Please confirm and try again.',
    formFieldName: '',
  },
  VIDES_ERRRO_1: {
    errorMessage: 'Your mobile number is already subscribed.',
    formFieldName: '',
  },
  VIDES_ERRRO_2: {
    errorMessage: 'Please enter a valid phone number.',
    formFieldName: '',
  },
  _TCP_PROMOTION_COUPON_EXPIRED: {
    /* eslint-disable */
    errorMessage:
      'Sorry, ${errorParameters} is not applicable. Please verify the start and end dates.',
    formFieldName: '',
  },
  COUPON_GENERIC: {
    errorMessage: 'This offer cannot be applied.',
    formFieldName: '',
  },
  ERROR_MESSAGES_BOPIS: {
    caPostalCode: 'Please enter a Canadian Postal Code',
    usZipCode: 'Please enter a US Zip Code',
    zeroResults: 'ZERO_RESULTS',
    noAddressFound: 'We were unable to find the address you typed. Please try again',
    selectSize: 'Please select a size',
    storeSearchException: 'Oops something went wrong, Please retry.',
  },
  ERR_PROMOTION_NOT_AVAILABLE_AT_THIS_TIME: {
    /* eslint-disable */
    errorMessage:
      'Sorry, ${errorParameters} could not be applied. Please review the redemption dates.',
    formFieldName: '',
  },
  '.ERR_PASSWORD_EXPIRED': {
    errorMessage: {
      errorCode: 10004,
    },
    formFieldName: '',
  },
  _ERR_MORE_THAN_15_ITEM_IN_CART_ERROR: {
    errorMessage: 'Max quantity reached. Select another color or size.',
    altMessage:
      'Your request cannot be completed, as one or more of the products you wish to purchase are not available in the quantity you requested.',
    altATBMessage:
      "We're sorry, you have reached the 15 quantity limit for this item. Please select another colour or size.",
  },
  _API_CANT_RESOLVE_FFMCENTER: {
    errorMessage: 'Quantity selected is not available at this store.',
    altMessage:
      'Sorry you have reached the quantity limit for this item, Please select another color or size.',
    altATBMessage:
      'Your request cannot be completed, as one or more of the products you wish to purchase are not available in the quantity you requested.',
  },
  _API_BAD_INV: {
    errorMessage: 'There is insufficient inventory to fulfill your request.',
    altMessage:
      'Sorry, one or more items you tried to purchase are either out of stock or not available in the quantity you requested. Please go back to bag to confirm availability.',
  },
  VENMO_GENERAL_ERROR:
    'The payment method entered could not be authorized for this purchase.  Please review the information entered and try again or try an alternate form of payment',
  _TCP_AUTH_REQUEST_FAILED_WITH_PLCC_AVS_ERROR: {
    errorMessage:
      'The payment entered could not be authorized for this purchase. Please review your credit card and billing information and try again.',
    formFieldName: '',
  },
  API_CART_OOS_ITEM: {
    errorMessage:
      'Sorry, one or more items you are trying to purchase are either out of stock or not available in the quantity you requested. Please go back to bag to confirm availability.',
  },
  TCP_SFL_MAX_LIMIT_ERROR: {
    errorMessage: 'Sorry you have reached the max number of items that can be saved for later.',
    formFieldName: '',
  },
  TCP_SFL_GENERIC_ERROR: {
    errorMessage: 'Sorry we were unable to save your item for later at this time.',
    formFieldName: '',
  },
  TCP_SFL_ITEM_NOT_FOUND: {
    errorMessage: 'Sorry, we were unable to complete your request. Please try again.',
  },
  ERR_GENERIC_USER: {
    errorMessage: 'Sorry, we were unable to complete your request. Please try again.',
  },
  ERR_MOVE_TO_BAG_SFL_ITEM: {
    errorMessage: 'Sorry, this item is no longer available in the color, size, or fit selected.',
  },
};
class ServiceError {
  constructor(errorCodes, errorMessages, networkStatusCode, misc) {
    this.errorCodes = errorCodes;
    this.errorMessages = errorMessages;
    this.networkStatusCode = networkStatusCode;
    this.misc = misc;
  }
}

function populateErrorPlaceholder(errMsg, error) {
  let errorMsg = errMsg;
  // eslint-disable-next-line
  const regex = /\$\{([^\}]+)\}/g;
  const matches = errorMsg.match ? errorMsg.match(regex) : null;
  if (matches) {
    matches.forEach(match => {
      // eslint-disable-next-line
      const key = match.replace(/[\$\{\s\}]/g, '');
      errorMsg = errorMsg.replace(match, error[key] || match);
    });
  }
  return errorMsg;
}

export function getDynamicCodeErrorMessage(error, code) {
  try {
    error.errorMessages._error = error.errorMessages._error.replace(/<CODE_PLACEHOLDER>/, code);
  } catch (e) {}
}

function getFormattedErrorFromResponse(response) {
  const errorsList = (Array.isArray(response.body.errors) && response.body.errors) ||
    (response.body.error &&
      response.body.error.errorCode && [
        {
          errorCode: response.body.error.errorCode,
          errorKey: response.body.error.errorKey,
          errorMessageKey: response.body.error.errorMessageKey,
          errorMessage: response.body.error.errorMessage,
        },
      ]) || [
      {
        errorCode: response.body.errorCode,
        errorKey: response.body.errorKey,
        errorMessageKey: response.body.errorMessageKey,
        errorMessage: response.body.errorMessage,
      },
    ];

  let errorCodes = '';
  const errorMessages = {};
  for (const error of errorsList) {
    const errorKey = error.errorKey || error.errorCode || error.errorMessageKey;
    if (ERRORS_MAP[error.errorKey]) {
      errorMessages[
        ERRORS_MAP[error.errorKey].formFieldName || GLOBAL_ERROR
      ] = populateErrorPlaceholder(ERRORS_MAP[error.errorKey].errorMessage, error);
    } else if (ERRORS_MAP[error.errorCode]) {
      errorMessages[
        ERRORS_MAP[error.errorCode].formFieldName || GLOBAL_ERROR
      ] = populateErrorPlaceholder(ERRORS_MAP[error.errorCode].errorMessage, error);
      errorMessages.errorParameters = error.errorParameters;
    } else if (ERRORS_MAP[error.errorMessageKey]) {
      errorMessages[
        ERRORS_MAP[error.errorMessageKey].formFieldName || GLOBAL_ERROR
      ] = populateErrorPlaceholder(ERRORS_MAP[error.errorMessageKey].errorMessage, error);
    } else {
      // We send the server error as backup in case we don't have the error in our map, but sometimes backend does not have this either so we default it
      errorMessages[GLOBAL_ERROR] = populateErrorPlaceholder(
        error.errorMessage || ERRORS_MAP.DEFAULT.errorMessage,
        error
      );
    }
    errorCodes += (errorCodes ? ', ' : '') + errorKey;
  }

  return new ServiceError(errorCodes, errorMessages, response.status, response.misc);
}

export function getFormattedError(err) {
  return err.response && err.response.body !== null
    ? getFormattedErrorFromResponse(err.response)
    : err;
}
