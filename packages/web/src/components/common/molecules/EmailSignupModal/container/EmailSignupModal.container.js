import { connect } from 'react-redux';

import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';
import { trackPageView, setClickAnalyticsData } from '@tcp/core/src/analytics/actions';
import {
  submitEmailSignup,
  validateEmail,
  clearEmailSignupForm,
} from '@tcp/core/src/components/common/organisms/EmailSignupForm/container/EmailSignupForm.actions';
import { toggleEmailSignupModal } from './EmailSignupModal.actions';
import SignupModalView from '../views/EmailSignupModal.view';

export const mapDispatchToProps = dispatch => {
  return {
    verifyEmailAddress: payload => {
      dispatch(validateEmail(payload));
    },
    submitEmailSubscription: payload => {
      dispatch(submitEmailSignup(payload));
    },
    clearEmailSignupForm: () => {
      dispatch(clearEmailSignupForm());
    },
    closeModal: () => {
      dispatch(toggleEmailSignupModal({ isModalOpen: false }));
    },
    validateSignupEmail: email => {
      return emailSignupAbstractor.verifyEmail(email);
    },
    trackSubscriptionSuccess: () => {
      dispatch(
        setClickAnalyticsData({
          customEvents: ['event15', 'event80'],
          pageName: 'content:email confirmation',
          pageShortName: 'content:email confirmation',
        })
      );

      dispatch(trackPageView());
    },
  };
};

const mapStateToProps = (state, props) => {
  let formViewConfig = {};
  if (props.buttonConfig && props.buttonConfig.link.action === 'open_signup_modal') {
    formViewConfig = {
      ...state.Labels.global.emailSignup,
    };
  }
  const {
    EmailSignupModalReducer: { isModalOpen } = {},
    EmailSignupFormReducer: { subscription, isEmailValid } = {},
  } = state.EmailSignUp;
  return {
    formViewConfig,
    subscription,
    isEmailValid,
    isModalOpen,
    ...props,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModalView);
