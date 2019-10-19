import { fromJS } from 'immutable';
import { defaultCountries, defaultCurrencies } from '@tcp/core/src/constants/site.constants';
import {
  COUNTRY_SELECTOR_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import {
  getCountriesMap,
  getCurrenciesMap,
  getSitesTable,
  getCurrentCountry,
  getCurrentLanguage,
  getCurrentCurrency,
  getIsModalOpen,
  getSiteId,
  getNoteContent,
} from '../container/CountrySelector.selectors';

describe('#Country Selector', () => {
  const stateObject = {
    country: 'US',
    currency: 'USD',
    isModalOpen: true,
    siteId: 'us',
    moduleXContent: 'test footer note',
  };
  const state = {
    [COUNTRY_SELECTOR_REDUCER_KEY]: fromJS(stateObject),
  };

  const sessionObject = {
    siteOptions: {
      countriesMap: defaultCountries,
      currenciesMap: defaultCurrencies,
      sitesTable: {
        us: {
          languages: [
            {
              id: 'en',
              displayName: 'English',
            },
            {
              id: 'es',
              displayName: 'Spanish',
            },
          ],
        },
        ca: {
          languages: [
            {
              id: 'en',
              displayName: 'English',
            },
            {
              id: 'fr',
              displayName: 'French',
            },
          ],
        },
      },
    },
  };

  const session = {
    [SESSIONCONFIG_REDUCER_KEY]: sessionObject,
  };

  it('#getCountriesMap should return countriesMap', () => {
    expect(getCountriesMap(session)).toBe(sessionObject.siteOptions.countriesMap);
  });

  it('#getCurrenciesMap should return currenciesMap', () => {
    expect(getCurrenciesMap(session)).toBe(sessionObject.siteOptions.currenciesMap);
  });

  it('#getSitesTable should return sites table', () => {
    expect(getSitesTable(session)).toBe(sessionObject.siteOptions.sitesTable);
  });

  it('#getIsModalOpen should return user modal state', () => {
    expect(getIsModalOpen(state)).toBe(stateObject.isModalOpen);
  });

  it('#getCurrentCountry should return selected country', () => {
    expect(getCurrentCountry(state)).toBe(stateObject.country);
  });

  it('#getCurrentLanguage should return language', () => {
    expect(getCurrentLanguage(state)).toBe(stateObject.language);
  });

  it('#getCurrentCurrency should return selected currency', () => {
    expect(getCurrentCurrency(state)).toBe(stateObject.currency);
  });

  it('#getSiteId should return selected siteId', () => {
    expect(getSiteId(state)).toEqual(stateObject.siteId);
  });

  it('#getNoteContent should return selected note content', () => {
    expect(getNoteContent(state)).toBe(stateObject.moduleXContent);
  });
});
