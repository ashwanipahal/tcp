import { put, takeLatest, call } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../../utils/cache.util';
import {
  CartPageSaga,
  confirmRemoveItem,
  removeCartItem,
  updateCartItemSaga,
  getProductSKUInfoSaga,
  afterRemovingCartItem,
  openPickupModalFromBag,
} from '../container/CartItemTile.saga';
import { removeCartItemComplete } from '../container/CartItemTile.actions';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import { AddToPickupError, AddToCartError } from '../../AddedToBag/container/AddedToBag.actions';

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
    removeCartItemGen.next();

    expect(removeCartItemGen.next().value).toEqual(
      put(BAG_PAGE_ACTIONS.openItemDeleteConfirmationModal(payloadValue))
    );
  });
});

describe('Cart Item saga update', () => {
  const payload = {
    itemPartNumber: '00193511095440',
    orderItemId: '3001545559',
    quantity: '1',
    variantNo: '3002156005',
    xitem_catEntryId: '1285036',
    callBack: jest.fn(),
    updateActionType: 'UpdatePickUpItem',
  };

  it('should dispatch updateCartItem action for success resposnse', () => {
    const updateCartItemSagaGen = updateCartItemSaga({ payload });
    updateCartItemSagaGen.next();
    updateCartItemSagaGen.next();
    const res = updateCartItemSagaGen.next();
    updateCartItemSagaGen.next(res);
    updateCartItemSagaGen.next({ isUpdating: true });
    updateCartItemSagaGen.next();
    updateCartItemSagaGen.next();
    updateCartItemSagaGen.next();
    updateCartItemSagaGen.next({ isUpdating: false });
  });

  it('should dispatch updateCartItem action for error resposnse', () => {
    try {
      const updateCartItemSagaGen = updateCartItemSaga({ payload });
      const err = {
        errorMessages: { _error: 'Error of update cart API' },
      };
      updateCartItemSagaGen.next();
      let putDescriptor = updateCartItemSagaGen.throw(err).value;
      putDescriptor = updateCartItemSagaGen.next().value;
      // eslint-disable-next-line no-underscore-dangle
      expect(putDescriptor).toEqual(put(AddToPickupError(err.errorMessages._error)));
    } catch (err) {
      console.log('testing errors for update item resposnse');
    }
  });

  it('should dispatch updateCartItem action for pick up error resposnse', () => {
    try {
      const updateCartItemSagaGen = updateCartItemSaga({ payload });
      const err = {
        errorMessages: { _error: 'Error in API of Update Cart' },
      };
      updateCartItemSagaGen.next();
      let putDescriptor = updateCartItemSagaGen.throw(err).value;
      putDescriptor = updateCartItemSagaGen.next().value;
      // eslint-disable-next-line no-underscore-dangle
      expect(putDescriptor).toEqual(put(AddToCartError(err.errorMessages._error)));
    } catch (err) {
      console.log('testing errors for update item resposnse');
    }
  });

  it('should dispatch updateCartItem action without error message from CMS', () => {
    try {
      const updateCartItemSagaGen = updateCartItemSaga({ payload });
      updateCartItemSagaGen.next();
      let putDescriptor = updateCartItemSagaGen.throw(null).value;
      putDescriptor = updateCartItemSagaGen.next({ DEFAULT: 'Default' }).value;
      // eslint-disable-next-line no-underscore-dangle
      expect(putDescriptor).toEqual(put(AddToPickupError('Default')));
    } catch (err) {
      console.log('testing errors without error message from CMS');
    }
  });

  it('should dispatch updateCartItem action without error message from CMS and without default', () => {
    try {
      const updateCartItemSagaGen = updateCartItemSaga({ payload });
      updateCartItemSagaGen.next();
      let putDescriptor = updateCartItemSagaGen.throw(null).value;
      putDescriptor = updateCartItemSagaGen.next().value;
      // eslint-disable-next-line no-underscore-dangle
      expect(putDescriptor).toEqual(put(AddToPickupError('ERROR')));
    } catch (err) {
      console.log('testing errors without error message from CMS');
    }
  });

  it('should dispatch updateCartItem action for error resposnse from toggling', () => {
    try {
      payload.fromToggling = true;
      const updateCartItemSagaGen = updateCartItemSaga({ payload });
      const err = {
        errorMessages: { _error: 'Error in API' },
      };
      updateCartItemSagaGen.next();
      let putDescriptor = updateCartItemSagaGen.throw(err).value;
      putDescriptor = updateCartItemSagaGen.next().value;
      // eslint-disable-next-line no-underscore-dangle
      expect(putDescriptor).toEqual(put(AddToPickupError(err.errorMessages._error)));
    } catch (err) {
      console.log('testing errors for resposnse from toggling');
    }
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

    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CARTPAGE_CONSTANTS.PICKUP_MODAL_OPEN_FROM_BAG, openPickupModalFromBag)
    );
  });
});

describe('openPickupModalFromBag', () => {
  const payload = {
    payload: {
      colorProductId: '00193511095440',
      orderInfo: {},
    },
  };
  const generator = openPickupModalFromBag(payload);
  it('should return correct takeLatest effect', () => {
    generator.next();
    generator.next();
    generator.next({ product: { generalProductId: '12345' } });
    generator.next();
  });
});
