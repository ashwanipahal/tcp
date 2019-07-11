// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  submitEmailSignup,
  validateEmail,
  submitSmsSignup,
  clearForm,
} from './SignupModal.actions';
import SignupModalView from '../views/SignupModal.view';

type Props = {
  verifyEmailAddress: any,
};

export const EmailSignupWrapperContainer = ({
  verifyEmailAddress,
  buttonConfig,
  submitEmailSubscription,
  formViewConfig,
  isEmailSubscriptionValid,
  clearFormStoreInfo,
  subscriptionType,
  submitSmsSubscription,
}: Props) => {
  return (
    <SignupModalView
      buttonConfig={buttonConfig}
      formViewConfig={formViewConfig}
      verifyEmailAddress={verifyEmailAddress}
      submitEmailSubscription={submitEmailSubscription}
      isEmailSubscriptionValid={isEmailSubscriptionValid}
      clearForm={clearFormStoreInfo}
      submitSmsSubscription={submitSmsSubscription}
      subscriptionType={subscriptionType}
    />
  );
};

EmailSignupWrapperContainer.propTypes = {
  verifyEmailAddress: PropTypes.func,
  submitEmailSubscription: PropTypes.func,
  buttonConfig: PropTypes.shape({}),
  formViewConfig: PropTypes.shape({}),
  isEmailSubscriptionValid: PropTypes.bool,
  clearFormStoreInfo: PropTypes.func,
  subscriptionType: PropTypes.string.isRequired,
  submitSmsSubscription: PropTypes.func,
};

EmailSignupWrapperContainer.defaultProps = {
  buttonConfig: {},
  formViewConfig: {},
  verifyEmailAddress: () => {},
  submitEmailSubscription: () => {},
  isEmailSubscriptionValid: false,
  clearFormStoreInfo: () => {},
  submitSmsSubscription: () => {},
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    verifyEmailAddress: payload => {
      console.log('verifyEmailAddress');
      dispatch(validateEmail(payload));
    },
    submitEmailSubscription: payload => {
      console.log('signup email func');
      dispatch(submitEmailSignup(payload));
    },
    submitSmsSubscription: payload => {
      console.log('signup sms func');
      dispatch(submitSmsSignup(payload));
    },
    clearFormStoreInfo: () => {
      console.log('clearForm');
      dispatch(clearForm());
    },
  };
};

const mapStateToProps = (state, props) => {
  let formViewConfig = {};
  let subscriptionType;
  if (props.buttonConfig.url === '/EMAIL_SIGNUP_MODAL') {
    formViewConfig = {
      imageSrc:
        'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562398149/Test/sign-up-thank-you_1_nhhhwh.png',
      imageAlt: 'Email Image Alt text',
      ...state.labels.global.subscribeEmail,
    };
    subscriptionType = 'email';
  }
  if (props.buttonConfig.url === '/SMS_SIGNUP_MODAL') {
    formViewConfig = {
      imageSrc:
        'https://res.cloudinary.com/tcp-dam-test/image/upload/w_378/v1562359106/Test/signup-offer-image_1_qib7ug.png',
      imageAlt: 'SMS Image Alt text',
      ...state.labels.global.subscribeSms,
    };
    subscriptionType = 'sms';
  }
  return {
    subscriptionType,
    formViewConfig,
    isEmailSubscriptionValid: (state.SignUp && state.SignUp.signupSuccess) || false,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignupWrapperContainer);
