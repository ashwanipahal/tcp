import React from 'react';
import { shallow } from 'enzyme';
import { LoginFormFormVanilla } from '../LoginForm.view';

describe('LoginForm component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        login: {},
      },
      handleSubmit: () => {},
      className: 'test-class',
    };
    const component = shallow(<LoginFormFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with error', () => {
    const props = {
      labels: {
        login: {},
      },
      handleSubmit: () => {},
      className: 'test-class',
      loginErrorMessage: 'test errror',
    };
    const component = shallow(<LoginFormFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
