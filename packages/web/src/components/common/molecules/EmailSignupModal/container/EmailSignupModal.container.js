import { connect } from 'react-redux';

import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';
import { trackPageView, setClickAnalyticsData } from '@tcp/core/src/analytics/actions';

import {
  submitEmailSignup,
  validateEmail,
  clearEmailSignupForm,
  toggleEmailSignupModal,
} from './EmailSignupModal.actions';
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
        })
      );

      dispatch(
        trackPageView({
          props: {
            initialProps: {
              pageProps: {
                pageData: {
                  pageName: 'content:email confirmation',
                  pageShortName: 'content:email confirmation',
                },
              },
            },
          },
        })
      );
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
  const { EmailSignUp = {} } = state;
  return {
    formViewConfig,
    subscription: EmailSignUp.subscription,
    isEmailValid: EmailSignUp.isEmailValid,
    isModalOpen: EmailSignUp.isModalOpen,
    ...props,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModalView);
