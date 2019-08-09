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

  it('#getLabelsCartItemTile should return labels', () => {
    const addedToBag = {
      lbl_info_color: 'Color',
      lbl_info_size: 'Size',
      lbl_info_Qty: 'Qty',
      lbl_info_price: 'Price',
      lbl_info_giftDesign: 'Design',
    };
    const productState = {
      Labels: {
        bag: {
          addedToBag,
          bagOverview: {
            lbl_cartTile_fit: 'Fit',
            lbl_cartTile_points: 'Points',
            lbl_cartTile_cancel: 'Cancel',
            lbl_cartTile_edit: 'Edit',
            lbl_cartTile_saveForLater: 'Save For Later',
            lbl_cartTile_productBrandAlt: 'Brand',
            lbl_cartTile_productImageAlt: 'Product',
          },
        },
      },
    };
    expect(getLabelsCartItemTile(productState)).toEqual({
      color: 'Color',
      design: 'Design',
      price: 'Price',
      qty: 'Qty',
      size: 'Size',
      fit: 'Fit',
      points: 'Points',
      cancel: 'Cancel',
      edit: 'Edit',
      saveForLater: 'Save For Later',
      productBandAlt: 'Brand',
      productImageAlt: 'Product',
    });
  });
});
