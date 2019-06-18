/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { login, getUserInfo as getUserInfoAction } from './LoginPage.actions';
import LoginView from '../views/LoginPage.view';

const LoginPageContainer = ({ onSubmit, loginInfo, getUserInfo }) => (
  <LoginView onSubmit={onSubmit} loginInfo={loginInfo} getUserInfo={getUserInfo} />
);

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
    getUserInfo: () => {
      dispatch(getUserInfoAction());
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
