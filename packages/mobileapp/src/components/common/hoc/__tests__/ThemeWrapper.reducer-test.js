import { fromJS } from 'immutable';
import MobileAppReducer from '../ThemeWrapper.reducer';

describe('MobileAppReducer reducer', () => {
  const initialState = { APP_TYPE: 'tcp' };
  it('should handle success addAddressSuccess', () => {
    expect(
      MobileAppReducer(initialState, {
        type: 'updateAppType',
        payload: 'tcp',
      })
    ).toEqual(
      fromJS({
        APP_TYPE: 'tcp',
      })
    );
  });
});
