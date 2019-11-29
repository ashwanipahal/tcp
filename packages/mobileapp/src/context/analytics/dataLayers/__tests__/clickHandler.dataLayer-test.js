import { generateClickHandlerDataLayer } from '../clickHandler.dataLayer';
import { fromJS } from 'immutable';

describe('clickHandler.dataLayer', () => {
  let datalayer;
  let defaultData;
  beforeEach(() => {
    const store = {
      getState: () => {
        const currentStore = {
          AnalyticsDataKey: fromJS({
            clickActionAnalyticsData: null,
          }),
        };

        currentStore.AnalyticsDataKey = currentStore.AnalyticsDataKey.set(
          'clickActionAnalyticsData',
          {
            customEvents: ['event80'],
            products: 'products',
            eventName: 'test',
            couponCode: 'coupon',
            storeSearchCriteria: 'test search',
            storeSearchDistance: '10',
            internalCampaignId: 'icid',
            socialNetwork: 'twitter',
          }
        );
        return currentStore;
      },
    };

    datalayer = { ...generateClickHandlerDataLayer(store) };
    defaultData = datalayer.eventData.get();
  });

  it('customEvents should returned correctly', () => {
    expect(defaultData.customEvents).toEqual(['event80']);
  });

  it('products should returned correctly', () => {
    expect(defaultData.products).toBe('products');
  });

  it('eventName should returned correctly', () => {
    expect(defaultData.eventName).toBe('test');
  });

  it('couponCode should returned correctly', () => {
    expect(defaultData.couponCode).toBe('coupon');
  });

  it('storeSearchCriteria should returned correctly', () => {
    expect(defaultData.storeSearchCriteria).toBe('test search');
  });

  it('storeSearchDistance should returned correctly', () => {
    expect(defaultData.storeSearchDistance).toBe('10');
  });

  it('internalCampaignId should returned correctly', () => {
    expect(defaultData.internalCampaignId).toBe('icid');
  });

  it('socialNetwork should returned correctly', () => {
    expect(defaultData.socialNetwork).toBe('twitter');
  });
});
