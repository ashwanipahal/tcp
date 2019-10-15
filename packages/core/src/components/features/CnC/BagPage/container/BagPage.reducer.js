import { fromJS, List } from 'immutable';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import { AVAILABILITY } from '../../../../../services/abstractors/CnC/CartItemTile';

const initialState = fromJS({
  orderDetails: {},
  sfl: [],
  errors: false,
  openItemDeleteConfirmationModalInfo: { showModal: false },
  currentItemId: null,
  moduleXContent: [],
  showConfirmationModal: false,
  isEditingItem: false,
  uiFlags: {
    isPayPalEnabled: false,
    isPayPalWebViewEnable: false,
    lastItemUpdatedId: null,
    isTotalEstimated: true,
    isClosenessQualifier: false,
    recentlyRemovedItemsCount: 0,
    shouldRedirectBackTo: false,
    cartItemForRecommendations: null,
    largeProductImagesLoading: false,
    isCartItemsUpdating: {
      isItemDeleted: false,
      isItemUpdated: false,
    },
    cartItemSflError: null,
    isPickupStoreUpdating: false,
    isItemMovedToSflList: false,
    isSflItemDeleted: false,
    cartItemLargeImagesViewer: {
      opened: false,
      currentIndex: 0,
      itemId: '',
      productId: '',
    },
    isPayPalModalActionOOS: false,
  },
});

function updateItem(state, itemId, status) {
  const indexValue = state
    .getIn(['orderDetails', 'orderItems'])
    .findIndex(item => item.getIn(['itemInfo', 'itemId']) === itemId);
  if (indexValue >= 0) {
    return state.setIn(
      ['orderDetails', 'orderItems', indexValue, 'miscInfo', 'availability'],
      status
    );
  }
  return state;
}

function setCartItemsUpdating(state, isCartItemUpdating) {
  return state.setIn(['uiFlags', 'isCartItemsUpdating'], isCartItemUpdating);
}

function setCartItemsSFL(state, isCartItemSFL) {
  return state.setIn(['uiFlags', 'isItemMovedToSflList'], isCartItemSFL);
}

function setSflItemDeleted(state, isCartItemSFL) {
  return state.setIn(['uiFlags', 'isSflItemDeleted'], isCartItemSFL);
}

function setCartItemsSflError(state, isCartItemSflError) {
  return state.setIn(['uiFlags', 'cartItemSflError'], isCartItemSflError);
}

const returnBagPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BAGPAGE_CONSTANTS.OPEN_CHECKOUT_CONFIRMATION_MODAL:
      return state.set('showConfirmationModal', true).set('isEditingItem', action.payload);
    case BAGPAGE_CONSTANTS.CLOSE_CHECKOUT_CONFIRMATION_MODAL:
      return state.set('showConfirmationModal', false).set('isEditingItem', false);
    case BAGPAGE_CONSTANTS.CART_ITEMS_SET_UPDATING:
      return setCartItemsUpdating(state, action.payload);
    case BAGPAGE_CONSTANTS.CART_ITEMS_SET_SFL:
      return setCartItemsSFL(state, action.payload);
    case BAGPAGE_CONSTANTS.CART_ITEMS_SET_SFL_ERROR:
      return setCartItemsSflError(state, action.payload);
    case BAGPAGE_CONSTANTS.SET_SFL_DATA:
      return state.set('sfl', fromJS(action.payload));
    case BAGPAGE_CONSTANTS.CLOSE_ITEM_DELETE_CONFIRMATION_MODAL:
      return state.set('openItemDeleteConfirmationModalInfo', { showModal: false });
    case BAGPAGE_CONSTANTS.OPEN_ITEM_DELETE_CONFIRMATION_MODAL:
      return state.set('openItemDeleteConfirmationModalInfo', {
        ...action.payload,
        showModal: true,
      });
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

const BagPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BAGPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE:
      return state.set('orderDetails', fromJS(action.payload));
    case BAGPAGE_CONSTANTS.SET_BAG_PAGE_ERRORS:
      return state.set('errors', fromJS(action.payload));
    case BAGPAGE_CONSTANTS.SET_MODULEX_CONTENT:
      return state.set('moduleXContent', List(action.payload));
    case 'CART_SUMMARY_SET_ORDER_ID':
      return state.setIn(['orderDetails', 'orderId'], action.orderId);
    case BAGPAGE_CONSTANTS.SET_ITEM_OOS:
      return updateItem(state, action.payload, AVAILABILITY.SOLDOUT);
    case BAGPAGE_CONSTANTS.PAYPAL_WEBVIEW_ENABLE:
      return state.setIn(['uiFlags', 'isPayPalWebViewEnable'], action.payload);
    case BAGPAGE_CONSTANTS.SET_ITEM_UNAVAILABLE:
      return updateItem(state, action.payload, AVAILABILITY.UNAVAILABLE);
    case BAGPAGE_CONSTANTS.SFL_ITEMS_SET_DELETED:
      return setSflItemDeleted(state, action.payload);
    case BAGPAGE_CONSTANTS.RESET_CART_DATA:
      return initialState;
    default:
      return returnBagPageReducer(state, action);
  }
};

export default BagPageReducer;
