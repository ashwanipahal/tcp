import { fromJS } from 'immutable';
import confirmationAccountSelectors from '../ConfirmationAccountForm.selectors';

describe('#ConfirmationAccountForm selectors', () => {
  const {
    getCreateAccountLabels,
    getCreateAccountSuccess,
    getPasswordLabels,
  } = confirmationAccountSelectors;

  const state = {
    Labels: {
      global: {
        registration: {
          lbl_createAccount_emailAddress: 'Email Address',
          lbl_createAccount_password: 'Password',
        },
        password: {
          lbl_PasswordRule: 'PasswordRules',
        },
      },
      checkout: {
        orderConfirmation: {
          lbl_createAccount_heading: 'heading',
        },
      },
    },
    Confirmation: fromJS({
      orderConfirmation: {
        createAccountSuccess: false,
      },
    }),
  };

  it('#getCreateAccountLabels should return create account labels', () => {
    const labels = getCreateAccountLabels(state);
    expect(labels.lbl_createAccount_emailAddress).toBe('Email Address');
    expect(labels.lbl_createAccount_password).toBe('Password');
    expect(labels.lbl_createAccount_heading).toBe('heading');
  });

  it('#getPasswordLabels should return password rules', () => {
    expect(getPasswordLabels(state).lbl_PasswordRule).toBe('PasswordRules');
  });

  it('#getCreateAccountSuccess should return to be false', () => {
    expect(getCreateAccountSuccess(state)).toBeFalsy();
  });
});
