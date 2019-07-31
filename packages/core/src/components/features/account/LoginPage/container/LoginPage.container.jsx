import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, resetLoginInfo } from './LoginPage.actions';
import {
  closeOverlayModal,
  openOverlayModal,
} from '../../../OverlayModal/container/OverlayModal.actions';
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

  onCreateAccountClick = () => {
    const { openOverlay } = this.props;
    openOverlay({
      component: 'createAccount',
      variation: 'primary',
    });
  };

  render() {
    const { onSubmit, loginError, loginErrorMessage, showRecaptcha } = this.props;
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
        onCreateAccountClick={this.onCreateAccountClick}
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
  openOverlay: PropTypes.func,
};

LoginPageContainer.defaultProps = {
  showRecaptcha: false,
  loginError: false,
  loginErrorMessage: '',
  resetLoginState: () => {},
  closeOverlay: () => {},
  openOverlay: () => {},
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
    resetLoginState: () => {
      dispatch(resetLoginInfo());
    },
    closeOverlay: () => {
      dispatch(closeOverlayModal());
    },
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    isUserLoggedIn: getUserLoggedInState(state),
    loginError: getLoginError(state),
    loginErrorMessage: getLoginErrorMessage(state),
    showRecaptcha: shouldShowRecaptcha(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
