import { connect } from 'react-redux';

import {
  submitSmsSignup,
  clearSmsSignupForm,
  toggleSmsSignupModal,
} from './SmsSignupModal.actions';
import SignupModalView from '../views/SmsSignupModal.view';

/* export const EmailSignupWrapperContainer = ({
  buttonConfig,
  formViewConfig,
  isSubscriptionValid,
  clearFormStoreInfo,
  submitSmsSubscription,
  isModalOpen,
}) => {
  return (
    <SignupModalView
      isModalOpen={isModalOpen}
      buttonConfig={buttonConfig}
      formViewConfig={formViewConfig}
      isSubscriptionValid={isSubscriptionValid}
      clearSmsSignupForm={clearFormStoreInfo}
      submitSmsSubscription={submitSmsSubscription}
    />
  );
};

EmailSignupWrapperContainer.propTypes = {
  buttonConfig: PropTypes.shape({}),
  formViewConfig: PropTypes.shape({}),
  isSubscriptionValid: PropTypes.string,
  clearFormStoreInfo: PropTypes.func,
  submitSmsSubscription: PropTypes.func.isRequired,
};

EmailSignupWrapperContainer.defaultProps = {
  buttonConfig: {},
  formViewConfig: {},
  isSubscriptionValid: '',
  clearFormStoreInfo: () => {},
}; */

export const mapDispatchToProps = dispatch => {
  return {
    submitSmsSubscription: payload => {
      dispatch(submitSmsSignup(payload));
    },
    clearFormStoreInfo: () => {
      dispatch(clearSmsSignupForm());
    },
    closeModal: () => {
      dispatch(toggleSmsSignupModal({ isModalOpen: false }));
    },
  };
};

const mapStateToProps = (state, props) => {
  let formViewConfig = {};
  if (props.buttonConfig.url === '/SMS_SIGNUP_MODAL') {
    formViewConfig = {
      ...state.Labels.global.smsSignup,
    };
  }
  const { SmsSignUp = {} } = state;
  console.log('State: ', SmsSignUp);
  return {
    formViewConfig,
    isModalOpen: SmsSignUp.isModalOpen,
    isSubscriptionValid: SmsSignUp.signupSuccess,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModalView);
