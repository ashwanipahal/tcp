import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from '../LoginForm.view';

describe('LoginForm component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      handleSubmit: () => {},
      className: 'test-class',
    };
    const component = shallow(<LoginForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with error', () => {
    const props = {
      labels: {},
      handleSubmit: () => {},
      className: 'test-class',
      loginErrorMessage: 'test errror',
    };
    const component = shallow(<LoginForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
