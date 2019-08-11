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

export const getLabelsCartItemTile = state => {
  const {
    bag: {
      addedToBag: {
        lbl_info_color: color,
        lbl_info_size: size,
        lbl_info_Qty: qty,
        lbl_info_price: price,
        lbl_info_giftDesign: design,
      },
    },
  } = state.Labels;

  const {
    bag: {
      bagOverview: {
        lbl_cartTile_fit: fit,
        lbl_cartTile_points: points,
        lbl_cartTile_cancel: cancel,
        lbl_cartTile_edit: edit,
        lbl_cartTile_saveForLater: saveForLater,
        lbl_cartTile_productBrandAlt: productBandAlt,
        lbl_cartTile_productImageAlt: productImageAlt,
        lbl_cartTile_bopis: bopisLabel,
        lbl_cartTile_boss: bossLabel,
      },
    },
  } = state.Labels;

  return {
    color,
    size,
    qty,
    price,
    design,
    fit,
    points,
    cancel,
    edit,
    saveForLater,
    productBandAlt,
    productImageAlt,
    bopisLabel,
    bossLabel,
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
    },
    productInfo: {
      productPartNumber: getProductPartNumber(tile),
      itemPartNumber: getProductItemPartNumber(tile),
      variantNo: getVariantNumber(tile),
    },
    miscInfo: {
      badge: getProductBadge(tile),
      store: getProductStore(tile),
      orderItemType: getProductOrderItemType(tile),
      bossStartDate: getBossStartDate(tile),
      bossEndDate: getBossEndDate(tile),
    },
  };
};
