import { generateClickHandlerDataLayer } from '../clickHandler.dataLayer';
import { fromJS } from 'immutable';

describe('clickHandler.dataLayer', () => {
  let datalayer;
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
    console.log('---------datalayer---------', datalayer.eventData);
  });

  it('customEvents should returned correctly', () => {
    expect(datalayer.eventData.customEvents).toBe(['event80']);
  });

  it('products should returned correctly', () => {
    expect(datalayer.eventData.products).toBe('products');
  });

  it('eventName should returned correctly', () => {
    expect(datalayer.eventData.eventName).toBe('test');
  });

  it('couponCode should returned correctly', () => {
    expect(datalayer.eventData.couponCode).toBe('coupon');
  });

  it('storeSearchCriteria should returned correctly', () => {
    expect(datalayer.eventData.storeSearchCriteria).toBe('test search');
  });

  it('storeSearchDistance should returned correctly', () => {
    expect(datalayer.eventData.storeSearchDistance).toBe('10');
  });

  it('internalCampaignId should returned correctly', () => {
    expect(datalayer.eventData.internalCampaignId).toBe('icid');
  });

  it('socialNetwork should returned correctly', () => {
    expect(datalayer.eventData.socialNetwork).toBe('twitter');
  });
});
