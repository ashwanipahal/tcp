// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSignup, submitEmailSignup } from './SignupModal.actions';
import SignupModalView from '../views/SignupModal.view';

type Props = {
  verifyEmailAddress: any,
};

export const EmailSignupWrapperContainer = ({
  verifyEmailAddress,
  buttonConfig,
  richTextHtml,
  submitEmailSubscription,
}: Props) => {
  return (
    <SignupModalView buttonConfig={buttonConfig} />
    // <EmailSignupWrapper
    //   verifyEmailAddress={verifyEmailAddress}
    //   title={title}
    //   richTextHtml={richTextHtml}
    //   submitEmailSubscription={submitEmailSubscription}
    // />
  );
};

EmailSignupWrapperContainer.propTypes = {
  emailSignup: PropTypes.shape({}),
  verifyEmailAddress: PropTypes.func,
  submitEmailSubscription: PropTypes.func,
};

EmailSignupWrapperContainer.defaultProps = {
  emailSignup: {},
  verifyEmailAddress: () => {},
  submitEmailSubscription: () => {},
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    verifyEmailAddress: payload => {
      dispatch(addSignup(payload));
    },
    submitEmailSubscription: payload => {
      dispatch(submitEmailSignup(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    randomState: state,
    // isEmailModalOpen: state.signup.isEmailModalOpen,
    // isSmsModalOpen: state.signup.isSmsModalOpen,
    // isEmailValid: state.signup.isEmailValid,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignupWrapperContainer);
