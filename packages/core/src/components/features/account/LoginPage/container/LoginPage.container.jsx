/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { login, getUserInfo } from './LoginPage.actions';
import {
  resetPassword,
  resetLoginForgotPasswordState,
} from '../../ForgotPassword/container/ForgotPassword.actions';
import labels from '../../ForgotPassword/container/ForgotPassword.labels';
import {
  getShowNotificationState,
  getResetEmailResponse,
  toggleSuccessfulEmailSection,
} from '../../ForgotPassword/container/ForgotPassword.selectors';
import LoginView from '../views';

// @flow

type Props = {
  onSubmit: (SyntheticEvent<>, Object) => void,
  loginInfo: Object,
  getUserInfoAction: void,
  onSubmitForgot: any,
  showNotification: any,
  resetResponse: any,
  resetLoginState: any,
  successFullResetEmail: any,
};
export class LoginPageContainer extends React.PureComponent<Props> {
  render() {
    const {
      onSubmit,
      loginInfo,
      getUserInfoAction,
      onSubmitForgot,
      showNotification,
      resetResponse,
      resetLoginState,
      successFullResetEmail,
    } = this.props;
    return (
      <LoginView
        onSubmitForgot={onSubmitForgot}
        onSubmit={onSubmit}
        loginInfo={loginInfo}
        getUserInfo={getUserInfoAction}
        showNotification={showNotification}
        resetResponse={resetResponse}
        labels={labels}
        resetLoginState={resetLoginState}
        successFullResetEmail={successFullResetEmail}
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
    resetLoginState: payload => {
      dispatch(resetLoginForgotPasswordState(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    loginInfo: state.LoginPageReducer.loginInfo,
    showNotification: getShowNotificationState(state),
    resetResponse: getResetEmailResponse(state),
    successFullResetEmail: toggleSuccessfulEmailSection(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
