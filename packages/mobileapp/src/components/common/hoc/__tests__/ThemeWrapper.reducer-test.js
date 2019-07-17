import MobileAppReducer from '../ThemeWrapper.reducer';
import { UPDATE_APP_TYPE } from '../ThemeWrapper.constrants';

describe('MobileAppReducer reducer', () => {
  it('should handle success addAddressSuccess', () => {
    const initialState = { APP_TYPE: '' };
    const actions = {
      type: UPDATE_APP_TYPE,
      payload: 'tcp',
    };
    const result = {
      APP_TYPE: 'tcp',
    };
    const ThemeWrapperReducer = MobileAppReducer(initialState, actions);
    expect(ThemeWrapperReducer).toEqual(result);
  });
});
