import { put, takeLatest } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../../utils/cache.util';
import {
  getOrderDetailSaga,
  CartPageSaga,
  removeCartItem,
  updateCartItemSaga,
  getProductSKUInfoSaga,
} from '../container/CartItemTile.saga';
import { getOrderDetailsComplete } from '../container/CartItemTile.actions';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

describe('Cart Item saga', () => {
  it('should dispatch getOrderDetailsComplete action for success resposnse', () => {
    const getOrderDetailSagaGen = getOrderDetailSaga();
    getOrderDetailSagaGen.next();

    const res = {
      productInfo: {},
      itemInfo: {},
      miscInfo: {},
    };
    const putDescriptor = getOrderDetailSagaGen.next(res).value;
    expect(putDescriptor).toEqual(put(getOrderDetailsComplete(res)));
  });
});

describe('ForgotPasswordSaga', () => {
  it('should return correct takeLatest effect', () => {
    const generator = CartPageSaga();
    let takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga)
    );

    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.REMOVE_CART_ITEM, removeCartItem)
    );

    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.REMOVE_CART_ITEM_COMPLETE, getOrderDetailSaga)
    );

    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.UPDATE_CART_ITEM, updateCartItemSaga)
    );

    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.UPDATE_CART_ITEM_COMPLETE, getOrderDetailSaga)
    );
    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO, getProductSKUInfoSaga)
    );

    // yield takeLatest(CARTPAGE_CONSTANTS.UPDATE_CART_ITEM, updateCartItemSaga);
    // yield takeLatest(CARTPAGE_CONSTANTS.UPDATE_CART_ITEM_COMPLETE, getOrderDetailSaga);
    // yield takeLatest(CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO, getProductSKUInfoSaga);
  });
});
