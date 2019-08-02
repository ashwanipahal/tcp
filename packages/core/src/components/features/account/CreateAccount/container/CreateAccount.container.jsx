import React from 'react';
import { connect } from 'react-redux';
import CreateAccountView from '../views/CreateAccount.view';
import { createAccount } from './CreateAccount.actions';
import {
  getIAgree,
  getHideShowPwd,
  getConfirmHideShowPwd,
  getError,
  getLabels,
} from './CreateAccount.selectors';

// @flow
type Props = {
  className: string,
  createAccountAction: Function,
  isIAgreeChecked: string,
  hideShowPwd: string,
  confirmHideShowPwd: string,
  error: any,
  labels: object,
};

export const CreateAccountContainer = ({
  className,
  createAccountAction,
  isIAgreeChecked,
  hideShowPwd,
  confirmHideShowPwd,
  error,
  labels,
}: Props) => {
  return (
    <CreateAccountView
      className={className}
      createAccountAction={createAccountAction}
      labels={labels}
      isIAgreeChecked={isIAgreeChecked}
      hideShowPwd={hideShowPwd}
      confirmHideShowPwd={confirmHideShowPwd}
      error={error}
    />
  );
};

export const mapStateToProps = state => {
  return {
    isIAgreeChecked: getIAgree(state),
    hideShowPwd: getHideShowPwd(state),
    confirmHideShowPwd: getConfirmHideShowPwd(state),
    error: getError(state),
    labels: getLabels(state),
  };
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    createAccountAction: payload => {
      dispatch(createAccount(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountContainer);
