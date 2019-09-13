import { fromJS } from 'immutable';

import {
  getResetEmailResponse,
  toggleSuccessfulEmailSection,
  getShowNotificationState,
  showCheckEmailSectionState,
} from '../ForgotPassword.selectors';

describe('#ForgotPassword selector', () => {
  const ForgotPasswordState = fromJS({
    showNotification: false,
  });

  const state = {
    ForgotPasswordReducer: ForgotPasswordState,
  };

  it('#showNotification should return getShowNotificationState state', () => {
    expect(getShowNotificationState(state)).toEqual(ForgotPasswordState.get('showNotification'));
  });

  it('#toggleSuccessfulEmailSection should return getShowNotificationState state', () => {
    expect(toggleSuccessfulEmailSection(state)).toEqual(
      ForgotPasswordState.get('toggleSuccessfulEmailSection')
    );
  });

  it('#ForgotPasswordState should return getShowNotificationState state', () => {
    expect(showCheckEmailSectionState(state)).toEqual(
      ForgotPasswordState.get('showCheckEmailSectionState')
    );
  });
  expect(getResetEmailResponse(state)).toEqual(ForgotPasswordState);
});
