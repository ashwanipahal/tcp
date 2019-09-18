import { call, select } from 'redux-saga/effects';
import CheckoutReview, {
  submitOrderProcessing,
  loadPersonalizedCoupons,
} from '../container/CheckoutReview.saga';
import { isGuest } from '../container/Checkout.selector';
import { validateAndSubmitEmailSignup } from '../container/Checkout.saga.util';
import { requestPersonalizedCoupons } from '../../../../../services/abstractors/CnC/index';

describe('CheckoutReview saga', () => {
  it('CheckoutReview', () => {
    const CheckoutReviewSaga = CheckoutReview();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(
      call(submitOrderProcessing, undefined, undefined, undefined)
    );
  });
});
const emailAddress = '123@123.com';
describe('submitOrderProcessing saga', () => {
  it('submitOrderProcessing review Page', () => {
    const orderProcessing = submitOrderProcessing();
    orderProcessing.next();
    orderProcessing.next({ userDetails: { emailAddress } });
    orderProcessing.next();
    expect(orderProcessing.next().value).toEqual(select(isGuest));
    expect(orderProcessing.next(true).value).toEqual(
      call(validateAndSubmitEmailSignup, emailAddress, 'us_guest_checkout')
    );
  });
  it('submitOrderProcessing review Page with shipping email', () => {
    const orderProcessing = submitOrderProcessing();
    orderProcessing.next();
    orderProcessing.next({ shipping: { emailAddress } });
    orderProcessing.next();
    expect(orderProcessing.next().value).toEqual(select(isGuest));
    expect(orderProcessing.next(true).value).toEqual(
      call(validateAndSubmitEmailSignup, emailAddress, 'us_guest_checkout')
    );
  });
});
describe('loadPersonalizedCoupons saga', () => {
  it('loadPersonalizedCoupons review Page', () => {
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
        personalizedOffersResponse: {},
        orderResponse: { pointsToNextReward: -1, userPoints: -1, earnedReward: true },
      }).value
    ).toEqual(undefined);
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
    ).toEqual(undefined);
  });
});
