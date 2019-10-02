import React from 'react';
import { connect } from 'react-redux';

import {
  createAccount,
  resetCreateAccountErr,
} from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.actions';
import { getErrorMessage } from '@tcp/core/src/components/features/account/CreateAccount/container/CreateAccount.selectors';
import ConfirmationAccountForm from '../views';
import confirmationSelectors from '../../../../Confirmation/container/Confirmation.selectors';
import confirmationAccountSelectors from './ConfirmationAccountForm.selectors';

/**
 * @function ConfirmationAccountFormContainer
 * @param {Object} props
 * @return {JSX} Render Container
 */
export const ConfirmationAccountFormContainer = props => {
  return <ConfirmationAccountForm {...props} />;
};

/* istanbul ignore next */
export const mapDispatchToProps = dispatch => {
  return {
    createAccountSubmit: payload => {
      dispatch(createAccount(payload));
    },
    resetAccountErrorState: () => {
      dispatch(resetCreateAccountErr());
    },
  };
};

/* istanbul ignore next */
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
    passwordLabels: confirmationAccountSelectors.getPasswordLabels(state),
    createAccountSuccess: confirmationAccountSelectors.getCreateAccountSuccess(state),
    createAccountError: getErrorMessage(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationAccountFormContainer);
