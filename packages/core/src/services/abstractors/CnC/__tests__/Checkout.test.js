import logger from '@tcp/core/src/utils/loggerInstance';
import { executeStatefulAPICall } from '../../../handler/handler';
import {
  getGiftWrappingOptions,
  getShippingMethods,
  addGiftCardPaymentToOrder,
  removeGiftCard,
} from '../Checkout';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('Checkout', () => {
  it('getGiftWrappingOptions', () => {
    const result = {
      body: {
        orderDetails: {},
      },
    };
    executeStatefulAPICall.mockImplementation(() => result);
    expect(getGiftWrappingOptions()).toMatchObject(result);
  });
  describe('getShippingMethods', () => {
    it('should return with success', () => {
      const result = {
        body: [
          {
            id: '901101',
            displayName: 'Standard - FREE',
            shippingSpeed: 'Up To 10 Business Days',
            price: 0,
            isDefault: true,
          },
          {
            id: '901102',
            displayName: 'Express',
            shippingSpeed: 'Up To 5 Business Days',
            price: 15,
            isDefault: false,
          },
          {
            id: '901103',
            displayName: 'Rush',
            shippingSpeed: 'Up To 3 Business Days',
            price: 20,
            isDefault: false,
          },
          {
            id: '901107',
            displayName: 'Holiday Express',
            shippingSpeed: 'Up To 2 Days',
            price: 1,
            isDefault: false,
          },
        ],
      };
      const res = {
        body: {
          jsonArr: [
            {
              blockedShipMode: true,
              code: 'UGNR',
              defaultShipMode: true,
              description: 'Standard FREE Up To 10 Business Days',
              shipModeId: '901101',
              shippingPrice: '$0',
            },
            {
              blockedShipMode: false,
              code: 'U2DY',
              defaultShipMode: false,
              description: 'Express Up To 5 Business Days',
              shipModeId: '901102',
              shippingPrice: '$15',
            },
            {
              blockedShipMode: false,
              code: 'U1DS',
              defaultShipMode: false,
              description: 'Rush Up To 3 Business Days',
              shipModeId: '901103',
              shippingPrice: '$20',
            },
            {
              blockedShipMode: false,
              code: 'HEXP',
              defaultShipMode: false,
              description: 'Holiday Express Up To 2 Days',
              shipModeId: '901107',
              shippingPrice: '$1',
            },
          ],
        },
      };
      const state = 'MA';
      const zipCode = '1323';
      const addressLine1 = 'abs';
      const addressLine2 = '123';
      executeStatefulAPICall.mockImplementation(() => Promise.resolve(res));
      return getShippingMethods(state, zipCode, addressLine1, addressLine2).then(val => {
        logger.info(val);
        return expect(val).toMatchObject(result.body);
      });
    });
  });
  it('addGiftCardPaymentToOrder', () => {
    const args = {
      cardNumber: '******1234',
      cardPin: undefined,
      balance: undefined,
      creditCardId: 12344,
      orderGrandTotal: 900,
      billingAddressId: null,
    };
    const result = {
      body: {
        orderDetails: {
          orderDetailsResponse: {},
        },
        OosCartItems: 'FALSE',
        orderId: '3000319653',
        paymentInstruction: [{ piId: '123' }, { piId: '345' }],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    addGiftCardPaymentToOrder(args).then(data => {
      expect(data.body).toMatchObject(result.body);
    });
  });
  it('removeGiftCard', () => {
    const paymentId = '1234';
    const result = {
      body: {
        orderId: ['3000319653'],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    removeGiftCard(paymentId).then(data => {
      expect(data.body).toMatchObject(result.body);
    });
  });
});
