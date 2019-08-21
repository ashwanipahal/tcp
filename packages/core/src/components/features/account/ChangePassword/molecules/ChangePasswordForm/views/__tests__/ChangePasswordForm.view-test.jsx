import React from 'react';
import { shallow } from 'enzyme';
import { ChangePasswordForm } from '../ChangePasswordForm.view';

describe('ChangePasswordForm component', () => {
  it('should renders correctly in initial state', () => {
    const props = {
      labels: {},
      pristine: false,
      successMessage: '',
      errorMessage: '',
    };
    const component = shallow(<ChangePasswordForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with success and error', () => {
    const props = {
      labels: {},
      pristine: false,
      successMessage: 'success',
      errorMessage: 'error',
    };
    const component = shallow(<ChangePasswordForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
