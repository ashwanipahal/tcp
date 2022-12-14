import { fromJS, List } from 'immutable';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import { AVAILABILITY } from '../../../../../services/abstractors/CnC/CartItemTile';

const initialState = fromJS({
  orderDetails: {},
  sfl: [],
  errors: false,
  loaded: false, // flag to check if cart data is fetched for the first time.
  bagLoading: true, // flag to check if cart data is loading (set/unset every time cart API invokes)
  isRouting: false, // flag to check if cart page is routing to some other page.
  openItemDeleteConfirmationModalInfo: { showModal: false },
  currentItemId: null,
  moduleXContent: [],
  showConfirmationModal: false,
  isEditingItem: false,

  uiFlags: {
    isPayPalEnabled: false,
    isPayPalWebViewEnable: false,
    isPayPalRenderDone: false,
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

const resetState = initialState
  .set('bagLoading', false)
  .set('loaded', true)
  .set('orderDetails', fromJS({ orderItems: [] }));

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

const returnBagPageReducerExtension = (state = initialState, action) => {
  switch (action.type) {
    case BAGPAGE_CONSTANTS.PAYPAL_BUTTON_HIDDEN:
      return state.set('paypalBtnHidden', action.payload);
    case BAGPAGE_CONSTANTS.FETCHING_CART_DATA:
      return state.set('bagLoading', true);
    case BAGPAGE_CONSTANTS.RESET_BAG_LOADED_STATE:
      return state.set('loaded', false);
    case BAGPAGE_CONSTANTS.SET_BAG_PAGE_ROUTING:
      return state.set('isRouting', action.payload);
    case BAGPAGE_CONSTANTS.IS_PAYPAL_BUTTON_RENDER_DONE:
      return state.setIn(['uiFlags', 'isPayPalRenderDone'], action.payload);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

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
    case BAGPAGE_CONSTANTS.SET_TRANSLATED_SFL_DATA:
      return state.set('sfl', fromJS(action.payload));
    case BAGPAGE_CONSTANTS.CLOSE_ITEM_DELETE_CONFIRMATION_MODAL:
      return state.set('openItemDeleteConfirmationModalInfo', { showModal: false });
    case BAGPAGE_CONSTANTS.OPEN_ITEM_DELETE_CONFIRMATION_MODAL:
      return state.set('openItemDeleteConfirmationModalInfo', {
        ...action.payload,
        showModal: true,
      });

    default:
      return returnBagPageReducerExtension(state, action);
  }
};

const BagPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BAGPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE:
      return state
        .set('loaded', true)
        .set('bagLoading', false)
        .set('orderDetails', fromJS(action.payload));
    case BAGPAGE_CONSTANTS.SET_BAG_PAGE_ERRORS:
      return state.set('errors', fromJS(action.payload)).set('bagLoading', false);
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
      return resetState;
    default:
      return returnBagPageReducer(state, action);
  }
};

export default BagPageReducer;
