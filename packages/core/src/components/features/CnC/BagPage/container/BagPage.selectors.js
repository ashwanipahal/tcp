import { createSelector } from 'reselect';
import { getLabelValue } from '../../../../../utils';
import { AVAILABILITY } from '../../../../../services/abstractors/CnC/CartItemTile';
import getErrorList from './Errors.selector';
import BAGPAGE_CONSTANTS from '../BagPage.constants';

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
        lbl_orderledger_total: totalLabel,
        lbl_recently_viewed: recentlyViewed,
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
  const emptySflMsg1 = getLabelValue(state.Labels, 'lbl_sfl_emptySflMsg_1', 'bagPage', 'checkout');
  const emptySflMsg2 = getLabelValue(state.Labels, 'lbl_sfl_emptySflMsg_2', 'bagPage', 'checkout');
  const savedLaterButton = getLabelValue(
    state.Labels,
    'lbl_sfl_savedLaterButton',
    'bagPage',
    'checkout'
  );
  const sflSuccess = getLabelValue(state.Labels, 'bl_sfl_actionSuccess', 'bagPage', 'checkout');
  const sflDeleteSuccess = getLabelValue(
    state.Labels,
    'lbl_sfl_itemDeleteSuccess',
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
    emptySflMsg1,
    emptySflMsg2,
    sflSuccess,
    sflDeleteSuccess,
    totalLabel,
    recentlyViewed,
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

const getGiftServicesContentGymId = state => {
  const { referred = [] } = state.Labels.checkout.shipping;
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

const returnCurrentCurrency = currency => {
  return currency === 'USD' || currency === 'CA' ? '$' : currency;
};
const getCurrentCurrency = state => {
  const currency = state.session && state.session.siteDetails.currency;
  return currency ? returnCurrentCurrency(currency) : '$';
};

const getCartStores = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'stores']);
};

const getCartStoresToJs = createSelector(
  getCartStores,
  store => JSON.parse(JSON.stringify(store))
);

const getsflItemsList = state => {
  return state.CartPageReducer.get('sfl');
};

/** @function checkoutIfItemIsUnqualified to check if item is Unavailable
 * @param {object} state
 * @param {string|number} itemId
 */
const checkoutIfItemIsUnqualified = (state, itemId) => {
  const items = getOrderItems(state);
  const indexValue = items.findIndex(
    item =>
      item.getIn(['itemInfo', 'itemId']) === itemId.toString() &&
      item.getIn(['miscInfo', 'availability']) !== AVAILABILITY.OK
  );
  return indexValue >= 0;
};

/** @function getCurrentDeleteSelectedItemInfo to get confirmation modal info
 * @param {object} state
 */
const getCurrentDeleteSelectedItemInfo = state => {
  return state.CartPageReducer.get('openItemDeleteConfirmationModalInfo');
};

/** @function itemDeleteModalLabels to get item delete confirmation modal info
 * @param {object} state
 */
const itemDeleteModalLabels = state => {
  const getBagLabelByLabelName = labelName =>
    getLabelValue(state.Labels, labelName, 'bagPage', 'checkout');
  return {
    modalTitle: getBagLabelByLabelName('lbl_itemDelete_modalTitle'),
    modalHeading: getBagLabelByLabelName('lbl_itemDelete_modalHeading'),
    modalButtonSFL: getBagLabelByLabelName('lbl_itemDelete_modalButtonSFL'),
    modalButtonConfirmDelete: getBagLabelByLabelName('lbl_itemDelete_modalButtonConfirmDelete'),
  };
};

const getBagStickyHeaderInterval = state => {
  return (
    parseInt(state.session.siteDetails.BAG_CONDENSE_HEADER_INTERVAL, 10) ||
    BAGPAGE_CONSTANTS.BAG_PAGE_STICKY_HEADER_INTERVAL
  );
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
  getCartStores,
  getCartStoresToJs,
  getsflItemsList,
  checkoutIfItemIsUnqualified,
  getCurrentDeleteSelectedItemInfo,
  itemDeleteModalLabels,
  getBagStickyHeaderInterval,
};
