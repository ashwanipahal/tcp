import { fromJS } from 'immutable';

import { getShowNotificationState, getResetEmailResponse } from '../ForgotPassword.selectors';

describe('#ForgotPassword selector', () => {
  const ForgotPasswordState = fromJS({
    showNotification: false,
  });

  const state = {
    ForgotPasswordReducer: ForgotPasswordState,
  };

  it('#ForgotPasswordState should return getShowNotificationState state', () => {
    expect(getShowNotificationState(state)).toEqual(ForgotPasswordState.get('showNotification'));
  });

  expect(getResetEmailResponse(state)).toEqual(ForgotPasswordState);
});
