import { PAYMENT_ACTION_PATTERN } from '../../../../constants/reducer.constants';

const PAYMENT_CONSTANTS = {
  GET_CARD_LIST: `${PAYMENT_ACTION_PATTERN}GET_CARD_DETAILS`,
  SET_CARD_LIST: `${PAYMENT_ACTION_PATTERN}SET_CARD_DETAILS`,
  GET_CARD_LIST_ERR: `${PAYMENT_ACTION_PATTERN}GET_CARD_DETAILS_ERROR`,
  SET_DEFAULT_PAYMENT: `${PAYMENT_ACTION_PATTERN}SET_DEFAULT_PAYMENT`,
  SET_DEFAULT_PAYMENT_SUCCESS: `${PAYMENT_ACTION_PATTERN}SET_DEFAULT_PAYMENT_SUCCESS`,
  SET_DEFAULT_PAYMENT_ERROR: `${PAYMENT_ACTION_PATTERN}SET_DEFAULT_PAYMENT_ERROR`,
  DELETE_MODAL_MOUNT_STATE: `${PAYMENT_ACTION_PATTERN}DELETE_MODAL_MOUNT_STATE`,
  DELETE_CARD: `${PAYMENT_ACTION_PATTERN}DELETE_CARD`,
  UPDATE_CARD_LIST_ON_DELETE: `${PAYMENT_ACTION_PATTERN}UPDATE_CARD_LIST_ON_DELETE`,
  UPDATE_CARD_LIST_ON_DELETE_ERR: `${PAYMENT_ACTION_PATTERN}UPDATE_CARD_LIST_ON_DELETE_ERR`,
  CHECK_BALANCE: `${PAYMENT_ACTION_PATTERN}CHECK_BALANCE`,
  SET_CHECK_BALANCE: `${PAYMENT_ACTION_PATTERN}SET_CHECK_BALANCE`,
  SET_CHECK_BALANCE_ERROR: `${PAYMENT_ACTION_PATTERN}SET_CHECK_BALANCE_ERROR`,
  SET_LOADER: `${PAYMENT_ACTION_PATTERN}SET_LOADER`,
  SHOW_LOADER: `${PAYMENT_ACTION_PATTERN}SHOW_LOADER`,
  CREDIT_CARDS_PAYMETHODID: {
    'PLACE CARD': 'ADSPlaceCard',
    VISA: 'COMPASSVISA',
    AMEX: 'COMPASSAMEX',
    MC: 'COMPASSMASTERCARD',
    DISC: 'COMPASSDISCOVER',
    VENMO: 'VENMO',
  },
  GET_CARD_LIST_TTL: 30 * 1000,
  ADD_GIFT_CARD_SUCCESS: `${PAYMENT_ACTION_PATTERN}ADD_GIFT_CARD_SUCCESS`,
};

export default PAYMENT_CONSTANTS;
