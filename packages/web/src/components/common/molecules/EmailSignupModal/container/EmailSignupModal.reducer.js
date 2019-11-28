import EMAIL_SIGNUP_CONSTANTS from './EmailSignupModal.constants';

const EmailSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_MODAL_TOGGLE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default EmailSignupReducer;
