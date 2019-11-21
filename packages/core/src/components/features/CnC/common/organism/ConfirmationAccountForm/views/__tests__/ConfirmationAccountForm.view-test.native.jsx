import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationCreateAccountFormVanilla as ConfirmationAccountForm } from '../ConfirmationAccountForm.view.native';

describe('ConfirmationAccountForm component', () => {
  let props = {};
  beforeEach(() => {
    props = {
      className: '',
      isPromptForUserDetails: false,
      emailAddress: 'test@childrensplace.com',
      userInformation: {
        firstName: 'Test',
        lastName: 'Test',
        zipCode: '12345',
        phoneNumber: '9898989898',
      },
      createAccountSuccess: null,
      createAccountError: '',
      labels: {
        lbl_createAccount_emailAddress: '',
        lbl_createAccount_password: '',
        lbl_createAccount_confirmPassword: '',
        lbl_createAccount_firstName: '',
        lbl_createAccount_lastName: '',
        lbl_createAccount_phoneNumber: '',
        lbl_createAccount_zipCode: '',
        lbl_createAccount_createAccount: '',
        lbl_createAccount_termsConditions: '',
        lbl_createAccount_termsConditions_1: '',
        lbl_createAccount_show: '',
        lbl_createAccount_hide: '',
        lbl_createAccount_heading: '',
      },
      passwordLabels: {},
      handleSubmit: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render component correctly', () => {
    const component = shallow(<ConfirmationAccountForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component correctly with success state', () => {
    props.createAccountSuccess = 'Account created successfully';
    const component = shallow(<ConfirmationAccountForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component correctly with error state', () => {
    props.createAccountError = 'error';
    const component = shallow(<ConfirmationAccountForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component correctly with isPromptForUserDetails state', () => {
    props.isPromptForUserDetails = true;
    const component = shallow(<ConfirmationAccountForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component correctly with isPromptForUserDetails state and without email', () => {
    props.isPromptForUserDetails = true;
    props.emailAddress = null;
    const component = shallow(<ConfirmationAccountForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
