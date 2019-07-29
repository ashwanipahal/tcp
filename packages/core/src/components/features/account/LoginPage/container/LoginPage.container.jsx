import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router'; // eslint-disable-line
import { login, resetLoginInfo } from './LoginPage.actions';
import labels from './LoginPage.labels';
import { getUserLoggedInState, getLoginError, shouldShowRecaptcha, getLoginErrorMessage } from './LoginPage.selectors';
import LoginView from '../views';

class LoginPageContainer extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { isUserLoggedIn } = this.props;
    if (!prevProps.isUserLoggedIn && isUserLoggedIn) {
      Router.push('/');
    }
  }

  componentWillUnmount() {
    const { resetLoginState } = this.props;
    resetLoginState();
  }

  render() {
    const { onSubmit, loginError, loginErrorMessage, showRecaptcha } = this.props;
    const errorMessage = loginError ? (loginErrorMessage || labels.ACC_LBL_LOGIN_ERROR) : '';
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
      />
    );
  }
}

LoginPageContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  resetLoginState: PropTypes.func,
  loginError: PropTypes.bool,
  loginErrorMessage: PropTypes.string,
  showRecaptcha: PropTypes.bool,
};

LoginPageContainer.defaultProps = {
  showRecaptcha: false,
  loginError: false,
  loginErrorMessage: '',
  resetLoginState: () => {}
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
    resetLoginState: () => {
      dispatch(resetLoginInfo());
    }
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
