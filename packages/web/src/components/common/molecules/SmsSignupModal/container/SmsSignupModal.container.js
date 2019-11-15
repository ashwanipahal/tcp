import { connect } from 'react-redux';
import { validatePhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import { trackPageView, setClickAnalyticsData } from '@tcp/core/src/analytics/actions';

import {
  submitSmsSignup,
  clearSmsSignupForm,
  toggleSmsSignupModal,
} from './SmsSignupModal.actions';
import SignupModalView from '../views/SmsSignupModal.view';

export const mapDispatchToProps = dispatch => {
  return {
    submitSmsSubscription: payload => {
      dispatch(submitSmsSignup(payload));
    },
    clearSmsSignupForm: () => {
      dispatch(clearSmsSignupForm());
    },
    closeModal: () => {
      dispatch(toggleSmsSignupModal({ isModalOpen: false }));
    },
    validateSignupSmsPhoneNumber: phoneNumber => {
      return validatePhoneNumber(phoneNumber) ? Promise.resolve({}) : Promise.reject();
    },
    trackSubscriptionSuccess: () => {
      dispatch(
        setClickAnalyticsData({
          customEvents: ['event107', 'event80'],
        })
      );

      dispatch(
        trackPageView({
          props: {
            initialProps: {
              pageProps: {
                pageData: {
                  pageName: 'content:email confirmation',
                  pageShortName: 'content:sms confirmation',
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
  if (props.buttonConfig && props.buttonConfig.link.action === 'open_sms_modal') {
    formViewConfig = {
      ...state.Labels.global.smsSignup,
    };
  }

  const { SmsSignUp: { isModalOpen, subscription } = {} } = state;
  return {
    formViewConfig,
    isModalOpen,
    subscription,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModalView);
