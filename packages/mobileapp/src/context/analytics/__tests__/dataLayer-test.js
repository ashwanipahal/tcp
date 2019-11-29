import createDataLayer from '../dataLayer';
import { fromJS } from 'immutable';

describe('dataLayer', () => {
  let datalayer;
  beforeEach(() => {
    const store = {
      getState: () => {
        return {
          AnalyticsDataKey: fromJS({
            clickActionAnalyticsData: null,
          }),
          pageData: {
            pageName: 'test',
            pageType: 'myplace',
            pageSection: 'myplace',
          },
          APIConfig: {
            storeId: '10551',
            country: 'US',
            language: 'en',
            currency: 'USD',
          },
          User: fromJS({
            personalData: {
              isGuest: true,
              contactInfo: {
                firstName: 'test',
                lastName: 'test',
              },
              userId: '1111',
            },
          }),
          ProductListing: fromJS({
            totalProductsCount: 2,
          }),
          CartPageReducer: fromJS({
            orderDetails: {},
          }),
        };
      },
    };

    datalayer = createDataLayer(store);
  });

  it('pageName should return correctly', () => {
    expect(datalayer.pageName).toBe('gl:test');
  });

  it('pageShortName should return correctly', () => {
    expect(datalayer.pageShortName).toBe('gl:test');
  });

  it('pageType should return correctly', () => {
    expect(datalayer.pageType).toBe('myplace');
  });

  it('countryId should return correctly', () => {
    expect(datalayer.countryId).toBe('10551');
  });

  it('storeId should return correctly', () => {
    expect(datalayer.storeId).toBe('10551');
  });

  it('pageLocale should return correctly', () => {
    expect(datalayer.pageLocale).toBe('US:en');
  });

  it('pageSection should return correctly', () => {
    expect(datalayer.pageSection).toBe('myplace');
  });

  it('pageSubSubSection should return correctly', () => {
    expect(datalayer.pageSubSubSection).toBe('myplace');
  });

  it('customerType should return correctly', () => {
    expect(datalayer.customerType).toBe('no rewards:guest');
  });

  it('checkoutType should return correctly', () => {
    expect(datalayer.checkoutType).toBe('guest');
  });

  it('userEmailAddress should return correctly', () => {
    expect(datalayer.userEmailAddress).toBe('');
  });

  it('cartType should return correctly', () => {
    expect(datalayer.cartType).toBe('standard');
  });

  it('products should return correctly', () => {
    expect(datalayer.products).toBe('');
  });

  it('listingCount should return correctly', () => {
    expect(datalayer.listingCount).toBe(2);
  });

  it('pageNavigationText should return correctly', () => {
    expect(datalayer.pageNavigationText).toBe('');
  });

  it('customerLastName should return correctly', () => {
    expect(datalayer.customerLastName).toBe('test');
  });

  it('customerFirstName should return correctly', () => {
    expect(datalayer.customerFirstName).toBe('test');
  });

  it('currencyCode should return correctly', () => {
    expect(datalayer.currencyCode).toBe('USD');
  });

  it('customerId should return correctly', () => {
    expect(datalayer.customerId).toBe('1111');
  });
});
