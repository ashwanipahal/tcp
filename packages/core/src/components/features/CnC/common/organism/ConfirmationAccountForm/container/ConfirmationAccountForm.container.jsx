import React from 'react';
import { connect } from 'react-redux';

import { createAccount } from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.actions';
import ConfirmationAccountForm from '../views';
import confirmationSelectors from '../../../../Confirmation/container/Confirmation.selectors';
import confirmationAccountSelectors from './ConfirmationAccountForm.selectors';

export const ConfirmationAccountFormContainer = props => {
  return <ConfirmationAccountForm {...props} />;
};

export const mapDispatchToProps = dispatch => {
  return {
    createAccountSubmit: payload => {
      dispatch(createAccount(payload));
    },
  };
};

const mapStateToProps = state => {
  const userInformation = confirmationSelectors.getInitialCreateAccountValues(state);
  return {
    className: 'confirmation-create-account',
    isPromptForUserDetails: !userInformation || !userInformation.firstName,
    emailAddress: userInformation && userInformation.emailAddress,
    initialValues: {
      ...userInformation,
    },
    userInformation,
    labels: confirmationAccountSelectors.getCreateAccountLabels(state),
    createAccountSuccess: confirmationAccountSelectors.getCreateAccountSuccess(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationAccountFormContainer);
