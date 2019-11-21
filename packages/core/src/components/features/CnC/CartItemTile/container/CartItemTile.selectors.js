import { getLabelValue } from '@tcp/core/src/utils';
import { SESSIONCONFIG_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

export const getCartOrderList = state => {
  // needs to do it with get method.
  return state.CartPageReducer.getIn(['orderDetails', 'orderItems']);
};
export const getEditableProductInfo = state => {
  // needs to do it with get method.
  return state.CartItemTileReducer.getIn(['editableItemData', 'colorFitsSizesMap']);
};

export const getCartOrderDetails = state => {
  return state.CartPageReducer.get('orderDetails');
};

export const getIsMiniBagOpen = state => {
  return state.Header.miniBag;
};

export const getCartOrderId = state => {
  return getCartOrderDetails(state).get('orderId');
};

export const getProductName = product => {
  return product.getIn(['productInfo', 'name']);
};

export const checkForGiftItem = product => {
  return product.getIn(['productInfo', 'isGiftCard']);
};

export const getProductFit = product => {
  return product.getIn(['productInfo', 'fit']);
};

export const getProductColor = product => {
  return product.getIn(['productInfo', 'color', 'name']);
};

export const getProductSize = product => {
  return product.getIn(['productInfo', 'size']);
};

export const getProductOfferPrice = product => {
  return product.getIn(['itemInfo', 'offerPrice']);
};

export const getProductQty = product => {
  return product.getIn(['itemInfo', 'quantity']);
};

export const getProductPoints = product => {
  return product.getIn(['itemInfo', 'itemPoints']);
};

export const getProductBrand = product => {
  return product.getIn(['productInfo', 'itemBrand']);
};

export const getProductImage = product => {
  return product.getIn(['productInfo', 'imagePath']);
};

export const getOrderItemId = product => {
  return product.getIn(['itemInfo', 'itemId']);
};

export const getProductPartNumber = product => {
  return product.getIn(['productInfo', 'productPartNumber']);
};

export const getProductItemPartNumber = product => {
  return product.getIn(['productInfo', 'itemPartNumber']);
};

export const getVariantNumber = product => {
  return product.getIn(['productInfo', 'variantNo']);
};

export const getProductBadge = product => {
  return product.getIn(['miscInfo', 'badge', 'defaultBadge']);
};

export const getProductStore = product => {
  return product.getIn(['miscInfo', 'store']);
};

export const getProductStoreAddress = product => {
  return product.getIn(['miscInfo', 'storeAddress']);
};

export const getProductOrderItemType = product => {
  return product.getIn(['miscInfo', 'orderItemType']);
};

export const getBossStartDate = product => {
  return product.getIn(['miscInfo', 'bossStartDate']);
};

export const getBossEndDate = product => {
  return product.getIn(['miscInfo', 'bossEndDate']);
};

export const getProductAvailability = product => {
  return product.getIn(['miscInfo', 'availability']);
};

export const getIsBossEligible = product => {
  return product.getIn(['miscInfo', 'isBossEligible']);
};

export const getIsBopisEligible = product => {
  return product.getIn(['miscInfo', 'isBopisEligible']);
};

export const getIsOnlineOnly = product => {
  return product.getIn(['miscInfo', 'isOnlineOnly']);
};

export const getClearanceItem = product => {
  return product.getIn(['miscInfo', 'clearanceItem']);
};

export const getIsInventoryAvailBOSS = product => {
  return product.getIn(['miscInfo', 'isInventoryAvailBOSS']);
};

export const getIsStoreBOSSEligible = product => {
  return product.getIn(['miscInfo', 'isStoreBOSSEligible']);
};

export const getStoreTodayOpenRange = product => {
  return product.getIn(['miscInfo', 'storeTodayOpenRange']);
};

export const getStoreTomorrowOpenRange = product => {
  return product.getIn(['miscInfo', 'storeTomorrowOpenRange']);
};

export const getStorePhoneNumber = product => {
  return product.getIn(['miscInfo', 'storePhoneNumber']);
};

export const getProductItemUpcNumber = product => {
  return product.getIn(['productInfo', 'upc']);
};

export const getGeneralProdId = product => {
  return product.getIn(['productInfo', 'generalProductId']);
};

export const getProductSkuId = product => {
  return product.getIn(['productInfo', 'skuId']);
};

export const getPdpUrl = product => {
  return product.getIn(['productInfo', 'pdpUrl']);
};

export const getProductItemId = product => {
  return product.getIn(['itemInfo', 'itemId']);
};

export const getListPrice = product => {
  return product.getIn(['itemInfo', 'listPrice']);
};

export const getOfferPrice = product => {
  return product.getIn(['itemInfo', 'offerPrice']);
};

export const getWasPrice = product => {
  return product.getIn(['itemInfo', 'wasPrice']);
};

export const getSalePrice = product => {
  return product.getIn(['itemInfo', 'salePrice']);
};

// export const getProductItemUnitOfferPrice = product => {
//   return product.getIn(['itemInfo', 'unitOfferPrice']);
// };

// export const getProductItemPrice = product => {
//   return product.getIn(['itemInfo', 'listPrice']);
// };

// export const getProductItemUnitPrice = product => {
//   return product.getIn(['itemInfo', 'listUnitPrice']);
// };

export const getIsCartItemsUpdating = state => {
  return state.CartPageReducer.getIn(['uiFlags', 'isCartItemsUpdating']);
};

export const getIsCartItemsSFL = state => {
  return state.CartPageReducer.getIn(['uiFlags', 'isItemMovedToSflList']);
};

export const getIsSflItemRemoved = state => {
  return state.CartPageReducer.getIn(['uiFlags', 'isSflItemDeleted']);
};

export const getCartItemsSflError = state => {
  return state.CartPageReducer.getIn(['uiFlags', 'cartItemSflError']);
};

export const getLabelsCartItemTile = state => {
  const saveForLaterLink = getLabelValue(state.Labels, 'lbl_sfl_actionLink', 'bagPage', 'checkout');
  const moveToBagLink = getLabelValue(state.Labels, 'lbl_sfl_moveToBag', 'bagPage', 'checkout');
  const sflMaxLimitError = getLabelValue(
    state.Labels,
    'lbl_sfl_maxLimitError',
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
  const itemDeleted = getLabelValue(
    state.Labels,
    'lbl_msg_itemDeleteSuccess',
    'bagPage',
    'checkout'
  );
  // const {
  //   bag: {
  //     bagOverview: { lbl_error_please: pleaseText, lbl_error_remove: remove },
  //   },
  // } = state.Labels;

  return {
    color: getLabelValue(state.Labels, 'lbl_info_color', 'addedToBagModal', 'global'),
    size: getLabelValue(state.Labels, 'lbl_info_size', 'addedToBagModal', 'global'),
    qty: getLabelValue(state.Labels, 'lbl_info_Qty', 'addedToBagModal', 'global'),
    price: getLabelValue(state.Labels, 'lbl_info_price', 'addedToBagModal', 'global'),
    design: getLabelValue(state.Labels, 'lbl_info_giftDesign', 'addedToBagModal', 'global'),
    value: getLabelValue(state.Labels, 'lbl_info_giftValue', 'addedToBagModal', 'global'),
    fit: getLabelValue(state.Labels, 'lbl_cartTile_fit', 'cartItemTile', 'global'),
    points: getLabelValue(state.Labels, 'lbl_cartTile_points', 'cartItemTile', 'global'),
    cancel: getLabelValue(state.Labels, 'lbl_cartTile_cancel', 'cartItemTile', 'global'),
    edit: getLabelValue(state.Labels, 'lbl_cartTile_edit', 'cartItemTile', 'global'),
    update: getLabelValue(state.Labels, 'lbl_cartTile_update', 'cartItemTile', 'global'),
    removeEdit: getLabelValue(state.Labels, 'lbl_cartTile_remove', 'cartItemTile', 'global'),
    saveForLater: getLabelValue(
      state.Labels,
      'lbl_cartTile_saveForLater',
      'cartItemTile',
      'global'
    ),
    productBandAlt: getLabelValue(
      state.Labels,
      'lbl_cartTile_productBrandAlt',
      'cartItemTile',
      'global'
    ),
    productImageAlt: getLabelValue(
      state.Labels,
      'lbl_cartTile_productImageAlt',
      'cartItemTile',
      'global'
    ),
    bopisLabel: getLabelValue(state.Labels, 'lbl_cartTile_bopis', 'cartItemTile', 'global'),
    bossLabel: getLabelValue(state.Labels, 'lbl_cartTile_boss', 'cartItemTile', 'global'),
    bossPickUp: getLabelValue(state.Labels, 'lbl_cartTile_noRushPickup', 'cartItemTile', 'global'),
    bopisPickUp: getLabelValue(state.Labels, 'lbl_cartTile_pickUpToday', 'cartItemTile', 'global'),
    ecomShipping: getLabelValue(state.Labels, 'lbl_cartTile_shipToHome', 'cartItemTile', 'global'),
    extra: getLabelValue(state.Labels, 'lbl_cartTile_extra', 'cartItemTile', 'global'),
    off: getLabelValue(state.Labels, 'lbl_cartTile_off', 'cartItemTile', 'global'),
    problemWithOrder: getLabelValue(state.Labels, 'lbl_cartTile_remove', 'cartItemTile', 'global'),
    // pleaseText,
    // remove,
    removeSoldOut: getLabelValue(state.Labels, 'lbl_miniBag_error', 'minibag', 'global'),
    itemUnavailable: getLabelValue(
      state.Labels,
      'lbl_miniBag_itemUnavailable',
      'minibag',
      'global'
    ),
    itemSoldOut: getLabelValue(state.Labels, 'lbl_miniBag_itemSoldOut', 'minibag', 'global'),
    chooseDiff: getLabelValue(state.Labels, 'lbl_miniBag_chooseDiff', 'minibag', 'global'),
    soldOut: getLabelValue(state.Labels, 'lbl_miniBag_soldOut', 'minibag', 'global'),
    errorSize: getLabelValue(state.Labels, 'lbl_minibag_errorSize', 'minibag', 'global'),
    updateUnavailable: getLabelValue(
      state.Labels,
      'lbl_minibag_errorUpdateUnavailable',
      'minibag',
      'global'
    ),
    removeSoldoutHeader: getLabelValue(
      state.Labels,
      'lbl_minibag_errorRemoveSoldoutHeader',
      'minibag',
      'global'
    ),
    deleteItem: getLabelValue(state.Labels, 'lbl_cartTile_delete', 'cartItemTile', 'global'),
    saveForLaterLink,
    sflMaxLimitError,
    moveToBagLink,
    itemDeleted,
    sflSuccess,
    today: getLabelValue(state.Labels, 'lbl_cartTile_today', 'cartItemTile', 'global'),
    tomorrow: getLabelValue(state.Labels, 'lbl_cartTile_tomorrow', 'cartItemTile', 'global'),
    phone: getLabelValue(state.Labels, 'lbl_cartTile_phone', 'cartItemTile', 'global'),
    pickup: getLabelValue(state.Labels, 'lbl_cartTile_pickup', 'cartItemTile', 'global'),
    at: getLabelValue(state.Labels, 'lbl_cartTile_pickup', 'cartItemTile', 'global'),
    by: getLabelValue(state.Labels, 'lbl_cartTile_at', 'cartItemTile', 'global'),
    shipping: getLabelValue(state.Labels, 'lbl_cartTile_shipping', 'cartItemTile', 'global'),
    sflDeleteSuccess,
    removeError: getLabelValue(state.Labels, 'lbl_minibag_errorRemove', 'minibag', 'global'),
    itemUpdated: getLabelValue(state.Labels, 'lbl_minibag_itemUpdated', 'minibag', 'global'),
    bossUnavailable: getLabelValue(
      state.Labels,
      'lbl_cartTile_bossUnavailable',
      'cartItemTile',
      'global'
    ),
    bossReqQtyUnavailable: getLabelValue(
      state.Labels,
      'lbl_cartTile_bossReqQtyUnavailable',
      'cartItemTile',
      'global'
    ),
    bopisUnavailable: getLabelValue(
      state.Labels,
      'lbl_cartTile_bopisUnavailable',
      'cartItemTile',
      'global'
    ),
    ecomUnavailable: getLabelValue(
      state.Labels,
      'lbl_cartTile_ecomUnavailable',
      'cartItemTile',
      'global'
    ),
    notAvailableOnlineOnly: getLabelValue(
      state.Labels,
      'lbl_cartTile_notAvailableOnlineOnly',
      'cartItemTile',
      'global'
    ),
    notAvailableClearanceItem: getLabelValue(
      state.Labels,
      'lbl_cartTile_notAvailableClearanceItem',
      'cartItemTile',
      'global'
    ),
    soldOutError: getLabelValue(state.Labels, 'lbl_cartTile_soldOut', 'cartItemTile', 'global'),
    bossInEligible: getLabelValue(
      state.Labels,
      'lbl_cartTile_bossInEligible',
      'cartItemTile',
      'global'
    ),
    changeStore: getLabelValue(state.Labels, 'lbl_cartTile_changeStore', 'cartItemTile', 'global'),
  };
};

function getCurrentCurrency(state) {
  return state.session.siteDetails.currency;
}

function getCurrenciesMap(state) {
  return state.session.siteOptions.currenciesMap;
}

export function getCurrencyExchange(state) {
  const selectedCurrency = getCurrentCurrency(state);
  return getCurrenciesMap(state).filter(currency => currency.id === selectedCurrency);
}

export const getProductDetails = tile => {
  return {
    itemInfo: {
      name: getProductName(tile),
      isGiftItem: checkForGiftItem(tile),
      fit: getProductFit(tile),
      color: getProductColor(tile),
      size: getProductSize(tile),
      price: getProductOfferPrice(tile),
      qty: getProductQty(tile),
      myPlacePoints: getProductPoints(tile),
      itemBrand: getProductBrand(tile),
      imagePath: getProductImage(tile),
      itemId: getOrderItemId(tile),
      listPrice: getListPrice(tile),
      offerPrice: getOfferPrice(tile),
      wasPrice: getWasPrice(tile),
      salePrice: getSalePrice(tile),

      // itemPrice: getProductItemPrice(tile),
      // unitOfferPrice: getProductItemUnitOfferPrice(tile),
      // itemUnitPrice: getProductItemUnitPrice(tile),
    },
    productInfo: {
      productPartNumber: getProductPartNumber(tile),
      itemPartNumber: getProductItemPartNumber(tile),
      variantNo: getVariantNumber(tile),
      upc: getProductItemUpcNumber(tile),
      generalProductId: getGeneralProdId(tile),
      skuId: getProductSkuId(tile),
      pdpUrl: getPdpUrl(tile),
    },
    miscInfo: {
      badge: getProductBadge(tile),
      store: getProductStore(tile),
      storeAddress: getProductStoreAddress(tile),
      orderItemType: getProductOrderItemType(tile),
      bossStartDate: getBossStartDate(tile),
      bossEndDate: getBossEndDate(tile),
      availability: getProductAvailability(tile),
      isBossEligible: getIsBossEligible(tile),
      isBopisEligible: getIsBopisEligible(tile),
      isOnlineOnly: getIsOnlineOnly(tile),
      clearanceItem: getClearanceItem(tile),
      isInventoryAvailBOSS: getIsInventoryAvailBOSS(tile),
      isStoreBOSSEligible: getIsStoreBOSSEligible(tile),
      storeTodayOpenRange: getStoreTodayOpenRange(tile),
      storeTomorrowOpenRange: getStoreTomorrowOpenRange(tile),
      storePhoneNumber: getStorePhoneNumber(tile),
    },
  };
};

export const getBossBopisFlags = state => {
  return {
    isBOSSEnabled_TCP: state.session.siteDetails.isBOSSEnabled_TCP,
    isBOPISEnabled_TCP: state.session.siteDetails.isBOPISEnabled_TCP,
    isBOPISEnabled_GYM: state.session.siteDetails.isBOPISEnabled_GYM,
    isBOSSEnabled_GYM: state.session.siteDetails.isBOSSEnabled_GYM,
  };
};

export const isItemBossBopisInEligible = (state, { itemBrand, orderItemType } = {}) => {
  const bossBopisFlags = getBossBopisFlags(state);
  const flagName = `is${orderItemType}Enabled_${itemBrand}`;
  return (
    (orderItemType === CARTPAGE_CONSTANTS.BOSS || orderItemType === CARTPAGE_CONSTANTS.BOPIS) &&
    !bossBopisFlags[flagName]
  );
};

export const getCartToggleError = state => {
  return state.CartItemTileReducer.get('toggleError');
};

export const getCartBossBopisToggleError = state => {
  return state.CartItemTileReducer.get('toggleBossBopisError');
};

export const getIsDeleteConfirmationModalEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].siteDetails.IS_DELETE_CONFIRMATION_MODAL_ENABLED === 'TRUE'
  );
};
