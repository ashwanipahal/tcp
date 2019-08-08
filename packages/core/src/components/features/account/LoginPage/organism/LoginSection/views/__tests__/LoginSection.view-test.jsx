import React from 'react';
import { shallow } from 'enzyme';
import { LoginSectionVanilla } from '../LoginSection.view';

describe('LoginSection component', () => {
  it('should renders correctly', () => {
    const props = {
      onSubmit: () => {},
      labels: {
        login: {},
      },
      initialValues: {},
    };
    const component = shallow(<LoginSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
