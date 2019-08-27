import { all, put } from 'redux-saga/effects';
import { getCountriesMap, getCurrenciesMap } from '@tcp/core/src/utils';

import { fetchCountryListData, fetchModuleX } from '../container/CountrySelector.saga';
import {
  storeCountriesMap,
  storeCurrenciesMap,
  setModuleXContent,
} from '../container/CountrySelector.actions';

describe('Country Selector Saga', () => {
  describe('fetchModuleX', () => {
    let moduleX;
    beforeEach(() => {
      moduleX = fetchModuleX('3a94a9e1-91d1-40d0-99f8-ff051604c874');
      moduleX.next();
    });

    it('should dispatch setModuleX action after success response', () => {
      const result = {
        richText: '<b>NOTE:</b> If you change your shipping destination',
      };
      const putDescriptor = moduleX.next(result).value;
      expect(putDescriptor).toEqual(put(setModuleXContent(result.richText)));
    });
  });

  describe('fetchCountryListData', () => {
    let countryList;
    beforeEach(() => {
      countryList = fetchCountryListData();
      countryList.next();
    });

    it('should dispatch storeCountriesMap and storeCurrenciesMap actions after success response', () => {
      const result = {
        data: {
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
                value: '1.1000000000',
                merchantMargin: '1.2100000000',
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
                value: '1.2000000000',
                merchantMargin: '1.2200000000',
              },
            },
            {
              country: {
                id: 'DZ',
                displayName: 'Algeria',
              },
              currency: {
                id: 'USD',
                displayName: 'US Dollar',
              },
              exchangeRate: {
                value: '1.3000000000',
                merchantMargin: '1.2300000000',
              },
            },
          ],
        },
      };
      const data = result.data.countryList;
      const putDescriptor = countryList.next(result).value;
      const countriesMap = getCountriesMap(data);
      const currenciesMap = getCurrenciesMap(data);
      expect(putDescriptor).toEqual(
        all([put(storeCountriesMap(countriesMap)), put(storeCurrenciesMap(currenciesMap))])
      );
    });
  });
});
