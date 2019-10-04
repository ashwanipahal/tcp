import { getLabelValue } from '@tcp/core/src/utils';
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

export const getProductItemUpcNumber = product => {
  return product.getIn(['productInfo', 'upc']);
};

export const getGeneralProdId = product => {
  return product.getIn(['productInfo', 'generalProductId']);
};

export const getProductSkuId = product => {
  return product.getIn(['productInfo', 'skuId']);
};

export const getProductItemPrice = product => {
  return product.getIn(['itemInfo', 'listPrice']);
};

export const getProductItemId = product => {
  return product.getIn(['itemInfo', 'itemId']);
};

export const getProductItemUnitOfferPrice = product => {
  return product.getIn(['itemInfo', 'unitOfferPrice']);
};

export const getProductItemUnitPrice = product => {
  return product.getIn(['itemInfo', 'listUnitPrice']);
};

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
  const {
    global: {
      addedToBagModal: {
        lbl_info_color: color,
        lbl_info_size: size,
        lbl_info_Qty: qty,
        lbl_info_price: price,
        lbl_info_giftDesign: design,
        lbl_info_giftValue: value,
      },
      cartItemTile: {
        lbl_cartTile_fit: fit,
        lbl_cartTile_points: points,
        lbl_cartTile_cancel: cancel,
        lbl_cartTile_edit: edit,
        lbl_cartTile_update: update,
        lbl_cartTile_remove: removeEdit,
        lbl_cartTile_saveForLater: saveForLater,
        lbl_cartTile_productBrandAlt: productBandAlt,
        lbl_cartTile_productImageAlt: productImageAlt,
        lbl_cartTile_bopis: bopisLabel,
        lbl_cartTile_boss: bossLabel,
        lbl_cartTile_noRushPickup: bossPickUp,
        lbl_cartTile_pickUpToday: bopisPickUp,
        lbl_cartTile_shipToHome: ecomShipping,
        lbl_cartTile_extra: extra,
        lbl_cartTile_off: off,
        lbl_cartTile_delete: deleteItem,
        lbl_cartTile_today: today,
        lbl_cartTile_tomorrow: tomorrow,
        lbl_cartTile_phone: phone,
        lbl_cartTile_pickup: pickup,
        lbl_cartTile_at: at,
        lbl_cartTile_shipping: shipping,
      },
      minibag: {
        lbl_miniBag_problemWithOrder: problemWithOrder,
        lbl_miniBag_error: removeSoldOut,
        lbl_miniBag_itemUnavailable: itemUnavailable,
        lbl_miniBag_itemSoldOut: itemSoldOut,
        lbl_miniBag_chooseDiff: chooseDiff,
        lbl_miniBag_soldOut: soldOut,
        lbl_minibag_errorSize: errorSize,
        lbl_minibag_errorUpdateUnavailable: updateUnavailable,
        lbl_minibag_errorRemoveSoldoutHeader: removeSoldoutHeader,
      },
    },
  } = state.Labels;

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
    color,
    size,
    qty,
    price,
    design,
    value,
    fit,
    points,
    cancel,
    edit,
    update,
    removeEdit,
    saveForLater,
    productBandAlt,
    productImageAlt,
    bopisLabel,
    bossLabel,
    bossPickUp,
    bopisPickUp,
    ecomShipping,
    extra,
    off,
    problemWithOrder,
    // pleaseText,
    // remove,
    removeSoldOut,
    itemUnavailable,
    itemSoldOut,
    chooseDiff,
    soldOut,
    errorSize,
    updateUnavailable,
    removeSoldoutHeader,
    deleteItem,
    saveForLaterLink,
    sflMaxLimitError,
    moveToBagLink,
    itemDeleted,
    sflSuccess,
    today,
    tomorrow,
    phone,
    pickup,
    at,
    by: getLabelValue(state.Labels, 'lbl_cartTile_by', 'cartItemTile', 'global'),
    shipping,
    sflDeleteSuccess,
    removeError: getLabelValue(state.Labels, 'lbl_minibag_errorRemove', 'minibag', 'global'),
  };
};

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
      itemPrice: getProductItemPrice(tile),
      unitOfferPrice: getProductItemUnitOfferPrice(tile),
      itemUnitPrice: getProductItemUnitPrice(tile),
    },
    productInfo: {
      productPartNumber: getProductPartNumber(tile),
      itemPartNumber: getProductItemPartNumber(tile),
      variantNo: getVariantNumber(tile),
      upc: getProductItemUpcNumber(tile),
      generalProductId: getGeneralProdId(tile),
      skuId: getProductSkuId(tile),
    },
    miscInfo: {
      badge: getProductBadge(tile),
      store: getProductStore(tile),
      orderItemType: getProductOrderItemType(tile),
      bossStartDate: getBossStartDate(tile),
      bossEndDate: getBossEndDate(tile),
      availability: getProductAvailability(tile),
    },
  };
};

export const getBossBopisFlags = state => {
  return {
    isBOSSEnabled_TCP: state.session.getIn(['siteDetails', 'isBOSSEnabled_TCP']),
    isBOPISEnabled_TCP: state.session.getIn(['siteDetails', 'isBOPISEnabled_TCP']),
    isBOPISEnabled_GYM: state.session.getIn(['siteDetails', 'isBOPISEnabled_GYM']),
    isBOSSEnabled_GYM: state.session.getIn(['siteDetails', 'isBOSSEnabled_GYM']),
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
