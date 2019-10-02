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
  startPaypalCheckout,
  authorizePayPalPayment,
  routeForCartCheckout,
  addItemToSFL,
  getSflDataSaga,
  startSflItemDelete,
} from '../container/BagPage.saga';
import BAG_PAGE_ACTIONS from '../container/BagPage.actions';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import BAG_SELECTORS from '../container/BagPage.selectors';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';

// import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';

describe('Cart Item saga', () => {
  it('should dispatch getOrderDetailSaga action for success resposnse', () => {
    const afterFunc = () => {};
    const getOrderDetailSagaGen = getOrderDetailSaga({ payload: { after: afterFunc } });
    getOrderDetailSagaGen.next();

    const res = {
      orderDetails: {
        productInfo: {},
        itemInfo: {},
        miscInfo: {},
        orderItems: [],
      },
    };
    getOrderDetailSagaGen.next(res);
    expect(getOrderDetailSagaGen.next(res).value).toEqual(
      put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails))
    );
    expect(getOrderDetailSagaGen.next().value).toEqual(call(afterFunc));
  });

  it('should dispatch getCartDataSaga action for success resposnse', () => {
    const getCartDataSagaGen = getCartDataSaga({ payload: {} });
    getCartDataSagaGen.next();

    const res = {
      orderDetails: {
        productInfo: {},
        itemInfo: {},
        miscInfo: {},
        orderItems: [],
      },
      coupons: {},
    };
    getCartDataSagaGen.next(res);
    expect(getCartDataSagaGen.next(res).value).toEqual(
      put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails))
    );
    const putDescriptor = getCartDataSagaGen.next(res).value;
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

    expectValue(
      BAGPAGE_CONSTANTS.REMOVE_UNQUALIFIED_AND_CHECKOUT,
      removeUnqualifiedItemsAndCheckout
    );
    expectValue(BAGPAGE_CONSTANTS.ROUTE_FOR_CART_CHECKOUT, routeForCartCheckout);
    expectValue(BAGPAGE_CONSTANTS.ADD_ITEM_SAVE_FOR_LATER, addItemToSFL);
    expectValue(BAGPAGE_CONSTANTS.START_BAG_CHECKOUT, startCartCheckout);
    expectValue(BAGPAGE_CONSTANTS.START_PAYPAL_CHECKOUT, startPaypalCheckout);
    expectValue(BAGPAGE_CONSTANTS.AUTHORIZATION_PAYPAL_CHECKOUT, authorizePayPalPayment);
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

    takeLatestDescriptor = generator.next();
    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(call(checkoutCart, true, undefined));
  });
});

describe('startCartCheckout Saga', () => {
  it('startCartCheckout effect', () => {
    const generator = startCartCheckout({});

    let takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next(false, {}).value;
    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      call(checkoutCart, false, undefined, undefined, undefined)
    );
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
    takeLatestDescriptor = generator.next(false).value;
    takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(put(setCheckoutModalMountedState({ state: true })));
  });
});

describe('Bag SFL Saga', () => {
  it('add item to sfl', () => {
    const res = {
      errorResponse: null,
    };
    const generator = addItemToSFL({ payload: { afterHandler: () => {} } });
    let takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next(res).value;
    takeLatestDescriptor = generator.next(res).value;
    expect(takeLatestDescriptor).toEqual(put(BAG_PAGE_ACTIONS.setCartItemsSFL(true)));
  });

  it('get all sfl data', () => {
    const sflItemsData = {
      productInfo: {},
      itemInfo: {},
      miscInfo: {},
    };
    const res = {
      sflItems: sflItemsData,
    };
    const generator = getSflDataSaga({});

    let takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next(res).value;
    takeLatestDescriptor = generator.next(res).value;
    expect(takeLatestDescriptor).toEqual(put(BAG_PAGE_ACTIONS.setSflData(sflItemsData)));
  });

  it('DeleteSFL ITEM', () => {
    const sflItemsData = {
      productInfo: {},
      itemInfo: {},
      miscInfo: {},
    };
    const res = {
      sflItems: sflItemsData,
    };
    const generator = startSflItemDelete({});

    let takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next(res).value;
    takeLatestDescriptor = generator.next(res).value;
    expect(takeLatestDescriptor).toEqual(put(BAG_PAGE_ACTIONS.setSflData(sflItemsData)));
  });
});
