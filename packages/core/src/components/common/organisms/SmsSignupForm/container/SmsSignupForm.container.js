import { connect } from 'react-redux';
import { validatePhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import { trackPageView, setClickAnalyticsData } from '@tcp/core/src/analytics/actions';

import { submitSmsSignup, clearSmsSignupForm } from './SmsSignupForm.actions';
import SmsSignupFormView from '../views/SmsSignupForm';

export const mapDispatchToProps = dispatch => {
  return {
    submitSmsSubscription: payload => {
      dispatch(submitSmsSignup(payload));
    },
    clearSmsSignupForm: () => {
      dispatch(clearSmsSignupForm());
    },
    validateSignupSmsPhoneNumber: phoneNumber => {
      return validatePhoneNumber(phoneNumber) ? Promise.resolve({}) : Promise.reject();
    },

    trackSubscriptionSuccess: () => {
      dispatch(
        setClickAnalyticsData({
          customEvents: ['event107', 'event80'],
          pageName: 'content:email confirmation',
          pageShortName: 'content:sms confirmation',
          pageSection: 'content',
          pageSubSection: 'content',
          pageType: 'content',
          pageTertiarySection: 'content',
        })
      );

      dispatch(trackPageView({}));
      setTimeout(() => {
        dispatch(setClickAnalyticsData({}));
      }, 200);
    },
  };
};

const mapStateToProps = (state, props) => {
  const { SmsSignupFormReducer: { subscription } = {} } = state.SmsSignUp;
  const { mediaWrapper } = props;
  return {
    formViewConfig: state.Labels.global.smsSignup,
    subscription,
    ...props,
    noModal: true,
    imageData: mediaWrapper && mediaWrapper.length > 0 ? mediaWrapper[0] : {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmsSignupFormView);
