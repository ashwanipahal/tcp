/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { login, getUserInfo } from './LoginPage.actions';
import resetPassword from '../../ForgotPassword/container/ForgotPassword.actions';
import LoginView from '../views/LoginPage.view';

// @flow

type Props = {
  onSubmit: (SyntheticEvent<>, Object) => void,
  loginInfo: Object,
  getUserInfoAction: void,
  onSubmitForgot: any,
};
export class LoginPageContainer extends React.PureComponent<Props> {
  render() {
    const { onSubmit, loginInfo, getUserInfoAction, onSubmitForgot } = this.props;
    return (
      <LoginView
        onSubmitForgot={onSubmitForgot}
        onSubmit={onSubmit}
        loginInfo={loginInfo}
        getUserInfo={getUserInfoAction}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
    getUserInfoAction: () => {
      dispatch(getUserInfo());
    },
    onSubmitForgot: payload => {
      dispatch(resetPassword(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    loginInfo: state.LoginPageReducer.loginInfo,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
