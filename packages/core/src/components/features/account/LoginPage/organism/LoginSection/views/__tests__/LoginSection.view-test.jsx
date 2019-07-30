import React from 'react';
import { shallow } from 'enzyme';
import { LoginSection } from '../LoginSection.view';

describe('LoginSection component', () => {
  it('should renders correctly', () => {
    const props = {
      onSubmit: () => {},
      labels: {},
      initialValues: {},
    };
    const component = shallow(<LoginSection {...props} />);
    expect(component).toMatchSnapshot();
  });
});
