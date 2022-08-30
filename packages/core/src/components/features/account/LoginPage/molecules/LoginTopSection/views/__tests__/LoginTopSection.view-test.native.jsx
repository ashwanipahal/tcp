import React from 'react';
import { shallow } from 'enzyme';
import { LoginTopSectionVanilla } from '../LoginTopSection.view.native';

describe('LoginTopSectionVanilla component', () => {
  const props = {
    labels: {
      login: {},
    },
    updateHeader: jest.fn(),
  };

  it('should renders correctly', () => {
    const component = shallow(<LoginTopSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should hide modal header and rule', () => {
    const component = shallow(<LoginTopSectionVanilla {...props} />);
    component.setProps({ variation: 'checkout' });
    expect(component).toMatchSnapshot();
  });
});
