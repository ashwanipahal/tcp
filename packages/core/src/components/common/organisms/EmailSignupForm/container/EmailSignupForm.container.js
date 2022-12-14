import { connect } from 'react-redux';

import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';
import { trackPageView, setClickAnalyticsData } from '@tcp/core/src/analytics/actions';

import { submitEmailSignup, validateEmail, clearEmailSignupForm } from './EmailSignupForm.actions';
import EmailSignupFormView from '../views/EmailSignupForm';

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
    validateSignupEmail: email => {
      return emailSignupAbstractor.verifyEmail(email);
    },
    trackSubscriptionSuccess: () => {
      dispatch(
        setClickAnalyticsData({
          customEvents: ['event15', 'event80'],
          pageName: 'content:email confirmation',
          pageShortName: 'content:email confirmation',
          pageSection: 'content',
          pageSubSection: 'content',
          pageType: 'content',
          pageTertiarySection: 'content',
        })
      );

      dispatch(trackPageView());
      setTimeout(() => {
        dispatch(setClickAnalyticsData({}));
      }, 200);
    },
  };
};

const mapStateToProps = (state, props) => {
  const { EmailSignupFormReducer: { subscription, isEmailValid } = {} } = state.EmailSignUp;
  const { mediaWrapper } = props;
  return {
    formViewConfig: state.Labels.global.emailSignup,
    subscription,
    isEmailValid,
    ...props,
    noModal: true,
    imageData: mediaWrapper && mediaWrapper.length > 0 ? mediaWrapper[0] : {},
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignupFormView);
