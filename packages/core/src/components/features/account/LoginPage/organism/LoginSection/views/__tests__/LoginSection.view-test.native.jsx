import React from 'react';
import { shallow } from 'enzyme';
import { LoginSectionVanilla } from '../LoginSection.view.native';

describe('LoginSection component', () => {
  const props = {
    onSubmit: () => {},
    labels: {},
    initialValues: {},
    resetPassword: true,
  };
  it('should renders correctly', () => {
    const component = shallow(<LoginSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
