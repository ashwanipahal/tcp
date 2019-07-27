export const getShowNotificationState = state => {
  return state.ForgotPasswordReducer.get('showNotification');
};

export const toggleSuccessfulEmailSection = state => {
  return state.ForgotPasswordReducer.get('toggleSuccessfulEmailSection');
};

export const showCheckEmailSectionState = state => {
  return state.ForgotPasswordReducer.get('showCheckEmailSection');
};

export const getResetEmailResponse = state => {
  return state.ForgotPasswordReducer;
};
