/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';

import ForgotPasswordView from '../ForgotPassword.view';

// const AddressValidationForm = ({ handleSubmit, pristine, reset, submitting }: Props): Node => (

describe('ForgotPasswordView component', () => {
  it('should renders correctly', () => {
    const props = {
      pristine: jest.fn(),
      className: '',
      onFormSubmit: jest.fn(),
      showNotification: true,
      showForgotPasswordForm: true,
      resetResponse: {},
      labels: {},
    };
    const component = shallow(<ForgotPasswordView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
