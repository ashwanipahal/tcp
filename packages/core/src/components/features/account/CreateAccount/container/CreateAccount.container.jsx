import React from 'react';
import { connect } from 'react-redux';
import CreateAccountView from '../views/CreateAccount.view';
import createAccount from './CreateAccount.actions';
import labels from '../CreateAccount.labels';

// @flow
type Props = {
  className: string,
  createAccountAction: Function,
};

export const CreateAccountContainer = ({ className, createAccountAction }: Props) => {
  return (
    <CreateAccountView
      className={className}
      createAccountAction={createAccountAction}
      labels={labels}
    />
  );
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    createAccountAction: payload => {
      dispatch(createAccount(payload));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateAccountContainer);
