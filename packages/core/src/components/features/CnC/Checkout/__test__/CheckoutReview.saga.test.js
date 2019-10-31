import { call, select, put } from 'redux-saga/effects';
import moment from 'moment';
import CheckoutReview, {
  submitOrderProcessing,
  loadPersonalizedCoupons,
  expressCheckoutSubmit,
} from '../container/CheckoutReview.saga';
import { isGuest } from '../container/Checkout.selector';
import {
  validateAndSubmitEmailSignup,
  callPickupSubmitMethod,
} from '../container/Checkout.saga.util';
import {
  requestPersonalizedCoupons,
  updatePaymentOnOrder,
} from '../../../../../services/abstractors/CnC/index';
import {
  getSetCouponsValuesActn,
  getSetRewardPointsOrderConfActn,
  getSetOrderProductDetails,
} from '../../Confirmation/container/Confirmation.actions';
import { isMobileApp, routerPush } from '../../../../../utils';
import { resetCheckoutReducer } from '../container/Checkout.action.util';
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
const formData = {
  hasAlternatePickup: true,
  pickUpAlternate: {
    emailAddress: 'testthis@test.com',
    firstName: 'test',
    lastName: 'hello',
  },
  pickUpContact: {
    firstName: 'hello',
    lastName: 'this',
    phoneNumber: '2345678923',
    emailAddress: 'testbill2@test.com',
  },
  billing: {
    cvv: '123',
  },
};

describe('CheckoutReview saga', () => {
  it('CheckoutReview', () => {
    isMobileApp.mockImplementation(() => false);
    routerPush.mockImplementation(() => {});
    const CheckoutReviewSaga = CheckoutReview({ payload: { formData } });
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next(true).value).toEqual(call(expressCheckoutSubmit, formData));
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(
      call(submitOrderProcessing, undefined, undefined, undefined)
    );
    const res = { userDetails: { emailAddress } };
    CheckoutReviewSaga.next({ userDetails: { emailAddress } }, orderId);
    CheckoutReviewSaga.next(res);
    CheckoutReviewSaga.next();
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
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(
      call(submitOrderProcessing, undefined, undefined, undefined)
    );
    const res = { userDetails: { emailAddress } };
    CheckoutReviewSaga.next({ userDetails: { emailAddress } }, orderId);
    CheckoutReviewSaga.next(res);
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(put(getSetOrderProductDetails()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(resetCheckoutReducer()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(resetAirmilesReducer()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(resetCouponReducer()));
    expect(CheckoutReviewSaga.next().value).toEqual(put(BagActions.resetCartReducer()));
  });
  it('CheckoutReview for email sign up', () => {
    isMobileApp.mockImplementation(() => false);
    routerPush.mockImplementation(() => {});
    const CheckoutReviewSaga = CheckoutReview({ payload: {} });
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(
      call(submitOrderProcessing, undefined, undefined, undefined)
    );
    const res = { userDetails: { emailAddress } };
    CheckoutReviewSaga.next({ userDetails: { emailAddress } }, orderId);
    CheckoutReviewSaga.next(res);
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(select(isGuest));
    expect(CheckoutReviewSaga.next(true).value).toEqual(
      call(validateAndSubmitEmailSignup, emailAddress, 'us_guest_checkout')
    );
  });

  it('CheckoutReview for email sign up with shipping email', () => {
    isMobileApp.mockImplementation(() => false);
    routerPush.mockImplementation(() => {});
    const CheckoutReviewSaga = CheckoutReview({ payload: {} });
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(
      call(submitOrderProcessing, undefined, undefined, undefined)
    );
    const res = { userDetails: { emailAddress } };
    CheckoutReviewSaga.next({ shipping: { emailAddress } }, orderId);
    CheckoutReviewSaga.next(res);
    CheckoutReviewSaga.next();
    expect(CheckoutReviewSaga.next().value).toEqual(select(isGuest));
    expect(CheckoutReviewSaga.next(true).value).toEqual(
      call(validateAndSubmitEmailSignup, emailAddress, 'us_guest_checkout')
    );
  });
});

describe('submitOrderProcessing saga', () => {
  it('submitOrderProcessing review Page with venmo', () => {
    const orderProcessing = submitOrderProcessing();
    orderProcessing.next();
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
          startDate: new Date(),
          endDate: '2020-10-17 23:59:59',
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
            endDate: 'Oct 17th, 2020',
            isPastStartDate: true,
            startDate: moment(new Date()).format('MMM Do, YYYY'),
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
describe('expressCheckoutSubmit saga', () => {
  it('expressCheckoutSubmit review Page', () => {
    const requestData = {
      orderGrandTotal: 23,
      monthExpire: 8,
      yearExpire: 2023,
      cardType: 'VISA',
      cardNumber: '************1111',
      paymentId: '23435',
      billingAddressId: '2345678',
      cvv: '123', // the cvv entered by the user
    };
    const billingDetails = {
      billing: {
        expMonth: 8,
        expYear: 2023,
        cardType: 'VISA',
        cardNumber: '************1111',
      },
      paymentId: '23435',
      address: {
        onFileAddressId: '2345678',
      },
    };
    const expressCheckout = expressCheckoutSubmit(formData);
    expect(expressCheckout.next().value).toEqual(call(callPickupSubmitMethod, formData));
    expressCheckout.next();
    expressCheckout.next(billingDetails);
    expect(expressCheckout.next(23).value).toEqual(call(updatePaymentOnOrder, requestData));
  });
});
