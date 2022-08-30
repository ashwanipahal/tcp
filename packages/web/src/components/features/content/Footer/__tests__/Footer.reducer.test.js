import { fromJS } from 'immutable';
import FOOTER_CONSTANTS from '@tcp/core/src/components/common/organisms/Footer/container/Footer.constants';
import FooterReducer from '@tcp/core/src/components/common/organisms/Footer/container/Footer.reducer';

describe('Footer Reducer', () => {
  let state = '';
  beforeEach(() => {
    state = fromJS({});
  });
  test('should return intial state', () => {
    state = FooterReducer(undefined, { type: 'DEFAULT_STATE' });
    expect(state).toBeDefined();
  });
  test('should load Footer data', () => {
    const action = {
      type: FOOTER_CONSTANTS.LOAD_FOOTER_DATA,
      data: 'Footer data',
    };
    const newState = state.set('data', fromJS(action));
    expect(newState.get('data')).toEqual(fromJS(action));
  });
});
