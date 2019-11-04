/* eslint-disable max-lines */
import { getLabelValue } from '@tcp/core/src/utils';

const getErrorList = state => {
  return {
    _TCP_COUPON_USED_ALREADY: getLabelValue(
      state.Labels,
      'lbl_errorMessagess_TCP_COUPON_USED_ALREADY',
      'errorMessages',
      'global'
    ),
    CWXFR0221E: getLabelValue(state.Labels, 'lbl_errorMessages_DEFAULT', 'errorMessages', 'global'),
    _2270: getLabelValue(state.Labels, 'lbl_errorMessages_2270', 'errorMessages', 'global'),
    _2080: getLabelValue(state.Labels, 'lbl_errorMessages_2080', 'errorMessages', 'global'),
    _2030: getLabelValue(state.Labels, 'lbl_errorMessages_2030', 'errorMessages', 'global'),
    _ERR_LOGONID_ALREDY_EXIST: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_LOGONID_ALREDY_EXIST',
      'errorMessages',
      'global'
    ),
    ERR_ORDER_NOT_FOUND: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_ORDER_NOT_FOUND',
      'errorMessages',
      'global'
    ),
    TCPGC06: getLabelValue(state.Labels, 'lbl_errorMessages_TCPGC06', 'errorMessages', 'global'),
    _ERR_DUPLICATE_GIFT_CARD: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_DUPLICATE_GIFT_CARD',
      'errorMessages',
      'global'
    ),
    _ERR_DUPLICATE_CARD: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_DUPLICATE_CARD',
      'errorMessages',
      'global'
    ),
    _ERR_PAY_CARD_NUMBER_INVALID: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_PAY_CARD_NUMBER_INVALID',
      'errorMessages',
      'global'
    ),
    _500: getLabelValue(state.Labels, 'lbl_errorMessages_500', 'errorMessages', 'global'),
    ERR_PROMOTION_CODE_INVALID: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_PROMOTION_CODE_INVALID',
      'errorMessages',
      'global'
    ),
    _ERR_MISSING_CMD_PARAMETER: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_MISSING_CMD_PARAMETER',
      'errorMessages',
      'global'
    ),
    _TCP_PROMOTION_LOYALTY_COUPON_NOT_IN_WALLET: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_PROMOTION_LOYALTY_COUPON_NOT_IN_WALLET',
      'errorMessages',
      'global'
    ),
    _TCP_PROMOTION_LOYALTY_AVAILABE_ONLY_FOR_REGISTERED_USER: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_PROMOTION_LOYALTY_AVAILABE_ONLY_FOR_REGISTERED_USER',
      'errorMessages',
      'global'
    ),
    _ERR_USER_AUTHORITY: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_USER_AUTHORITY',
      'errorMessages',
      'global'
    ),
    PAYPAL_CC_ERROR_CODE_US_CROSS_SITE_ADDRESS_NOT_SUPPORTED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_PAYPAL_CC_ERROR_CODE_US_CROSS_SITE_ADDRESS_NOT_SUPPORTED',
      'errorMessages',
      'global'
    ),
    PAYPAL_CC_ERROR_CODE_CANADA_CROSS_SITE_ADDRESS_NOT_SUPPORTED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_PAYPAL_CC_ERROR_CODE_CANADA_CROSS_SITE_ADDRESS_NOT_SUPPORTED',
      'errorMessages',
      'global'
    ),
    PAYPAL_CC_ERROR_CODE_SHIPPING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT: getLabelValue(
      state.Labels,
      'lbl_errorMessages_PAYPAL_CC_ERROR_CODE_SHIPPING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT',
      'errorMessages',
      'global'
    ),
    PAYPAL_CC_ERROR_CODE_BILLING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT: getLabelValue(
      state.Labels,
      'lbl_errorMessages_PAYPAL_CC_ERROR_CODE_SHIPPING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT',
      'errorMessages',
      'global'
    ),
    TCP02: getLabelValue(state.Labels, 'lbl_errorMessages_TCP02', 'errorMessages', 'global'),
    SVS20: getLabelValue(state.Labels, 'lbl_errorMessages_SVS20', 'errorMessages', 'global'),
    _ERR_INVALID_PIN_CARD: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_INVALID_PIN_CARD',
      'errorMessages',
      'global'
    ),
    CMN0409E: getLabelValue(state.Labels, 'lbl_errorMessages_CMN0409E', 'errorMessages', 'global'),
    _ERR_GIFTCARD_SVS15: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_GIFTCARD_SVS15',
      'errorMessages',
      'global'
    ),
    SVS15: getLabelValue(state.Labels, 'lbl_errorMessages_SVS15', 'errorMessages', 'global'),
    SVS16: getLabelValue(state.Labels, 'lbl_errorMessages_SVS16', 'errorMessages', 'global'),
    GIFT_CARD_RECAPTCHA_FAILED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_GIFT_CARD_RECAPTCHA_FAILED',
      'errorMessages',
      'global'
    ),
    _ERR_GIFTCARD_SVS20: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_GIFTCARD_SVS20',
      'errorMessages',
      'global'
    ),
    PAYPAL_CC_ERROR_CODE_AUTHENTICATION_USER_CANCELED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_PAYPAL_CC_ERROR_CODE_AUTHENTICATION_USER_CANCELED',
      'errorMessages',
      'global'
    ),
    PAYPAL_CC_ERROR_CODE_GENERIC_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_PAYPAL_CC_ERROR_CODE_GENERIC_ERROR',
      'errorMessages',
      'global'
    ),
    PAYPAL_CC_ERROR_CODE_FAILED_UPDATE_PAYPAL_TRANS_TABLE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_PAYPAL_CC_ERROR_CODE_FAILED_UPDATE_PAYPAL_TRANS_TABLE',
      'errorMessages',
      'global'
    ),
    PAYPAL_CC_ERROR_CODE_CARDINAL_COMMERCE_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_PAYPAL_CC_ERROR_CODE_CARDINAL_COMMERCE_ERROR',
      'errorMessages',
      'global'
    ),
    TCP_MIX_ORDER_NOT_ACCEPTED_NOW: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_MIX_ORDER_NOT_ACCEPTED_NOW',
      'errorMessages',
      'global'
    ),
    _TCP_BOPIS_ORDER_NOT_ACCEPTED_NOW: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_BOPIS_ORDER_NOT_ACCEPTED_NOW',
      'errorMessages',
      'global'
    ),
    INVALID_PARAM: getLabelValue(
      state.Labels,
      'lbl_errorMessages_INVALID_PARAM',
      'errorMessages',
      'global'
    ),
    MANDATORY_PARAM_NOT_PASSED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_MANDATORY_PARAM_NOT_PASSED',
      'errorMessages',
      'global'
    ),
    _ERR_BAD_PARMS: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_BAD_PARMS',
      'errorMessages',
      'global'
    ),
    OOS_OR_UNAVAILABLE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_OOS_OR_UNAVAILABLE',
      'errorMessages',
      'global'
    ),
    SVS07: getLabelValue(state.Labels, 'lbl_errorMessages_SVS07', 'errorMessages', 'global'),
    SVS08: getLabelValue(state.Labels, 'lbl_errorMessages_SVS08', 'errorMessages', 'global'),
    TCP_ERROR_CODE_CARD_DECLINED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_ERROR_CODE_CARD_DECLINED',
      'errorMessages',
      'global'
    ),
    DEFAULT: getLabelValue(state.Labels, 'lbl_errorMessages_DEFAULT', 'errorMessages', 'global'),
    _TCP_PAYMENT_PROCESSING_ERR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_PAYMENT_PROCESSING_ERR',
      'errorMessages',
      'global'
    ),
    _DBG_API_DO_PAYMENT_BAD_XDATE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_DBG_API_DO_PAYMENT_BAD_XDATE',
      'errorMessages',
      'global'
    ),
    ERR_TAXWARE_UTL_GENERAL_CC: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_TAXWARE_UTL_GENERAL_CC',
      'errorMessages',
      'global'
    ),
    _CODE_NOT_APPLICABLE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_CODE_NOT_APPLICABLE',
      'errorMessages',
      'global'
    ),
    _ERR_US_ZIPCODE_INVALID: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_US_ZIPCODE_INVALID',
      'errorMessages',
      'global'
    ),
    ERR_TAXWARE_UTL_RC: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_TAXWARE_UTL_RC',
      'errorMessages',
      'global'
    ),
    TCP06: getLabelValue(state.Labels, 'lbl_errorMessages_TCP06', 'errorMessages', 'global'),
    TCP07: getLabelValue(state.Labels, 'lbl_errorMessages_TCP07', 'errorMessages', 'global'),
    INTERNAL_SERVER_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_INTERNAL_SERVER_ERROR',
      'errorMessages',
      'global'
    ),
    ERR_INTERNAL_SERVER_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_INTERNAL_SERVER_ERROR',
      'errorMessages',
      'global'
    ),
    CWXFR0230E: getLabelValue(
      state.Labels,
      'lbl_errorMessages_CWXFR0230E',
      'errorMessages',
      'global'
    ),
    DOM_HISTORY_ERROR_DETECTED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_DOM_HISTORY_ERROR_DETECTED',
      'errorMessages',
      'global'
    ),
    _ERR_RDN_ALREADY_EXIST: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_RDN_ALREADY_EXIST',
      'errorMessages',
      'global'
    ),
    ASSOCIATE_ID_NOT_EXIST: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ASSOCIATE_ID_NOT_EXIST',
      'errorMessages',
      'global'
    ),
    ASSOCIATE_ID_DOES_NOT_EXIST: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ASSOCIATE_ID_DOES_NOT_EXIST',
      'errorMessages',
      'global'
    ),
    ASSOCIATE_ID_NOT_VALID: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ASSOCIATE_ID_NOT_VALID',
      'errorMessages',
      'global'
    ),
    ASSOCIATE_ID_NOT_EXIST_FOR_THE_USER: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ASSOCIATE_ID_NOT_EXIST_FOR_THE_USER',
      'errorMessages',
      'global'
    ),
    INVALID_CURRENT_PASSWORD: getLabelValue(
      state.Labels,
      'lbl_errorMessages_INVALID_CURRENT_PASSWORD',
      'errorMessages',
      'global'
    ),
    _ERR_MAX_LIMIT_REACHED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_MAX_LIMIT_REACHED',
      'errorMessages',
      'global'
    ),
    INVALID_PRESCREEN_CODE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_INVALID_PRESCREEN_CODE',
      'errorMessages',
      'global'
    ),
    MY_ACCOUNT_POINTS_CLAIM_2: getLabelValue(
      state.Labels,
      'lbl_errorMessages_MY_ACCOUNT_POINTS_CLAIM_2',
      'errorMessages',
      'global'
    ),
    MY_ACCOUNT_POINTS_CLAIM_3: getLabelValue(
      state.Labels,
      'lbl_errorMessages_MY_ACCOUNT_POINTS_CLAIM_3',
      'errorMessages',
      'global'
    ),
    MY_ACCOUNT_POINTS_CLAIM_4: getLabelValue(
      state.Labels,
      'lbl_errorMessages_MY_ACCOUNT_POINTS_CLAIM_4',
      'errorMessages',
      'global'
    ),
    ERR_DUPLICATE_CARD: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_DUPLICATE_CARD',
      'errorMessages',
      'global'
    ),
    ERR_SYSTEM_NOT_AVAILABLE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_SYSTEM_NOT_AVAILABLE',
      'errorMessages',
      'global'
    ),
    ERR_ORD_EMAIL_MISMATCH: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_ORD_EMAIL_MISMATCH',
      'errorMessages',
      'global'
    ),
    TCPBPO01: getLabelValue(state.Labels, 'lbl_errorMessages_TCPBPO01', 'errorMessages', 'global'),
    BOPIS_NOT_AVAILABLE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_BOPIS_NOT_AVAILABLE',
      'errorMessages',
      'global'
    ),
    NO_STORES_FOUND: getLabelValue(
      state.Labels,
      'lbl_errorMessages_NO_STORES_FOUND',
      'errorMessages',
      'global'
    ),
    ERR_SOMETHING_WRONG: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_SOMETHING_WRONG',
      'errorMessages',
      'global'
    ),
    _ERROR_OCCURED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERROR_OCCURED',
      'errorMessages',
      'global'
    ),
    _ERR_GIFTLIST_NAME_TOO_LONG: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_GIFTLIST_NAME_TOO_LONG',
      'errorMessages',
      'global'
    ),
    _ERR_GIFTLIST_ITEM_CATALOGENTRY_NOT_FOUND: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_GIFTLIST_ITEM_CATALOGENTRY_NOT_FOUND',
      'errorMessages',
      'global'
    ),
    OOB_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_OOB_ERROR',
      'errorMessages',
      'global'
    ),
    _WIC_RTPS_COUPON_NOT_APPLIED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_WIC_RTPS_COUPON_NOT_APPLIED',
      'errorMessages',
      'global'
    ),
    _RTPS_INACTIVE_PAYMENT: getLabelValue(
      state.Labels,
      'lbl_errorMessages_RTPS_INACTIVE_PAYMENT',
      'errorMessages',
      'global'
    ),
    _TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_CVV_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_CVV_ERROR',
      'errorMessages',
      'global'
    ),
    _ERR_CREDENTIALS_EXPIRED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_CREDENTIALS_EXPIRED',
      'errorMessages',
      'global'
    ),
    _TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_AUTH_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_AUTH_ERROR',
      'errorMessages',
      'global'
    ),
    INVALID_RECAPTCHA: getLabelValue(
      state.Labels,
      'lbl_errorMessages_INVALID_RECAPTCHA',
      'errorMessages',
      'global'
    ),
    EMPTY_RECAPTCHA: getLabelValue(
      state.Labels,
      'lbl_errorMessages_EMPTY_RECAPTCHA',
      'errorMessages',
      'global'
    ),
    _TCP_PAYMENT_INSUFFICIENT: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_PAYMENT_INSUFFICIENT',
      'errorMessages',
      'global'
    ),
    LOYALTY_NOT_ACTIVE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_LOYALTY_NOT_ACTIVE',
      'errorMessages',
      'global'
    ),
    ERR_MAX_ITEMCOUNT: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_MAX_ITEMCOUNT',
      'errorMessages',
      'global'
    ),
    _ERR_INVALID_ADDR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_INVALID_ADDR',
      'errorMessages',
      'global'
    ),
    VIDES_ERRRO_1: getLabelValue(
      state.Labels,
      'lbl_errorMessages_VIDES_ERRRO_1',
      'errorMessages',
      'global'
    ),
    VIDES_ERRRO_2: getLabelValue(
      state.Labels,
      'lbl_errorMessages_VIDES_ERRRO_2',
      'errorMessages',
      'global'
    ),
    _TCP_PROMOTION_COUPON_EXPIRED: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_PROMOTION_COUPON_EXPIRED',
      'errorMessages',
      'global'
    ),
    COUPON_GENERIC: getLabelValue(
      state.Labels,
      'lbl_errorMessages_COUPON_GENERIC',
      'errorMessages',
      'global'
    ),
    ERR_PROMOTION_NOT_AVAILABLE_AT_THIS_TIME: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_PROMOTION_NOT_AVAILABLE_AT_THIS_TIME',
      'errorMessages',
      'global'
    ),
    _ERR_MORE_THAN_15_ITEM_IN_CART_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ERR_MORE_THAN_15_ITEM_IN_CART_ERROR',
      'errorMessages',
      'global'
    ),
    _API_CANT_RESOLVE_FFMCENTER: getLabelValue(
      state.Labels,
      'lbl_errorMessages_API_CANT_RESOLVE_FFMCENTER',
      'errorMessages',
      'global'
    ),
    _API_BAD_INV: getLabelValue(
      state.Labels,
      'lbl_errorMessages_API_BAD_INV',
      'errorMessages',
      'global'
    ),
    VENMO_GENERAL_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_VENMO_GENERAL_ERROR',
      'errorMessages',
      'global'
    ),
    _TCP_AUTH_REQUEST_FAILED_WITH_PLCC_AVS_ERROR: getLabelValue(
      state.Labels,
      'lbl_errorMessages_TCP_AUTH_REQUEST_FAILED_WITH_PLCC_AVS_ERROR',
      'errorMessages',
      'global'
    ),
    API_CART_OOS_ITEM: getLabelValue(
      state.Labels,
      'lbl_errorMessages_API_CART_OOS_ITEM',
      'errorMessages',
      'global'
    ),
    ERR_ADDRESS_NOT_ELIGIBLE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_ADDRESS_NOT_ELIGIBLE',
      'errorMessages',
      'global'
    ),
    ERR_NO_ADDR_AVAILABLE: getLabelValue(
      state.Labels,
      'lbl_errorMessages_NO_ADDR_AVAILABLE',
      'errorMessages',
      'global'
    ),
    ERR_REQUEST_TIMEOUT: getLabelValue(
      state.Labels,
      'lbl_errorMessages_PROCESS_REQUEST_ERROR',
      'errorMessages',
      'global'
    ),
  };
};

export default getErrorList;
