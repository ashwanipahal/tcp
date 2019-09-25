import { executeStatefulAPICall } from '../../../handler/handler';
import { addItemToSflList, deriveSflItemAvailability, getSflItems } from '../SaveForLater';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('Save For Later', () => {
  it('addGiftCardPaymentToOrder', () => {
    const imageGen = jest.fn();
    const result = {
      body: {
        sflItems: [
          {
            inventoryAvail: 9999,
            isGiftCard: false,
            productInfo: {
              productPartNumber: '33232',
            },
            productUrl: '/us/p/gift-cards',
          },
        ],
        sflItemsCount: 4,
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    addItemToSflList('438177', false, true, imageGen, 'USD', false).then(data => {
      expect(data.body).toMatchObject(result.body);
    });
  });

  it('getSflItems', () => {
    const imageGen = jest.fn();
    const result = {
      body: {
        sflItems: [
          {
            inventoryAvail: 9999,
            isGiftCard: false,
            productInfo: {
              productPartNumber: '33232',
            },
            productUrl: '/us/p/gifts',
          },
        ],
        sflItemsCount: 4,
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    getSflItems(imageGen, 'USD', false).then(data => {
      expect(data.body).toMatchObject(result.body);
    });
  });

  it('should return valid deriveSflItemAvailability', () => {
    const sflItems = {
      inventoryAvail: 9999,
      isGiftCard: false,
      itemCatentryId: 44262,
      productInfo: {
        offerPrice: 25,
      },
      productUrl: '/us/p/gift-cards',
    };
    const result = deriveSflItemAvailability(sflItems, 'USD');

    expect(result).toEqual('OK');
  });

  it('Save for Later Delete with', () => {
    const imageGen = jest.fn();
    const result = {
      body: {
        sflItems: [
          {
            inventoryAvail: 9999,
            isGiftCard: false,
            productInfo: {
              productPartNumber: '33232',
            },
            productUrl: '/us/p/gift',
          },
        ],
        sflItemsCount: 4,
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    addItemToSflList('438177', false, true, imageGen, 'USD', false, true).then(data => {
      expect(data.body).toMatchObject(result.body);
    });
  });
});
