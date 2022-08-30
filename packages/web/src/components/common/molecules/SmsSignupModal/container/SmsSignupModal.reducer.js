import SMS_SIGNUP_CONSTANTS from './SmsSignupModal.constants';

const SmsSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case SMS_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_MODAL_TOGGLE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default SmsSignupReducer;
