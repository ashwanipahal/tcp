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
import { login, resetLoginInfo } from './LoginPage.actions';
import {
  closeOverlayModal,
  openOverlayModal,
} from '../../../OverlayModal/container/OverlayModal.actions';
import {
  getUserLoggedInState,
  getLoginError,
  shouldShowRecaptcha,
  getLoginErrorMessage,
  getLabels,
} from './LoginPage.selectors';
import LoginView from '../views';

// eslint-disable-next-line
import { isMobileApp, navigateToNestedRoute } from '../../../../../utils';

class LoginPageContainer extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { isUserLoggedIn, closeOverlay } = this.props;
    if (!prevProps.isUserLoggedIn && isUserLoggedIn) {
      if (isMobileApp()) {
        const { navigation } = this.props;
        navigateToNestedRoute(navigation, 'HomeStack', 'home');
      } else {
        closeOverlay();
      }
    }
  }

  componentWillUnmount() {
    const { resetLoginState, loginError } = this.props;
    if (loginError) {
      resetLoginState();
    }
  }

  onCreateAccountClick = () => {
    const { openOverlay } = this.props;
    openOverlay({
      component: 'createAccount',
      variation: 'primary',
    });
  };

  render() {
    const {
      onSubmit,
      loginError,
      loginErrorMessage,
      showRecaptcha,
      resetForm,
      getUserInfoAction,
      labels,
      resetLoginState,
      SubmitForgot,
      showNotification,
      successFullResetEmail,
      currentForm,
      queryParams,
    } = this.props;
    const errorMessage = loginError ? loginErrorMessage || labels.login.lbl_login_error : '';
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
        resetForm={resetForm}
        getUserInfo={getUserInfoAction}
        onCreateAccountClick={this.onCreateAccountClick}
        resetLoginState={resetLoginState}
        SubmitForgot={SubmitForgot}
        showNotification={showNotification}
        successFullResetEmail={successFullResetEmail}
        currentForm={currentForm}
        queryParams={queryParams}
      />
    );
  }
}

LoginPageContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  resetLoginState: PropTypes.func,
  isUserLoggedIn: PropTypes.bool,
  closeOverlay: PropTypes.func,
  loginError: PropTypes.bool,
  loginErrorMessage: PropTypes.string,
  showRecaptcha: PropTypes.bool,
  resetForm: PropTypes.bool.isRequired,
  getUserInfoAction: PropTypes.bool.isRequired,
  openOverlay: PropTypes.func,
  navigation: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  SubmitForgot: PropTypes.bool.isRequired,
  showNotification: PropTypes.bool.isRequired,
  successFullResetEmail: PropTypes.bool.isRequired,
  currentForm: PropTypes.string,
  queryParams: PropTypes.shape({}),
};

LoginPageContainer.defaultProps = {
  showRecaptcha: false,
  loginError: false,
  loginErrorMessage: '',
  resetLoginState: () => {},
  closeOverlay: () => {},
  openOverlay: () => {},
  isUserLoggedIn: false,
  navigation: {},
  currentForm: '',
  queryParams: {},
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
    resetForm: payload => {
      dispatch(resetLoginForgotPasswordState(payload));
    },
    resetLoginState: () => {
      dispatch(resetLoginInfo());
    },
    SubmitForgot: payload => {
      dispatch(resetPassword(payload));
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
    labels: getLabels(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
