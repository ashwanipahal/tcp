import { fromJS } from 'immutable';
import ConfirmationReducer from '../container/Confirmation.reducer';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';

describe('ConfirmationReducer', () => {
  const initState = {
    orderConfirmation: {
      emailAddress: '',
      encryptedEmailAddress: '',
      createAccountSuccess: false,
      summary: {
        itemsTotal: 0,
        itemsCount: 0,
        savingsTotal: 0,
        taxTotal: 0,
        shippingTotal: 0,
        estimatedRewards: 0,
        subTotal: 0,
        grandTotal: 0,
        pointsToNextReward: 0,
        earnedReward: '',
      },

      orderDetails: {
        date: null,
        orderNumber: null,
        trackingLink: '',
      },

      rewardedPoints: 0,

      userDetails: {},
    },
    aquiredCouponCode: [],
    venmoPaymentConfirmationDisplayed: false,
  };
  const initialState = fromJS(initState);

  it('should return initialState', () => {
    expect(ConfirmationReducer(initialState, { type: 'abc' })).toEqual(initialState);
  });

  it('should set Order confirmation data', () => {
    const orderConfirmation = fromJS({
      currencyCode: 'USD',
      holdDate: 'Tue Oct 01 2019 01:00:03 GMT+0530 (India Standard Time)',
      isElectiveBonus: '0',
      isOrderPending: false,
      emailAddress: '',
      encryptedEmailAddress: '',
    });
    expect(
      ConfirmationReducer(initialState, {
        type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_ORDER_CONFIRMATION,
        orderConfirmation,
      })
    ).toEqual(
      fromJS({
        orderConfirmation: {
          currencyCode: 'USD',
          holdDate: 'Tue Oct 01 2019 01:00:03 GMT+0530 (India Standard Time)',
          isElectiveBonus: '0',
          isOrderPending: false,
          emailAddress: '',
          encryptedEmailAddress: '',
        },
        aquiredCouponCode: [],
        venmoPaymentConfirmationDisplayed: false,
      })
    );
  });
  it('should set coupons data', () => {
    const couponsInfo = fromJS([
      {
        categoryType: 'Marketing_Offers',
        code: 'Y16905R9YZDDLH',
        description: '20% OFF YOUR ENTIRE PURCHASE',
        disclaimer:
          'Valid on select styles.   Excludes Gift Cards.   Valid in U.S. and Puerto Rico stores and online only. Not valid in Canada stores or online when shipping to Canada. Valid for one-time use only.   Cannot be combined with any offer except My Place Rewards certificates.   Present in store, or enter web code at online checkout.   Additional Terms and Conditions apply.   See an associate or visit www.childrensplace.com/couponlegal for details.   ',
        endDate: 'Oct 17th, 2019',
        isPastStartDate: false,
      },
    ]);
    expect(
      ConfirmationReducer(initialState, {
        type: CONFIRMATION_CONSTANTS.CONFIRMATION_VALUES_COUPONS_SET,
        couponsInfo,
      })
    ).toEqual(
      fromJS({
        orderConfirmation: {
          emailAddress: '',
          encryptedEmailAddress: '',
          createAccountSuccess: false,
          summary: {
            itemsTotal: 0,
            itemsCount: 0,
            savingsTotal: 0,
            taxTotal: 0,
            shippingTotal: 0,
            estimatedRewards: 0,
            subTotal: 0,
            grandTotal: 0,
            pointsToNextReward: 0,
            earnedReward: '',
          },

          orderDetails: {
            date: null,
            orderNumber: null,
            trackingLink: '',
          },

          rewardedPoints: 0,

          userDetails: {},
        },
        venmoPaymentConfirmationDisplayed: false,
        aquiredCouponCode: [
          {
            categoryType: 'Marketing_Offers',
            code: 'Y16905R9YZDDLH',
            description: '20% OFF YOUR ENTIRE PURCHASE',
            disclaimer:
              'Valid on select styles.   Excludes Gift Cards.   Valid in U.S. and Puerto Rico stores and online only. Not valid in Canada stores or online when shipping to Canada. Valid for one-time use only.   Cannot be combined with any offer except My Place Rewards certificates.   Present in store, or enter web code at online checkout.   Additional Terms and Conditions apply.   See an associate or visit www.childrensplace.com/couponlegal for details.   ',
            endDate: 'Oct 17th, 2019',
            isPastStartDate: false,
          },
        ],
      })
    );
  });
  it('should set orderProducts data ', () => {
    const orderProducts = fromJS([
      {
        productInfo: [
          {
            imagePath: '/wcsstore/GlobalSAS/images/tcp/products/500/2025026_744.jpg',
            size: '6X/7',
            generalProductId: '425771',
          },
        ],
        color: [
          {
            name: 'SUPERDKIND',
          },
        ],
        variantNo: '2025026012',
      },
    ]);
    expect(
      ConfirmationReducer(initialState, {
        type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_ORDER_PRODUCTS,
        orderProducts,
      })
    ).toEqual(
      fromJS({
        orderConfirmation: {
          emailAddress: '',
          encryptedEmailAddress: '',
          createAccountSuccess: false,
          summary: {
            itemsTotal: 0,
            itemsCount: 0,
            savingsTotal: 0,
            taxTotal: 0,
            shippingTotal: 0,
            estimatedRewards: 0,
            subTotal: 0,
            grandTotal: 0,
            pointsToNextReward: 0,
            earnedReward: '',
          },

          orderDetails: {
            date: null,
            orderNumber: null,
            trackingLink: '',
          },

          rewardedPoints: 0,

          userDetails: {},
        },
        aquiredCouponCode: [],

        venmoPaymentConfirmationDisplayed: false,
        orderProducts,
      })
    );
  });
  it('should set summary data', () => {
    const updatedSummary = fromJS({
      couponsTotal: 0,
      giftCardsTotal: 0,
      giftWrappingTotal: 0,
      grandTotal: 21.13,
      itemsCount: 1,
      itemsTotal: 19.5,
      savingsTotal: 0,
      shippingTotal: 0,
      subTotal: 19.5,
      taxesTotal: 1.63,
      valueOfEarnedPcCoupons: 0,
    });
    expect(
      ConfirmationReducer(initialState, {
        type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_REWARDS_POINTS,
        updatedSummary,
      })
    ).toEqual(
      fromJS({
        orderConfirmation: {
          emailAddress: '',
          encryptedEmailAddress: '',
          createAccountSuccess: false,
          summary: {
            couponsTotal: 0,
            giftCardsTotal: 0,
            giftWrappingTotal: 0,
            grandTotal: 21.13,
            itemsCount: 1,
            itemsTotal: 19.5,
            savingsTotal: 0,
            shippingTotal: 0,
            subTotal: 19.5,
            taxesTotal: 1.63,
            valueOfEarnedPcCoupons: 0,
          },

          orderDetails: {
            date: null,
            orderNumber: null,
            trackingLink: '',
          },

          rewardedPoints: 0,

          userDetails: {},
        },
        aquiredCouponCode: [],

        venmoPaymentConfirmationDisplayed: false,
      })
    );
  });

  it('should set the createAccountSuccess state to true', () => {
    expect(
      ConfirmationReducer(initialState, {
        type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_CREATE_ACCOUNT_SUCCESS,
        payload: true,
      }).getIn(['orderConfirmation', 'createAccountSuccess'])
    ).toBe(true);
  });
});
