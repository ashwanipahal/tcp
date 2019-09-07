import { AVAILABILITY } from '../../../../../services/abstractors/CnC/CartItemTile';

export const filterProductsBrand = (arr, searchedValue) => {
  const obj = [];
  const filterArray = arr.filter(value => {
    return value.getIn(['productInfo', 'itemBrand']) === searchedValue;
  });
  filterArray.forEach(item => {
    obj.push(item.getIn(['productInfo', 'productPartNumber']));
  });
  return obj;
};

const getBagPageLabels = state => {
  const {
    bag: {
      addedToBag: { lbl_header_addedToBag: addedToBag, lbl_cta_checkout: checkout },
      bagOverview: {
        lbl_header_bag: bagHeading,
        lbl_emptyBag_loggedInMsg: loggedInMsg,
        lbl_emptyBag_notLoggedInMsg: guestUserMsg,
        lbl_emptyBag_loginIn: login,
        lbl_emptyBag_shopNow: shopNow,
        lbl_emptyBag_inspirationTagLine: tagLine,
        lbl_emptyBag_helperMsg: helperMsg,
      } = {},
    } = {},
  } = state.Labels;
  return {
    addedToBag,
    checkout,
    bagHeading,
    loggedInMsg,
    login,
    shopNow,
    tagLine,
    guestUserMsg,
    helperMsg,
  };
};

const getTotalItems = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalItems']) || 0;
};

const getOrderItems = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'orderItems']) || 0;
};

const getConfirmationModalFlag = state => {
  return {
    showModal: state.CartPageReducer.get('showConfirmationModal'),
    isEditingItem: state.CartPageReducer.get('isEditingItem'),
  };
};

const getErrorMapping = state => {
  const {
    global: {
      errorMessages: {
        lbl_errorMessagess_TCP_COUPON_USED_ALREADY: _TCP_COUPON_USED_ALREADY,
        lbl_errorMessages_2270: _2270,
        lbl_errorMessages_2080: _2080,
        lbl_errorMessages_2030: _2030,
        lbl_errorMessages_ERR_LOGONID_ALREDY_EXIST: _ERR_LOGONID_ALREDY_EXIST,
        lbl_errorMessages_ERR_ORDER_NOT_FOUND: ERR_ORDER_NOT_FOUND,
        lbl_errorMessages_TCPGC06: TCPGC06,
        lbl_errorMessages_ERR_DUPLICATE_GIFT_CARD: _ERR_DUPLICATE_GIFT_CARD,
        lbl_errorMessages_ERR_DUPLICATE_CARD: _ERR_DUPLICATE_CARD,
        lbl_errorMessages_ERR_PAY_CARD_NUMBER_INVALID: _ERR_PAY_CARD_NUMBER_INVALID,
        lbl_errorMessages_500: _500,
        lbl_errorMessages_ERR_PROMOTION_CODE_INVALID: ERR_PROMOTION_CODE_INVALID,
        lbl_errorMessages_ERR_MISSING_CMD_PARAMETER: _ERR_MISSING_CMD_PARAMETER,
        lbl_errorMessages_TCP_PROMOTION_LOYALTY_COUPON_NOT_IN_WALLET: _TCP_PROMOTION_LOYALTY_COUPON_NOT_IN_WALLET,
        lbl_errorMessages_TCP_PROMOTION_LOYALTY_AVAILABE_ONLY_FOR_REGISTERED_USER: _TCP_PROMOTION_LOYALTY_AVAILABE_ONLY_FOR_REGISTERED_USER,
        lbl_errorMessages_ERR_USER_AUTHORITY: _ERR_USER_AUTHORITY,
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_US_CROSS_SITE_ADDRESS_NOT_SUPPORTED: PAYPAL_CC_ERROR_CODE_US_CROSS_SITE_ADDRESS_NOT_SUPPORTED,
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_CANADA_CROSS_SITE_ADDRESS_NOT_SUPPORTED: PAYPAL_CC_ERROR_CODE_CANADA_CROSS_SITE_ADDRESS_NOT_SUPPORTED,
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_SHIPPING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT: PAYPAL_CC_ERROR_CODE_SHIPPING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT,
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_BILLING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT: PAYPAL_CC_ERROR_CODE_BILLING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT,
        lbl_errorMessages_TCP02: TCP02,
        lbl_errorMessages_SVS20: SVS20,
        lbl_errorMessages_ERR_INVALID_PIN_CARD: _ERR_INVALID_PIN_CARD,
        lbl_errorMessages_CMN0409E: CMN0409E,
        lbl_errorMessages_ERR_GIFTCARD_SVS15: _ERR_GIFTCARD_SVS15,
        lbl_errorMessages_SVS15: SVS15,
        lbl_errorMessages_SVS16: SVS16,
        lbl_errorMessages_GIFT_CARD_RECAPTCHA_FAILED: GIFT_CARD_RECAPTCHA_FAILED,
        lbl_errorMessages_ERR_GIFTCARD_SVS20: _ERR_GIFTCARD_SVS20,
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_AUTHENTICATION_USER_CANCELED: PAYPAL_CC_ERROR_CODE_AUTHENTICATION_USER_CANCELED,
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_GENERIC_ERROR: PAYPAL_CC_ERROR_CODE_GENERIC_ERROR,
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_FAILED_UPDATE_PAYPAL_TRANS_TABLE: PAYPAL_CC_ERROR_CODE_FAILED_UPDATE_PAYPAL_TRANS_TABLE,
        lbl_errorMessages_PAYPAL_CC_ERROR_CODE_CARDINAL_COMMERCE_ERROR: PAYPAL_CC_ERROR_CODE_CARDINAL_COMMERCE_ERROR,
        lbl_errorMessages_TCP_MIX_ORDER_NOT_ACCEPTED_NOW: TCP_MIX_ORDER_NOT_ACCEPTED_NOW,
        lbl_errorMessages_TCP_BOPIS_ORDER_NOT_ACCEPTED_NOW: _TCP_BOPIS_ORDER_NOT_ACCEPTED_NOW,
        lbl_errorMessages_INVALID_PARAM: INVALID_PARAM,
        lbl_errorMessages_MANDATORY_PARAM_NOT_PASSED: MANDATORY_PARAM_NOT_PASSED,
        lbl_errorMessages_ERR_BAD_PARMS: _ERR_BAD_PARMS,
        lbl_errorMessages_OOS_OR_UNAVAILABLE: OOS_OR_UNAVAILABLE,
        lbl_errorMessages_SVS07: SVS07,
        lbl_errorMessages_SVS08: SVS08,
        lbl_errorMessages_TCP_ERROR_CODE_CARD_DECLINED: TCP_ERROR_CODE_CARD_DECLINED,
        lbl_errorMessages_DEFAULT: DEFAULT,
        lbl_errorMessages_TCP_PAYMENT_PROCESSING_ERR: _TCP_PAYMENT_PROCESSING_ERR,
        lbl_errorMessages_DBG_API_DO_PAYMENT_BAD_XDATE: _DBG_API_DO_PAYMENT_BAD_XDATE,
        lbl_errorMessages_ERR_TAXWARE_UTL_GENERAL_CC: ERR_TAXWARE_UTL_GENERAL_CC,
        lbl_errorMessages_CODE_NOT_APPLICABLE: _CODE_NOT_APPLICABLE,
        lbl_errorMessages_ERR_US_ZIPCODE_INVALID: _ERR_US_ZIPCODE_INVALID,
        lbl_errorMessages_ERR_TAXWARE_UTL_RC: ERR_TAXWARE_UTL_RC,
        lbl_errorMessages_TCP06: TCP06,
        lbl_errorMessages_TCP07: TCP07,
        lbl_errorMessages_INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR,
        lbl_errorMessages_ERR_INTERNAL_SERVER_ERROR: ERR_INTERNAL_SERVER_ERROR,
        lbl_errorMessages_CWXFR0230E: CWXFR0230E,
        lbl_errorMessages_DOM_HISTORY_ERROR_DETECTED: DOM_HISTORY_ERROR_DETECTED,
        lbl_errorMessages_ERR_RDN_ALREADY_EXIST: _ERR_RDN_ALREADY_EXIST,
        lbl_errorMessages_ASSOCIATE_ID_NOT_EXIST: ASSOCIATE_ID_NOT_EXIST,
        lbl_errorMessages_ASSOCIATE_ID_DOES_NOT_EXIST: ASSOCIATE_ID_DOES_NOT_EXIST,
        lbl_errorMessages_ASSOCIATE_ID_NOT_VALID: ASSOCIATE_ID_NOT_VALID,
        lbl_errorMessages_ASSOCIATE_ID_NOT_EXIST_FOR_THE_USER: ASSOCIATE_ID_NOT_EXIST_FOR_THE_USER,
        lbl_errorMessages_INVALID_CURRENT_PASSWORD: INVALID_CURRENT_PASSWORD,
        lbl_errorMessages_ERR_MAX_LIMIT_REACHED: _ERR_MAX_LIMIT_REACHED,
        lbl_errorMessages_INVALID_PRESCREEN_CODE: INVALID_PRESCREEN_CODE,
        lbl_errorMessages_MY_ACCOUNT_POINTS_CLAIM_2: MY_ACCOUNT_POINTS_CLAIM_2,
        lbl_errorMessages_MY_ACCOUNT_POINTS_CLAIM_3: MY_ACCOUNT_POINTS_CLAIM_3,
        lbl_errorMessages_MY_ACCOUNT_POINTS_CLAIM_4: MY_ACCOUNT_POINTS_CLAIM_4,
        lbl_errorMessages_ERR_DUPLICATE_CARD: ERR_DUPLICATE_CARD,
        lbl_errorMessages_ERR_SYSTEM_NOT_AVAILABLE: ERR_SYSTEM_NOT_AVAILABLE,
        lbl_errorMessages_ERR_ORD_EMAIL_MISMATCH: ERR_ORD_EMAIL_MISMATCH,
        lbl_errorMessages_TCPBPO01: TCPBPO01,
        lbl_errorMessages_BOPIS_NOT_AVAILABLE: BOPIS_NOT_AVAILABLE,
        lbl_errorMessages_NO_STORES_FOUND: NO_STORES_FOUND,
        lbl_errorMessages_ERR_SOMETHING_WRONG: ERR_SOMETHING_WRONG,
        lbl_errorMessages_ERROR_OCCURED: _ERROR_OCCURED,
        lbl_errorMessages_ERR_GIFTLIST_NAME_TOO_LONG: _ERR_GIFTLIST_NAME_TOO_LONG,
        lbl_errorMessages_ERR_GIFTLIST_ITEM_CATALOGENTRY_NOT_FOUND: _ERR_GIFTLIST_ITEM_CATALOGENTRY_NOT_FOUND,
        lbl_errorMessages_OOB_ERROR: OOB_ERROR,
        lbl_errorMessages_WIC_RTPS_COUPON_NOT_APPLIED: _WIC_RTPS_COUPON_NOT_APPLIED,
        lbl_errorMessages_RTPS_INACTIVE_PAYMENT: _RTPS_INACTIVE_PAYMENT,
        lbl_errorMessages_TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_CVV_ERROR: _TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_CVV_ERROR,
        lbl_errorMessages_ERR_CREDENTIALS_EXPIRED: _ERR_CREDENTIALS_EXPIRED,
        lbl_errorMessages_TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_AUTH_ERROR: _TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_AUTH_ERROR,
        lbl_errorMessages_INVALID_RECAPTCHA: INVALID_RECAPTCHA,
        lbl_errorMessages_EMPTY_RECAPTCHA: EMPTY_RECAPTCHA,
        lbl_errorMessages_TCP_PAYMENT_INSUFFICIENT: _TCP_PAYMENT_INSUFFICIENT,
        lbl_errorMessages_LOYALTY_NOT_ACTIVE: LOYALTY_NOT_ACTIVE,
        lbl_errorMessages_ERR_MAX_ITEMCOUNT: ERR_MAX_ITEMCOUNT,
        lbl_errorMessages_ERR_INVALID_ADDR: _ERR_INVALID_ADDR,
        lbl_errorMessages_VIDES_ERRRO_1: VIDES_ERRRO_1,
        lbl_errorMessages_VIDES_ERRRO_2: VIDES_ERRRO_2,
        lbl_errorMessages_TCP_PROMOTION_COUPON_EXPIRED: _TCP_PROMOTION_COUPON_EXPIRED,
        lbl_errorMessages_COUPON_GENERIC: COUPON_GENERIC,
        lbl_errorMessages_ERR_PROMOTION_NOT_AVAILABLE_AT_THIS_TIME: ERR_PROMOTION_NOT_AVAILABLE_AT_THIS_TIME,
        lbl_errorMessages_ERR_MORE_THAN_15_ITEM_IN_CART_ERROR: _ERR_MORE_THAN_15_ITEM_IN_CART_ERROR,
        lbl_errorMessages_API_CANT_RESOLVE_FFMCENTER: _API_CANT_RESOLVE_FFMCENTER,
        lbl_errorMessages_API_BAD_INV: _API_BAD_INV,
        lbl_errorMessages_VENMO_GENERAL_ERROR: VENMO_GENERAL_ERROR,
        lbl_errorMessages_TCP_AUTH_REQUEST_FAILED_WITH_PLCC_AVS_ERROR: _TCP_AUTH_REQUEST_FAILED_WITH_PLCC_AVS_ERROR,
        lbl_errorMessages_API_CART_OOS_ITEM: API_CART_OOS_ITEM,
      } = {},
    } = {},
  } = state.Labels;
  return {
    _TCP_COUPON_USED_ALREADY,
    _2270,
    _2080,
    _2030,
    _ERR_LOGONID_ALREDY_EXIST,
    ERR_ORDER_NOT_FOUND,
    TCPGC06,
    _ERR_DUPLICATE_GIFT_CARD,
    _ERR_DUPLICATE_CARD,
    _ERR_PAY_CARD_NUMBER_INVALID,
    _500,
    ERR_PROMOTION_CODE_INVALID,
    _ERR_MISSING_CMD_PARAMETER,
    _TCP_PROMOTION_LOYALTY_COUPON_NOT_IN_WALLET,
    _TCP_PROMOTION_LOYALTY_AVAILABE_ONLY_FOR_REGISTERED_USER,
    _ERR_USER_AUTHORITY,
    PAYPAL_CC_ERROR_CODE_US_CROSS_SITE_ADDRESS_NOT_SUPPORTED,
    PAYPAL_CC_ERROR_CODE_CANADA_CROSS_SITE_ADDRESS_NOT_SUPPORTED,
    PAYPAL_CC_ERROR_CODE_SHIPPING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT,
    PAYPAL_CC_ERROR_CODE_BILLING_LASTNAME_OR_FIRSTNAME_NOT_AVAILABLE_IN_PAYPAL_ACCOUNT,
    TCP02,
    SVS20,
    _ERR_INVALID_PIN_CARD,
    CMN0409E,
    _ERR_GIFTCARD_SVS15,
    SVS15,
    SVS16,
    GIFT_CARD_RECAPTCHA_FAILED,
    _ERR_GIFTCARD_SVS20,
    PAYPAL_CC_ERROR_CODE_AUTHENTICATION_USER_CANCELED,
    PAYPAL_CC_ERROR_CODE_GENERIC_ERROR,
    PAYPAL_CC_ERROR_CODE_FAILED_UPDATE_PAYPAL_TRANS_TABLE,
    PAYPAL_CC_ERROR_CODE_CARDINAL_COMMERCE_ERROR,
    TCP_MIX_ORDER_NOT_ACCEPTED_NOW,
    _TCP_BOPIS_ORDER_NOT_ACCEPTED_NOW,
    INVALID_PARAM,
    MANDATORY_PARAM_NOT_PASSED,
    _ERR_BAD_PARMS,
    OOS_OR_UNAVAILABLE,
    SVS07,
    SVS08,
    TCP_ERROR_CODE_CARD_DECLINED,
    DEFAULT,
    _TCP_PAYMENT_PROCESSING_ERR,
    _DBG_API_DO_PAYMENT_BAD_XDATE,
    ERR_TAXWARE_UTL_GENERAL_CC,
    _CODE_NOT_APPLICABLE,
    _ERR_US_ZIPCODE_INVALID,
    ERR_TAXWARE_UTL_RC,
    TCP06,
    TCP07,
    INTERNAL_SERVER_ERROR,
    ERR_INTERNAL_SERVER_ERROR,
    CWXFR0230E,
    DOM_HISTORY_ERROR_DETECTED,
    _ERR_RDN_ALREADY_EXIST,
    ASSOCIATE_ID_NOT_EXIST,
    ASSOCIATE_ID_DOES_NOT_EXIST,
    ASSOCIATE_ID_NOT_VALID,
    ASSOCIATE_ID_NOT_EXIST_FOR_THE_USER,
    INVALID_CURRENT_PASSWORD,
    _ERR_MAX_LIMIT_REACHED,
    INVALID_PRESCREEN_CODE,
    MY_ACCOUNT_POINTS_CLAIM_2,
    MY_ACCOUNT_POINTS_CLAIM_3,
    MY_ACCOUNT_POINTS_CLAIM_4,
    ERR_DUPLICATE_CARD,
    ERR_SYSTEM_NOT_AVAILABLE,
    ERR_ORD_EMAIL_MISMATCH,
    TCPBPO01,
    BOPIS_NOT_AVAILABLE,
    NO_STORES_FOUND,
    ERR_SOMETHING_WRONG,
    _ERROR_OCCURED,
    _ERR_GIFTLIST_NAME_TOO_LONG,
    _ERR_GIFTLIST_ITEM_CATALOGENTRY_NOT_FOUND,
    OOB_ERROR,
    _WIC_RTPS_COUPON_NOT_APPLIED,
    _RTPS_INACTIVE_PAYMENT,
    _TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_CVV_ERROR,
    _ERR_CREDENTIALS_EXPIRED,
    _TCP_CVV_REQUEST_FAILED_WITH_CREDIT_CARD_AUTH_ERROR,
    INVALID_RECAPTCHA,
    EMPTY_RECAPTCHA,
    _TCP_PAYMENT_INSUFFICIENT,
    LOYALTY_NOT_ACTIVE,
    ERR_MAX_ITEMCOUNT,
    _ERR_INVALID_ADDR,
    VIDES_ERRRO_1,
    VIDES_ERRRO_2,
    _TCP_PROMOTION_COUPON_EXPIRED,
    COUPON_GENERIC,
    ERR_PROMOTION_NOT_AVAILABLE_AT_THIS_TIME,
    _ERR_MORE_THAN_15_ITEM_IN_CART_ERROR,
    _API_CANT_RESOLVE_FFMCENTER,
    _API_BAD_INV,
    VENMO_GENERAL_ERROR,
    _TCP_AUTH_REQUEST_FAILED_WITH_PLCC_AVS_ERROR,
    API_CART_OOS_ITEM,
  };
};

const getProductsTypes = state => {
  const orderItems = getOrderItems(state);
  let tcpProducts = [];
  let gymProducts = [];
  if (orderItems) {
    tcpProducts = filterProductsBrand(orderItems, 'TCP');
    gymProducts = filterProductsBrand(orderItems, 'GYM');
  }
  return {
    tcpProducts,
    gymProducts,
  };
};

const getNeedHelpContentId = state => {
  const { referred = [] } = state.Labels.bag.addedToBag;
  const content = referred.find(label => label.name === 'NEED_HELP_DATA');
  return content && content.contentId;
};

const getFilteredItems = (state, filter) =>
  getOrderItems(state).filter(item => filter(item.getIn(['miscInfo', 'availability'])));

const getUnqualifiedItems = state => getFilteredItems(state, type => type !== AVAILABILITY.OK);

const getUnqualifiedCount = state => getUnqualifiedItems(state).size;
const getUnqualifiedItemsIds = state =>
  getUnqualifiedItems(state).map(item => item.getIn(['itemInfo', 'itemId']));

const getUnavailableCount = state =>
  getFilteredItems(state, type => type === AVAILABILITY.UNAVAILABLE).size;

const getOOSCount = state => getFilteredItems(state, type => type === AVAILABILITY.SOLDOUT).size;

export default {
  getBagPageLabels,
  getTotalItems,
  getOrderItems,
  getProductsTypes,
  getNeedHelpContentId,
  getUnqualifiedCount,
  getUnqualifiedItemsIds,
  getUnavailableCount,
  getOOSCount,
  getConfirmationModalFlag,
  getFilteredItems,
  getErrorMapping,
};
