export const getShowNotificationState = state => {
  return state.ForgotPasswordReducer.get('showNotification');
};

export const getResetEmailResponse = state => {
  return state.ForgotPasswordReducer;
};
