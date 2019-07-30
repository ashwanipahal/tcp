import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  resetPassword,
  resetLoginForgotPasswordState,
} from '../../ForgotPassword/container/ForgotPassword.actions';
import {
  getShowNotificationState,
  getResetEmailResponse,
  toggleSuccessfulEmailSection,
} from '../../ForgotPassword/container/ForgotPassword.selectors';
import Router from 'next/router'; // eslint-disable-line
import { login, resetLoginInfo } from './LoginPage.actions';
import { closeOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';
import labels from './LoginPage.labels';
import {
  getUserLoggedInState,
  getLoginError,
  shouldShowRecaptcha,
  getLoginErrorMessage,
} from './LoginPage.selectors';
import LoginView from '../views';

class LoginPageContainer extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { isUserLoggedIn, closeOverlay } = this.props;
    if (!prevProps.isUserLoggedIn && isUserLoggedIn) {
      closeOverlay();
    }
  }

  componentWillUnmount() {
    const { resetLoginState, loginError } = this.props;
    if (loginError) {
      resetLoginState();
    }
  }

  render() {
    const {
      onSubmit,
      loginError,
      loginErrorMessage,
      showRecaptcha,
      resetResponse,
      resetForm,
      resetLoginState,
      getUserInfoAction,
      onSubmitForgot,
      showNotification,
      successFullResetEmail,
    } = this.props;
    const errorMessage = loginError ? loginErrorMessage || labels.ACC_LBL_LOGIN_ERROR : '';
    const initialValues = {
      rememberMe: true,
      savePlcc: true,
    };
    return (
      <LoginView
        onSubmit={onSubmit}
        labels={labels}
        loginErrorMessage={errorMessage}
        initialValues={initialValues}
        showRecaptcha={showRecaptcha}
        resetLoginState={resetLoginState}
        resetResponse={resetResponse}
        resetForm={resetForm}
        onSubmitForgot={onSubmitForgot}
        getUserInfo={getUserInfoAction}
        showNotification={showNotification}
        successFullResetEmail={successFullResetEmail}
      />
    );
  }
}

LoginPageContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  resetLoginState: PropTypes.func,
  closeOverlay: PropTypes.func,
  loginError: PropTypes.bool,
  loginErrorMessage: PropTypes.string,
  showRecaptcha: PropTypes.bool,
};

LoginPageContainer.defaultProps = {
  showRecaptcha: false,
  loginError: false,
  loginErrorMessage: '',
  resetLoginState: () => {},
  closeOverlay: () => {},
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
    resetLoginState: () => {
      dispatch(resetLoginInfo());
    },
    onSubmitForgot: payload => {
      dispatch(resetPassword(payload));
    },
    resetForm: payload => {
      dispatch(resetLoginForgotPasswordState(payload));
    },
    closeOverlay: () => {
      dispatch(closeOverlayModal());
    },
  };
};

const mapStateToProps = state => {
  return {
    showNotification: getShowNotificationState(state),
    resetResponse: getResetEmailResponse(state),
    successFullResetEmail: toggleSuccessfulEmailSection(state),
    isUserLoggedIn: getUserLoggedInState(state),
    loginError: getLoginError(state),
    loginErrorMessage: getLoginErrorMessage(state),
    showRecaptcha: shouldShowRecaptcha(state),
  };
};

LoginPageContainer.defaultProps = {
  showRecaptcha: false,
  loginError: false,
  loginErrorMessage: '',
  resetLoginState: () => {},
  closeOverlay: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
