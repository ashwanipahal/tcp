import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from '../LoginForm.view.native';

describe('LoginForm component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      handleSubmit: () => {},
      onSubmit: () => {},
      loginErrorMessage: '',
    };
    const component = shallow(<LoginForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
