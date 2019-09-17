import { fromJS } from 'immutable';
import { getCurrentCountry } from '../StoreLocator.selectors';
import { SESSIONCONFIG_REDUCER_KEY } from '../../../../../constants/reducer.constants';

describe('selectors', () => {
  test('getCurrentCountry', () => {
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
});
