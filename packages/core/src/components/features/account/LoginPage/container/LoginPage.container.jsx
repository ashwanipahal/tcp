/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { login, getUserInfo } from './LoginPage.actions';
import LoginView from '../views/LoginPage.view';
// @flow
type Props = {
  onSubmit: (SyntheticEvent<>, Object) => void,
  loginInfo: Object,
  getUserInfoAction: void,
};

const LoginPageContainer = ({ onSubmit, loginInfo, getUserInfoAction }: Props) => (
  <LoginView onSubmit={onSubmit} loginInfo={loginInfo} getUserInfo={getUserInfoAction} />
);

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
    getUserInfoAction: () => {
      dispatch(getUserInfo());
    },
  };
}

function mapStateToProps(state) {
  return {
    loginInfo: state.LoginPageReducer.loginInfo,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
