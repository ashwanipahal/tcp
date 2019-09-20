import { fromJS } from 'immutable';
import { getCurrentCountry } from '../StoreLanding.selectors';
import { SESSIONCONFIG_REDUCER_KEY } from '../../../../../../constants/reducer.constants';

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
});
