import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationAccountFormContainer } from '../ConfirmationAccountForm.container';
import ConfirmationAccountForm from '../../views/ConfirmationAccountForm.view';

describe('ConfirmationAccountFormContainer', () => {
  const userInformation = {
    firstName: 'Test',
    lastName: 'Test',
  };
  const props = {
    className: 'confirmation-create-account',
    isPromptForUserDetails: false,
    emailAddress: 'test@childrensplace.com',
    initialValues: {
      ...userInformation,
    },
    userInformation,
    labels: {},
    passwordLabels: {},
    createAccountSuccess: false,
    createAccountError: false,
  };

  it('should not render AirmilesBanner view section in US site', () => {
    const tree = shallow(<ConfirmationAccountFormContainer {...props} />);
    expect(tree.is(ConfirmationAccountForm)).toBeTruthy();
  });
});
