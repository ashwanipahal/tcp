import { getLabelValue } from '@tcp/core/src/utils/utils';
import { AVAILABILITY } from '../../../../../services/abstractors/CnC/CartItemTile';
import getErrorList from './Errors.selector';

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
    checkout: {
      bagPage: {
        lbl_header_bag: bagHeading,
        lbl_emptyBag_loggedInMsg: loggedInMsg,
        lbl_emptyBag_notLoggedInMsg: guestUserMsg,
        lbl_emptyBag_loginIn: login,
        lbl_emptyBag_shopNow: shopNow,
        lbl_emptyBag_inspirationTagLine: tagLine,
        lbl_emptyBag_helperMsg: helperMsg,
      } = {},
    } = {},
    global: {
      addedToBagModal: { lbl_header_addedToBag: addedToBag, lbl_cta_checkout: checkout },
    } = {},
  } = state.Labels;

  const savedForLaterText = getLabelValue(
    state.Labels,
    'lbl_sfl_savedForLater',
    'bagPage',
    'checkout'
  );
  const myBagButton = getLabelValue(state.Labels, 'lbl_sfl_myBagButton', 'bagPage', 'checkout');
  const emptySflMsg = getLabelValue(state.Labels, 'lbl_sfl_emptySflMsg', 'bagPage', 'checkout');
  const savedLaterButton = getLabelValue(
    state.Labels,
    'lbl_sfl_savedLaterButton',
    'bagPage',
    'checkout'
  );
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
    savedForLaterText,
    myBagButton,
    savedLaterButton,
    emptySflMsg,
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
  return getErrorList(state);
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
  const { referred = [] } = state.Labels.global.addedToBagModal;
  const content = referred.find(label => label.name === 'NEED_HELP_DATA');
  return content && content.contentId;
};

const getDetailsContentTcpId = state => {
  const { referred = [] } = state.Labels.checkout.shipping;
  const content = referred.find(label => label.name === 'GiftServicesDetailsTCPModal');
  return content && content.contentId;
};

const getDetailsContentGymId = state => {
  const { referred = [] } = state.Labels.checkout.shipping;
  const content = referred.find(label => label.name === 'GiftServicesDetailsGYMModal');
  return content && content.contentId;
};

const getGiftServicesContentTcpId = state => {
  const { referred = [] } = state.Labels.checkout.shipping;
  const contentTCP = referred.find(label => label.name === 'GiftServicesDetailsTCPModal');
  return contentTCP && contentTCP.contentId;
};

const getGiftServicesContentGymId = ({
  Labels: {
    checkout: { addedToBag: { referred = [] } = {} },
  },
}) => {
  const contentGYM = referred.find(label => label.name === 'GiftServicesDetailsGYMModal');
  return contentGYM && contentGYM.contentId;
};

const getFilteredItems = (state, filter) =>
  getOrderItems(state).filter(item => filter(item.getIn(['miscInfo', 'availability'])));

const getUnqualifiedItems = state => getFilteredItems(state, type => type !== AVAILABILITY.OK);

const getUnqualifiedCount = state => getUnqualifiedItems(state).size;
const getUnqualifiedItemsIds = state =>
  getUnqualifiedItems(state).map(item => item.getIn(['itemInfo', 'itemId']));

const getUnavailableCount = state =>
  getFilteredItems(state, type => type === AVAILABILITY.UNAVAILABLE).size;

const getCurrentOrderId = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'orderId']) || 0;
};

const getOOSCount = state => getFilteredItems(state, type => type === AVAILABILITY.SOLDOUT).size;

const getCurrentCurrency = state => {
  return state.session.getIn(['siteDetails', 'currency']);
};

const getsflItemsList = state => {
  return state.CartPageReducer.get('sfl');
};

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
  getCurrentOrderId,
  getErrorMapping,
  getDetailsContentGymId,
  getDetailsContentTcpId,
  getGiftServicesContentTcpId,
  getGiftServicesContentGymId,
  getCurrentCurrency,
  getsflItemsList,
};
