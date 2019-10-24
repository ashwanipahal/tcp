import ConfirmationSelectors from '../container/Confirmation.selectors';
import { getAPIConfig } from '../../../../../utils/utils';

const {
  getCurrentSiteId,
  isCanadaSite,
  getConfirmationLblObj,
  getConfirmationLabels,
  getItemsCount,
  getSubTotal,
  getCouponsTotal,
  getSavingsTotal,
  giftServiceTotal,
} = ConfirmationSelectors;

jest.mock('../../../../../utils/utils', () => ({
  getAPIConfig: jest.fn(),
  getLabelValue: jest.fn(),
}));

describe('Confirmation Selectors', () => {
  it('#getCurrentSiteId', () => {
    getAPIConfig.mockImplementation(() => {
      return { siteId: 'us' };
    });
    expect(getCurrentSiteId()).toEqual('us');
  });
  it('#isCanadaSite', () => {
    getAPIConfig.mockImplementation(() => {
      return { siteId: 'us' };
    });
    expect(isCanadaSite()).toEqual(false);
  });
  it('#getConfirmationLblObj', () => {
    const State = {
      Labels: {
        checkout: {
          orderConfirmation: {},
        },
      },
    };
    expect(getConfirmationLblObj(State)).toEqual({});
  });
  it('#getConfirmationLabels', () => {
    const State = {
      Labels: {
        checkout: {
          orderConfirmation: {
            lbl_confirmation_heading: 'thankYouHeading',
            lbl_confirmation_mixOrderMsg1: 'mixOrderMsg1',
            lbl_confirmation_mixOrderMsg2: 'mixOrderMsg2',
            lbl_confirmation_orderMsg1: 'orderMsg1',
            lbl_confirmation_shippingMsg: 'shippingMsg',
            lbl_confirmation_pickup: 'pickup',
            lbl_confirmation_orderMsg2: 'orderMsg2',
            lbl_confirmation_pendingOrderMsg: 'pendingOrderMsg',
            lbl_confirmation_pickupAt: 'pickupAt',
            lbl_confirmation_shippingTo: 'shippingTo',
            lbl_confirmation_item: 'item',
            lbl_confirmation_items: 'items',
            lbl_confirmation_currencySign: 'currencySign',
            lbl_confirmation_bopisDate: 'bopisDate',
            lbl_confirmation_today: 'today',
            lbl_confirmation_tomorrow: 'tomorrow',
            lbl_confirmation_phone: 'phone',
            lbl_confirmation_orderNumber: 'orderNumber',
            lbl_confirmation_orderDate: 'orderDate',
            lbl_confirmation_orderTotal: 'orderTotal',
            lbl_confirmation_nextHeading: 'nextHeading',
            lbl_confirmation_nextDetails: 'nextDetails',
            lbl_confirmation_updateOrderHeading: 'updateOrderHeading',
            lbl_confirmation_nextDetails_boss: 'nextDetailsBoss',
          },
        },
      },
    };
    const object = {
      thankYouHeading: undefined,
      mixOrderMsg1: undefined,
      mixOrderMsg2: undefined,
      orderMsg1: undefined,
      shippingMsg: undefined,
      pickup: undefined,
      orderMsg2: undefined,
      pendingOrderMsg: undefined,
      pickupAt: undefined,
      shippingTo: undefined,
      item: undefined,
      items: undefined,
      currencySign: undefined,
      bopisDate: undefined,
      today: undefined,
      tomorrow: undefined,
      phone: undefined,
      orderNumber: undefined,
      orderDate: undefined,
      orderTotal: undefined,
      nextHeading: undefined,
      nextDetails: undefined,
      updateOrderHeading: undefined,
      nextDetailsBoss: undefined,
    };
    expect(getConfirmationLabels(State)).toEqual(object);
  });
});

describe('Confirmation Page Selectors', () => {
  const State = {
    Confirmation: {
      orderConfirmation: {
        summary: {
          itemsTotal: 1,
          itemsCount: 4,
          couponsTotal: 4,
          giftWrappingTotal: 0,
          giftCardsTotal: 0,
          savingsTotal: 2,
          taxesTotal: 2,
          shippingTotal: 3,
          valueOfEarnedPcCoupons: 9,
          subTotal: 23,
          grandTotal: 33,
        },
        orderDetails: {
          orderNumber: 1,
          orderTotal: 5,
          currencyCode: 'USD',
        },
      },
    },
  };

  // TODO : Skipping it as it will be fixed after the immutable decision
  it.skip('#getItemsCount', () => {
    expect(getItemsCount(State)).toEqual(4);
  });

  it.skip('#getSubTotal', () => {
    expect(getSubTotal(State)).toEqual(23);
  });

  it.skip('#getSubTotal', () => {
    expect(getSubTotal(State)).toEqual(23);
  });

  it.skip('#getCouponsTotal', () => {
    expect(getCouponsTotal(State)).toEqual(12);
  });

  it.skip('#getSavingsTotal', () => {
    expect(getSavingsTotal(State)).toEqual(12);
  });

  it.skip('#giftServiceTotal', () => {
    expect(giftServiceTotal(State)).toEqual(0);
  });
});
