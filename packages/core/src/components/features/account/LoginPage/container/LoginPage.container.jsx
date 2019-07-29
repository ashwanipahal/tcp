import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router'; // eslint-disable-line
import { login } from './LoginPage.actions';
import labels from './LoginPage.labels';
import { getUserLoggedInState, getLoginError } from './LoginPage.selectors';
import LoginView from '../views';

class LoginPageContainer extends React.PureComponent {
  componentDidUpdate(prevProps){
    const { isUserLoggedIn } = this.props;
    if(!prevProps.isUserLoggedIn && isUserLoggedIn) {
      Router.push('/');
    }
  }

  render() {
    const { onSubmit, loginError } = this.props;
    const initialValues = {
      rememberMe: true,
      savePlcc: true,
    };
    return <LoginView onSubmit={onSubmit} labels={labels} loginErrorMessage={loginError ? labels.ACC_LBL_LOGIN_ERROR : ''} initialValues={initialValues} />;
  }
}

LoginPageContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  loginError: PropTypes.bool.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    isUserLoggedIn: getUserLoggedInState(state),
    loginError: getLoginError(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
