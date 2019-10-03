import { call, select, put } from 'redux-saga/effects';
import CheckoutReview, {
  submitOrderProcessing,
  loadPersonalizedCoupons,
} from '../container/CheckoutReview.saga';
import { isGuest } from '../container/Checkout.selector';
import { validateAndSubmitEmailSignup } from '../container/Checkout.saga.util';
import { requestPersonalizedCoupons } from '../../../../../services/abstractors/CnC/index';
import {
  getSetCouponsValuesActn,
  getSetRewardPointsOrderConfActn,
  getSetOrderProductDetails,
} from '../../Confirmation/container/Confirmation.actions';
import { isMobileApp, routerPush } from '../../../../../utils';
import { resetCheckoutReducer } from '../container/Checkout.action';
import { resetAirmilesReducer } from '../../common/organism/AirmilesBanner/container/AirmilesBanner.actions';
import { resetCouponReducer } from '../../common/organism/CouponAndPromos/container/Coupon.actions';
import BagActions from '../../BagPage/container/BagPage.actions';
import { updateVenmoPaymentInstruction } from '../container/CheckoutBilling.saga';

jest.mock('../../../../../utils', () => ({
  isMobileApp: jest.fn(),
  routerPush: jest.fn(),
}));

const emailAddress = '123@123.com';
const orderId = '54321';
const smsOrderInfo = '';
const currentLanguage = 'en';

describe('CheckoutReview saga', () => {
  it('CheckoutReview', () => {
    isMobileApp.mockImplementation(() => false);
    routerPush.mockImplementation(() => {});
    const CheckoutReviewSaga = CheckoutReview({ payload: {} });
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(
      call(submitOrderProcessing, undefined, undefined, undefined)
    );
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(put(getSetOrderProductDetails()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(resetCheckoutReducer()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(resetAirmilesReducer()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(resetCouponReducer()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(BagActions.resetCartReducer()));
  });
  it('CheckoutReview when mobile app', () => {
    isMobileApp.mockImplementation(() => true);
    routerPush.mockImplementation(() => {});
    const CheckoutReviewSaga = CheckoutReview({ payload: { navigation: { navigate: jest.fn() } } });
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(
      call(submitOrderProcessing, undefined, undefined, undefined)
    );
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(put(getSetOrderProductDetails()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(resetCheckoutReducer()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(resetAirmilesReducer()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(resetCouponReducer()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(BagActions.resetCartReducer()));
  });
});

describe('submitOrderProcessing saga', () => {
  it('submitOrderProcessing review Page', () => {
    const orderProcessing = submitOrderProcessing();
    orderProcessing.next(false); // Venmo not in progress
    orderProcessing.next(false); // Venmo save option not selected
    orderProcessing.next({}); // No venmo data
    orderProcessing.next(orderId, smsOrderInfo, currentLanguage, {});
    const res = { userDetails: { emailAddress } };
    orderProcessing.next({ userDetails: { emailAddress } }, orderId);
    orderProcessing.next(res);
    orderProcessing.next();
    expect(orderProcessing.next().value).toEqual(select(isGuest));
    expect(orderProcessing.next(true).value).toEqual(
      call(validateAndSubmitEmailSignup, emailAddress, 'us_guest_checkout')
    );
  });
  it('submitOrderProcessing review Page with shipping email', () => {
    const orderProcessing = submitOrderProcessing();
    orderProcessing.next(false);
    orderProcessing.next(false);
    orderProcessing.next({});
    orderProcessing.next(orderId, smsOrderInfo, currentLanguage, {});
    const res = { userDetails: { emailAddress } };
    orderProcessing.next({ shipping: { emailAddress } }, orderId);
    orderProcessing.next(res);
    orderProcessing.next();
    expect(orderProcessing.next().value).toEqual(select(isGuest));
    expect(orderProcessing.next(true).value).toEqual(
      call(validateAndSubmitEmailSignup, emailAddress, 'us_guest_checkout')
    );
  });

  it('submitOrderProcessing review Page with venmo', () => {
    const orderProcessing = submitOrderProcessing();
    orderProcessing.next(true); // Venmo In-Progress
    orderProcessing.next(true); // Venmo Save Option Selected
    orderProcessing.next({ nonce: 'encrypted-nonce', deviceData: 'test-device-data' }); // Venmo Data
    expect(orderProcessing.next().value).toEqual(call(updateVenmoPaymentInstruction));
  });
});
describe('loadPersonalizedCoupons saga', () => {
  it('loadPersonalizedCoupons review Page', () => {
    const coupons = [
      {
        couponCode: 'Y16905R9YZDDLH',
        legalText: 'Valid on select styles. Excludes Gift Cards.',
        promotion: {
          categoryType: 'Marketing_Offers',
          startDate: '2019-10-04 00:00:00',
          endDate: '2019-10-17 23:59:59',
          shortDescription: '20% OFF YOUR ENTIRE PURCHASE',
        },
      },
    ];
    const orderProcessing = loadPersonalizedCoupons({
      userDetails: { emailAddress },
    });
    orderProcessing.next();
    orderProcessing.next(false);
    expect(orderProcessing.next([]).value).toEqual(
      call(requestPersonalizedCoupons, {
        orderNumber: undefined,
        emailAddress,
        locationId: '0180',
        couponList: [],
        isElectiveBonus: undefined,
        currencyCode: undefined,
        payments: undefined,
        cartItems: undefined,
      })
    );
    expect(
      orderProcessing.next({
        personalizedOffersResponse: {
          coupon: coupons,
        },
        orderResponse: { pointsToNextReward: -1, userPoints: -1, earnedReward: true },
      }).value
    ).toEqual(
      put(
        getSetCouponsValuesActn([
          {
            code: 'Y16905R9YZDDLH',
            description: '20% OFF YOUR ENTIRE PURCHASE',
            disclaimer: 'Valid on select styles. Excludes Gift Cards.',
            endDate: 'Oct 17th, 2019',
            isPastStartDate: false,
            startDate: 'Oct 4th, 2019',
            categoryType: 'Marketing_Offers',
          },
        ])
      )
    );
    orderProcessing.next({
      personalizedOffersResponse: {
        coupon: coupons,
      },
      orderResponse: { pointsToNextReward: -1, userPoints: -1, earnedReward: true },
    });
    expect(orderProcessing.next().value).toEqual(
      put(
        getSetRewardPointsOrderConfActn({
          earnedReward: true,
          estimatedRewards: null,
          pointsToNextReward: 0,
        })
      )
    );
  });
  it('loadPersonalizedCoupons review Page for canada', () => {
    const orderProcessing = loadPersonalizedCoupons({
      userDetails: { emailAddress },
    });
    orderProcessing.next();
    orderProcessing.next(true);
    expect(orderProcessing.next([]).value).toEqual(
      call(requestPersonalizedCoupons, {
        orderNumber: undefined,
        emailAddress,
        locationId: '3180',
        couponList: [],
        isElectiveBonus: undefined,
        currencyCode: undefined,
        payments: undefined,
        cartItems: undefined,
      })
    );
    expect(
      orderProcessing.next({
        personalizedOffersResponse: {},
        orderResponse: { pointsToNextReward: 12, userPoints: 15, earnedReward: true },
      }).value
    ).toEqual(put(getSetCouponsValuesActn([])));
  });
});
