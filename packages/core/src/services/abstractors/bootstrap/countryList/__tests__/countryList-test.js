import CountryListAbstractor from '../countryList';
import * as handler from '../../../../handler/handler';
import mock from '../mock';

jest.mock('../../../../../service/API');
jest.mock('../../../../handler/handler');

handler.default.executeGraphQLQuery = jest.fn();
handler.default.executeGraphQLQuery.mockImplementation(() => {
  return Promise.resolve({
    countryList: [
      {
        country: {
          id: 'AF',
          displayName: 'Afghanistan',
        },
        currency: {
          id: 'USD',
          displayName: 'US Dollar',
        },
        exchangeRate: {
          value: '1.2200000000',
          merchantMagin: '1.2000000000',
        },
      },
      {
        country: {
          id: 'AL',
          displayName: 'Albania',
        },
        currency: {
          id: 'USD',
          displayName: 'US Dollar',
        },
        exchangeRate: {
          value: '1.1000000000',
          merchantMargin: '1.2100000000',
        },
      },
    ],
  });
});

handler.executeStatefulAPICall = jest.fn();
handler.executeStatefulAPICall.mockImplementation(() => {
  return Promise.resolve({
    body: {
      cc: 'US',
      ccd: 'USD',
      er: '1.0000000000',
      mm: '1.2000000000',
      flag: 'US',
    },
  });
});

describe('CountryListAbstractor', () => {
  test('Country Selector fetch countries list', () => {
    return CountryListAbstractor.getData().then(data => {
      expect(data.countryList.length).toBeGreaterThan(1);
    });
  });

  test('Country Selector submit country selection', () => {
    return CountryListAbstractor.submitData().then(data => {
      expect(data.cc).toBeTruthy();
    });
  });

  it('Country Selector returns mock data', () => {
    const data = CountryListAbstractor.getMock();
    expect(data).toMatchObject(mock);
  });

  it('Country Selector handles error', () => {
    CountryListAbstractor.handleError();
  });
});
