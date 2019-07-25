import { fromJS } from 'immutable';
import { getAppType } from '../ThemeWrapper.selectors';
import { THEME_WRAPPER_REDUCER_KEY } from '../ThemeWrapper.constants';

describe('#getAppType selector', () => {
  let storeState;
  beforeEach(() => {
    const initialState = fromJS({
      APP_TYPE: '',
    });

    const state = initialState.set('APP_TYPE', 'tcp');
    storeState = {
      [THEME_WRAPPER_REDUCER_KEY]: state,
    };
  });
  it('#getAppType should return getAppType state', () => {
    expect(getAppType(storeState)).toEqual('tcp');
  });
});
