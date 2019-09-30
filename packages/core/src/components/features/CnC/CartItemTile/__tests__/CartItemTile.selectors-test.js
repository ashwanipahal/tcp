import { fromJS } from 'immutable';
import {
  getProductName,
  getProductColor,
  getProductBrand,
  getProductFit,
  getProductPoints,
  getProductQty,
  getProductOfferPrice,
  checkForGiftItem,
  getLabelsCartItemTile,
  getProductSize,
  getGeneralProdId,
  getIsCartItemsUpdating,
  getProductSkuId,
} from '../container/CartItemTile.selectors';

describe('#CartItemTile selector', () => {
  it('#getProductName should return product name', () => {
    const productState = fromJS({
      productInfo: {
        name: '',
      },
    });
    expect(getProductName(productState)).toEqual(productState.getIn(['productInfo', 'name']));
  });

  it('#getProductColor should return product color', () => {
    const productState = fromJS({
      productInfo: {
        color: {
          name: 'red',
        },
      },
    });
    expect(getProductColor(productState)).toEqual(
      productState.getIn(['productInfo', 'color', 'name'])
    );
  });

  it('#getGeneralProdId should return product gen id', () => {
    const productState = fromJS({
      productInfo: {
        color: {
          name: 'red',
        },
        generalProductId: '1234',
      },
    });
    expect(getGeneralProdId(productState)).toEqual(
      productState.getIn(['productInfo', 'generalProductId'])
    );
  });

  it('#getProductSkuId should return product sku id', () => {
    const productState = fromJS({
      productInfo: {
        color: {
          name: 'red',
        },
        skuId: '1234',
      },
    });
    expect(getProductSkuId(productState)).toEqual(productState.getIn(['productInfo', 'skuId']));
  });

  it('#getProductFit should return product fit', () => {
    const productState = fromJS({
      productInfo: {
        fit: 'regular',
      },
    });
    expect(getProductFit(productState)).toEqual(productState.getIn(['productInfo', 'fit']));
  });
  it('#getProductSize should return product size', () => {
    const productState = fromJS({
      productInfo: {
        size: '4',
      },
    });
    expect(getProductSize(productState)).toEqual(productState.getIn(['productInfo', 'size']));
  });

  it('#getProductOfferPrice should return product price', () => {
    const productState = fromJS({
      itemInfo: {
        offerPrice: 20,
      },
    });
    expect(getProductOfferPrice(productState)).toEqual(
      productState.getIn(['itemInfo', 'offerPrice'])
    );
  });

  it('#getProductBrand should return product brand', () => {
    const productState = fromJS({
      productInfo: {
        itemBrand: 'TCP',
      },
    });
    expect(getProductBrand(productState)).toEqual(productState.getIn(['productInfo', 'itemBrand']));
  });

  it('#getProductPoints should return product points', () => {
    const productState = fromJS({
      itemInfo: {
        itemPoints: 120,
      },
    });
    expect(getProductPoints(productState)).toEqual(productState.getIn(['itemInfo', 'itemPoints']));
  });

  it('#getProductQty should return product qty', () => {
    const productState = fromJS({
      itemInfo: {
        quantity: 12,
      },
    });
    expect(getProductQty(productState)).toEqual(productState.getIn(['itemInfo', 'quantity']));
  });

  it('#checkForGiftItem should return boolean', () => {
    const productState = fromJS({
      productInfo: {
        isGiftCard: true,
      },
    });
    expect(checkForGiftItem(productState)).toEqual(
      productState.getIn(['productInfo', 'isGiftCard'])
    );
  });

  it('#getIsCartItemsUpdating', () => {
    const CartPageReducer = fromJS({
      uiFlags: {
        isCartItemsUpdating: true,
      },
    });
    expect(getIsCartItemsUpdating({ CartPageReducer })).toEqual(true);
  });

  it('#getLabelsCartItemTile should return labels', () => {
    const addedToBagModal = {
      lbl_info_color: 'Color',
      lbl_info_size: 'Size',
      lbl_info_Qty: 'Qty',
      lbl_info_price: 'Price',
      lbl_info_giftDesign: 'Design',
      lbl_info_giftValue: 'Value',
    };
    const productState = {
      Labels: {
        global: {
          addedToBagModal,
          cartItemTile: {
            lbl_cartTile_fit: 'Fit',
            lbl_cartTile_points: 'Points',
            lbl_cartTile_cancel: 'Cancel',
            lbl_cartTile_edit: 'Edit',
            lbl_cartTile_saveForLater: 'Save For Later',
            lbl_cartTile_productBrandAlt: 'Brand',
            lbl_cartTile_productImageAlt: 'Product',
            lbl_cartTile_update: 'update',
            lbl_cartTile_remove: 'removeEdit',
            lbl_cartTile_bopis: 'bopis',
            lbl_cartTile_boss: 'boss',
            lbl_cartTile_noRushPickup: 'boss',
            lbl_cartTile_pickUpToday: 'pickup',
            lbl_cartTile_shipToHome: 'ecom',
            lbl_cartTile_extra: 'extra',
            lbl_cartTile_off: 'off',
            lbl_cartTile_delete: 'delete',
          },
          minibag: {
            lbl_miniBag_problemWithOrder: 'minibag',
            lbl_miniBag_error: 'minibag',
            lbl_miniBag_itemUnavailable: 'minibag',
            lbl_miniBag_itemSoldOut: 'minibag',
            lbl_miniBag_chooseDiff: 'minibag',
            lbl_miniBag_soldOut: 'minibag',
            lbl_minibag_errorSize: 'minibag',
            lbl_minibag_errorUpdateUnavailable: 'minibag',
            lbl_minibag_errorRemoveSoldoutHeader: 'minibag',
            lbl_minibag_errorRemove: 'remove',
          },
        },
        checkout: {
          bagPage: {
            lbl_sfl_actionLink: 'saveForLaterLink',
            lbl_sfl_maxLimitError: 'sflMaxLimitError',
            lbl_sfl_moveToBag: 'moveToBagLink',
            bl_sfl_actionSuccess: 'sflSuccess',
            lbl_sfl_itemDeleteSuccess: 'sflDeleteSuccess',
          },
        },
      },
    };
    expect(getLabelsCartItemTile(productState)).toEqual({
      at: undefined,
      bopisLabel: 'bopis',
      bopisPickUp: 'pickup',
      bossLabel: 'boss',
      bossPickUp: 'boss',
      by: 'lbl_cartTile_by',
      cancel: 'Cancel',
      chooseDiff: 'minibag',
      color: 'Color',
      deleteItem: 'delete',
      design: 'Design',
      ecomShipping: 'ecom',
      edit: 'Edit',
      errorSize: 'minibag',
      extra: 'extra',
      fit: 'Fit',
      itemDeleted: 'lbl_msg_itemDeleteSuccess',
      itemSoldOut: 'minibag',
      itemUnavailable: 'minibag',
      moveToBagLink: 'moveToBagLink',
      off: 'off',
      phone: undefined,
      pickup: undefined,
      points: 'Points',
      price: 'Price',
      problemWithOrder: 'minibag',
      productBandAlt: 'Brand',
      productImageAlt: 'Product',
      qty: 'Qty',
      removeEdit: 'removeEdit',
      removeError: 'remove',
      removeSoldOut: 'minibag',
      removeSoldoutHeader: 'minibag',
      saveForLater: 'Save For Later',
      saveForLaterLink: 'saveForLaterLink',
      sflDeleteSuccess: 'sflDeleteSuccess',
      sflMaxLimitError: 'sflMaxLimitError',
      sflSuccess: 'sflSuccess',
      shipping: undefined,
      size: 'Size',
      soldOut: 'minibag',
      today: undefined,
      tomorrow: undefined,
      update: 'update',
      updateUnavailable: 'minibag',
      value: 'Value',
    });
  });
});
