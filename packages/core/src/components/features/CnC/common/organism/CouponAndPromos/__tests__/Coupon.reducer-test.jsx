import { fromJS } from 'immutable';
import COUPON_CONSTANTS from '../Coupon.constants';
import BAGPAGE_CONSTANTS from '../../../../BagPage/BagPage.constants';
import CouponReducer from '../container/Coupon.reducer';

describe('Coupon Reducer', () => {
  const initialState = fromJS({
    isFetching: false,
    couponsAndOffers: [
      {
        id: 'Y00105578',
        status: 'available',
        labelStatus: 'APPLY',
        isExpiring: true,
        title: '$10 OFF On $50',
        detailsOpen: false,
        expirationDate: '8/10/19',
        effectiveDate: '8/6/19',
        details: null,
        legalText: '$10 OFF On $50',
        isStarted: true,
        offerType: 'saving',
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '2019-08-10T18:29:00.001Z',
      },
      {
        id: 'Y00105580',
        status: 'applied',
        labelStatus: 'REMOVE',
        isExpiring: false,
        title: '$10off$50 TCP ONLY',
        detailsOpen: false,
        expirationDate: '12/31/99',
        effectiveDate: '7/31/19',
        details: null,
        legalText: '$10off$50 TCP ONLY',
        isStarted: true,
        offerType: 'saving',
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '9999-12-31T18:29:59.999Z',
      },
    ],
  });

  it('InitialState', () => {
    const newState = CouponReducer({ isFetching: false }, {});
    expect(newState.get('isFetching')).toEqual(false);
  });

  it('Default', () => {
    const getOrderDetailAction = {
      type: 'Default',
    };
    const newState = CouponReducer(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.get('isFetching')).toEqual(false);
  });

  it('SHOW_LOADER', () => {
    const getOrderDetailAction = {
      type: COUPON_CONSTANTS.SHOW_LOADER,
    };
    const newState = CouponReducer(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.get('isFetching')).toEqual(true);
  });

  it('HIDE_LOADER', () => {
    const getOrderDetailAction = {
      type: COUPON_CONSTANTS.HIDE_LOADER,
    };
    const newState = CouponReducer(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.get('isFetching')).toEqual(false);
  });

  it('SET_STATUS_COUPON', () => {
    const getOrderDetailAction = {
      type: COUPON_CONSTANTS.SET_STATUS_COUPON,
      payload: {
        promoCode: 'Y00105580',
        status: false,
      },
    };
    const newState = CouponReducer(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.get('isFetching')).toEqual(false);
  });

  it('SET_COUPONS_DATA', () => {
    const getOrderDetailAction = {
      type: BAGPAGE_CONSTANTS.SET_COUPONS_DATA,
      payload: [],
    };
    const newState = CouponReducer(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.get('isFetching')).toEqual(false);
  });

  it('SET_ERROR', () => {
    const getOrderDetailAction = {
      type: COUPON_CONSTANTS.SET_ERROR,
      payload: {
        couponCode: 'Y00105580',
        msg: 'error',
      },
    };
    const newState = CouponReducer(initialState, {
      ...getOrderDetailAction,
    });

    expect(newState.get('isFetching')).toEqual(false);
  });
});
