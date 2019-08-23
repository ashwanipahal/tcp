import { put, takeLatest, select, call } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../../utils/cache.util';
import {
  getOrderDetailSaga,
  BagPageSaga,
  getCartDataSaga,
  fetchModuleX,
  startCartCheckout,
  removeUnqualifiedItemsAndCheckout,
  checkoutCart,
} from '../container/BagPage.saga';
import BAG_PAGE_ACTIONS from '../container/BagPage.actions';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import BAG_SELECTORS from '../container/BagPage.selectors';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';

// import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';

describe('Cart Item saga', () => {
  it('should dispatch getOrderDetailSaga action for success resposnse', () => {
    const getOrderDetailSagaGen = getOrderDetailSaga();
    getOrderDetailSagaGen.next();

    const res = {
      orderDetails: {
        productInfo: {},
        itemInfo: {},
        miscInfo: {},
      },
    };
    const putDescriptor = getOrderDetailSagaGen.next(res).value;
    expect(putDescriptor).toEqual(put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails)));
  });

  it('should dispatch getCartDataSaga action for success resposnse', () => {
    const getCartDataSagaGen = getCartDataSaga();
    getCartDataSagaGen.next();

    const res = {
      orderDetails: {
        productInfo: {},
        itemInfo: {},
        miscInfo: {},
      },
      coupons: {},
    };
    let putDescriptor = getCartDataSagaGen.next(res).value;
    expect(putDescriptor).toEqual(put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails)));
    putDescriptor = getCartDataSagaGen.next(res).value;
    expect(putDescriptor).toEqual(put(BAG_PAGE_ACTIONS.setCouponsData(res.coupons)));
  });
});

describe('Bag page Saga', () => {
  it('should return correct takeLatest', () => {
    const generator = BagPageSaga();

    let takeLatestDescriptor;
    function expectValue(action, value) {
      takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(action, value));
    }

    expectValue(BAGPAGE_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
    expectValue(BAGPAGE_CONSTANTS.GET_CART_DATA, getCartDataSaga);

    expectValue(BAGPAGE_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);

    expectValue(BAGPAGE_CONSTANTS.START_BAG_CHECKOUT, startCartCheckout);

    expectValue(
      BAGPAGE_CONSTANTS.REMOVE_UNQUALIFIED_AND_CHECKOUT,
      removeUnqualifiedItemsAndCheckout
    );
  });
});

describe('Bag page Saga', () => {
  it('BagPageSaga', () => {
    const generator = BagPageSaga();

    let takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(BAGPAGE_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga)
    );

    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(BAGPAGE_CONSTANTS.GET_CART_DATA, getCartDataSaga)
    );
  });
});

describe('removeUnqualifiedItemsAndCheckout Saga', () => {
  it('removeUnqualifiedItemsAndCheckout effect', () => {
    const generator = removeUnqualifiedItemsAndCheckout();

    let takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(select(BAG_SELECTORS.getUnqualifiedItemsIds));

    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(call(checkoutCart, true));
  });
});

describe('startCartCheckout Saga', () => {
  it('startCartCheckout effect', () => {
    const generator = startCartCheckout();

    let takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next(false).value;
    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(call(checkoutCart));
  });
});

describe('fetchModuleX Saga', () => {
  it('check fetchModuleX', () => {
    const generator = fetchModuleX({ payload: ['123'] });

    let takeLatestDescriptor = generator.next([{}]).value;
    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(null);
  });
});

describe('checkoutCart Saga', () => {
  it('check checkoutCart', () => {
    const generator = checkoutCart();

    let takeLatestDescriptor = generator.next(true).value;
    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(put(setCheckoutModalMountedState({ state: true })));
  });
});
