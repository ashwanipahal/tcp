import { put, takeLatest } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../../utils/cache.util';
import {
  CartPageSaga,
  removeCartItem,
  updateCartItemSaga,
  getProductSKUInfoSaga,
} from '../container/CartItemTile.saga';
import { updateCartItemComplete } from '../container/CartItemTile.actions';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

describe('Cart Item saga update', () => {
  it('should dispatch updateCartItem action for success resposnse', () => {
    const payload = [
      {
        itemPartNumber: '00193511095440',
        orderItemId: '3001545559',
        quantity: '1',
        variantNo: '3002156005',
        xitem_catEntryId: '1285036',
      },
    ];
    const updateCartItemSagaGen = updateCartItemSaga(payload);
    updateCartItemSagaGen.next();

    const res = {
      orderId: '3000284778',
      orderItem: [{ orderItemId: '3001545559' }],
      x_orderItemTotal: '10.50000',
      x_orderTotal: '49.35000',
    };
    const putDescriptor = updateCartItemSagaGen.next(res).value;
    expect(putDescriptor).toEqual(put(updateCartItemComplete(res)));
  });
});

describe('ForgotPasswordSaga', () => {
  it('should return correct takeLatest effect', () => {
    const generator = CartPageSaga();
    let takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.REMOVE_CART_ITEM, removeCartItem)
    );

    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.UPDATE_CART_ITEM, updateCartItemSaga)
    );

    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO, getProductSKUInfoSaga)
    );
  });
});
