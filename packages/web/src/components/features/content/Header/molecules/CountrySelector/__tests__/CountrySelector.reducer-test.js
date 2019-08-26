import { fromJS } from 'immutable';
import { defaultCountries, defaultCurrencies } from '@tcp/core/src/constants/site.constants';
import CountrySelectorReducer from '../container/CountrySelector.reducer';
import {
  setModuleXContent,
  updateSelectedCountry,
  updateSelectedLanguage,
  updateSelectedCurrency,
  storeCountriesMap,
  storeCurrenciesMap,
  udpateSiteId,
} from '../container/CountrySelector.actions';

describe('Country Selector reducer', () => {
  const initialState = fromJS({
    isModalOpen: false,
    countriesMap: [],
    currenciesMap: [],
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
    country: '',
    language: '',
    currency: '',
    siteId: '',
    moduleXContent: '',
  });

  it('should return default state', () => {
    expect(CountrySelectorReducer(undefined, {})).toEqual(initialState);
  });

  describe('should handle setUserInfo action correctly', () => {
    let payload;
    let state;
    beforeEach(() => {
      payload = {
        countriesMap: defaultCountries,
        currenciesMap: defaultCurrencies,
        country: 'US',
        language: 'en',
        currency: 'USD',
        siteId: 'us',
        moduleXContent: 'test content',
      };
    });

    it('setting country code correctly', () => {
      state = CountrySelectorReducer(initialState, updateSelectedCountry(payload.country));
      expect(state.get('country')).toEqual(payload.country);
    });

    it('setting currency code correctly', () => {
      state = CountrySelectorReducer(initialState, updateSelectedCurrency(payload.currency));
      expect(state.get('currency')).toEqual(payload.currency);
    });

    it('setting language correctly', () => {
      state = CountrySelectorReducer(initialState, updateSelectedLanguage(payload.language));
      expect(state.get('language')).toEqual(payload.language);
    });

    it('setting siteId correctly', () => {
      state = CountrySelectorReducer(initialState, udpateSiteId(payload.siteId));
      expect(state.get('siteId')).toEqual(payload.siteId);
    });

    it('setting countriesMap correctly', () => {
      state = CountrySelectorReducer(initialState, storeCountriesMap(payload.countriesMap));
      expect(state.get('countriesMap')).toEqual(payload.countriesMap);
    });

    it('setting currenciesMap correctly', () => {
      state = CountrySelectorReducer(initialState, storeCurrenciesMap(payload.currenciesMap));
      expect(state.get('currenciesMap')).toEqual(payload.currenciesMap);
    });

    it('setting moduleX Content correctly', () => {
      state = CountrySelectorReducer(initialState, setModuleXContent(payload.moduleXContent));
      expect(state.get('moduleXContent')).toEqual(payload.moduleXContent);
    });
  });
});
