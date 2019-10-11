import { fromJS } from 'immutable';
import { getCurrentCountry, getStoreInfo, getPageLabels } from '../StoreLanding.selectors';
import {
  SESSIONCONFIG_REDUCER_KEY,
  STORE_LOCATOR_REDUCER_KEY,
} from '../../../../../../constants/reducer.constants';
import storeLocatorState from '../__mocks__/storeLocatorState';

describe('selectors', () => {
  it('getCurrentCountry', () => {
    const siteDetails = {
      siteDetails: {
        country: 'NY',
      },
    };
    const state = {
      [SESSIONCONFIG_REDUCER_KEY]: fromJS(siteDetails),
    };
    const countrySelectorValue = getCurrentCountry(state);
    expect(countrySelectorValue).toBe('NY');
  });

  it('getStoreInfo', () => {
    const state = {
      [STORE_LOCATOR_REDUCER_KEY]: storeLocatorState,
    };
    expect(getStoreInfo(state)).toBe(storeLocatorState);
  });

  it('getPageLabels', () => {
    const state = {
      Labels: {
        StoreLocator: {
          StoreLanding: {},
          StoreDetail: {},
          StoreList: {},
        },
      },
    };
    expect(getPageLabels(state)).toStrictEqual({});
  });

  it('getPageLabels', () => {
    const state = {
      Labels: {},
    };
    expect(getPageLabels(state)).toStrictEqual({});
  });
});
