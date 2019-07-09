/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { connect } from 'react-redux';
import { login, getUserInfo, getOrderDetail } from './LoginPage.actions';
import LoginView from '../views/LoginPage.view';

// @flow

type Props = {
  onSubmit: (SyntheticEvent<>, Object) => void,
  loginInfo: Object,
  getUserInfoAction: void,
  getOrderDetailAction: void,
};

const LoginPageContainer = ({
  onSubmit,
  loginInfo,
  getUserInfoAction,
  getOrderDetailAction,
}: Props) => {
  const textInput = React.createRef();

  return (
    <div>
      <LoginView onSubmit={onSubmit} loginInfo={loginInfo} getUserInfo={getUserInfoAction} />
      <div>
        <button onClick={getUserInfoAction}>Get Registered User</button>
        <input type="text" name="orderId" ref={textInput} />
        <button onClick={() => getOrderDetailAction(textInput.current.value)}>
          Get Order Detail
        </button>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
    getUserInfoAction: () => {
      dispatch(getUserInfo());
    },
    getOrderDetailAction: inputText => {
      dispatch(getOrderDetail(inputText));
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
