import { put, takeLatest, call } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../../utils/cache.util';
import {
  CartPageSaga,
  confirmRemoveItem,
  removeCartItem,
  updateCartItemSaga,
  getProductSKUInfoSaga,
  afterRemovingCartItem,
} from '../container/CartItemTile.saga';
import { removeCartItemComplete, updateCartItemComplete } from '../container/CartItemTile.actions';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';

describe('Cart Item saga remove', () => {
  it('should dispatch confirmRemoveItem action for success resposnse', () => {
    const payload = {
      payload: {
        itemId: '3001545548',
      },
    };
    const removeCartItemGen = confirmRemoveItem(payload);
    removeCartItemGen.next();

    const res = {
      orderId: '3000284778',
      x_orderTotal: '49.35000',
    };
    const putDescriptor = removeCartItemGen.next(res).value;
    expect(putDescriptor).toEqual(put(removeCartItemComplete(res)));
  });
});

it('should dispatch afterRemovingCartItem action for success resposnse', () => {
  const removeCartItemGen = afterRemovingCartItem();
  removeCartItemGen.next();
  removeCartItemGen.next();

  const putDescriptor = removeCartItemGen.next().value;
  expect(putDescriptor).toEqual(put(BAG_PAGE_ACTIONS.setCartItemsUpdating({ isDeleting: false })));
});

describe('Cart Item saga remove', () => {
  it('should dispatch removeCartItem action for success resposnse', () => {
    const payload = {
      payload: {
        itemId: '3001545548',
      },
    };
    const removeCartItemGen = removeCartItem(payload);
    expect(removeCartItemGen.next().value).toEqual(
      call(confirmRemoveItem, { payload: '3001545548' })
    );
  });

  it('should dispatch removeCartItem action for bagPage', () => {
    const payloadValue = {
      itemId: '3001545548',
      pageView: 'myBag',
    };
    const payload = {
      payload: payloadValue,
    };
    const removeCartItemGen = removeCartItem(payload);
    removeCartItemGen.next();

    expect(removeCartItemGen.next().value).toEqual(
      put(BAG_PAGE_ACTIONS.openItemDeleteConfirmationModal(payloadValue))
    );
  });
});

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
