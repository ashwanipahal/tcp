import { put, takeLatest } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../../utils/cache.util';
import { getOrderDetailSaga, BagPageSaga, getCartDataSaga } from '../container/BagPage.saga';
import BAG_PAGE_ACTIONS from '../container/BagPage.actions';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
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
  it('should return correct takeLatest effect', () => {
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
