import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPassword, resetLoginForgotPasswordState } from './ForgotPassword.actions';
import {
  getShowNotificationState,
  getResetEmailResponse,
  toggleSuccessfulEmailSection,
} from './ForgotPassword.selectors';
import { resetUserInfo } from '../../User/container/User.actions';
import {
  closeOverlayModal,
  openOverlayModal,
} from '../../../OverlayModal/container/OverlayModal.actions';
import {
  getLoginError,
  shouldShowRecaptcha,
  getLoginErrorMessage,
} from '../../LoginPage/container/LoginPage.selectors';
import { getUserLoggedInState } from '../../User/container/User.selectors';
import ForgotPasswordView from '../views/ForgotPassword.view';

import { getFormValidationErrorMessages } from '../../Account/container/Account.selectors';

class ForgotPasswordContainer extends React.PureComponent {
  render() {
    const {
      resetForgotPasswordErrorResponse,
      resetForm,
      SubmitForgot,
      showNotification,
      successFullResetEmail,
      resetLoginState,
      showForgotPasswordForm,
      labels,
      showLogin,
      formErrorMessage,
    } = this.props;
    const initialValues = {
      rememberMe: true,
      savePlcc: true,
    };
    return (
      <ForgotPasswordView
        showForgotPasswordForm={showForgotPasswordForm}
        labels={labels}
        initialValues={initialValues}
        resetForgotPasswordErrorResponse={resetForgotPasswordErrorResponse}
        resetForm={resetForm}
        SubmitForgot={SubmitForgot}
        showNotification={showNotification}
        successFullResetEmail={successFullResetEmail}
        resetLoginState={resetLoginState}
        showLogin={showLogin}
        formErrorMessage={formErrorMessage}
      />
    );
  }
}

ForgotPasswordContainer.propTypes = {
  resetLoginState: PropTypes.string,
  resetForgotPasswordErrorResponse: PropTypes.bool.isRequired,
  resetForm: PropTypes.bool.isRequired,
  SubmitForgot: PropTypes.bool.isRequired,
  showNotification: PropTypes.bool.isRequired,
  successFullResetEmail: PropTypes.bool.isRequired,
  showForgotPasswordForm: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}).isRequired,
  showLogin: PropTypes.func,
  formErrorMessage: PropTypes.shape({}).isRequired,
};

ForgotPasswordContainer.defaultProps = {
  resetLoginState: () => {},
  showLogin: () => {},
};

const mapDispatchToProps = dispatch => {
  return {
    resetLoginState: () => {
      dispatch(resetUserInfo());
    },
    SubmitForgot: payload => {
      dispatch(resetPassword(payload));
    },
    resetForm: payload => {
      dispatch(resetLoginForgotPasswordState(payload));
    },
    closeOverlay: () => {
      dispatch(closeOverlayModal());
    },
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    showNotification: getShowNotificationState(state),
    resetForgotPasswordErrorResponse: getResetEmailResponse(state),
    successFullResetEmail: toggleSuccessfulEmailSection(state),
    isUserLoggedIn: getUserLoggedInState(state),
    loginError: getLoginError(state),
    loginErrorMessage: getLoginErrorMessage(state),
    showRecaptcha: shouldShowRecaptcha(state),
    formErrorMessage: getFormValidationErrorMessages(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordContainer);
