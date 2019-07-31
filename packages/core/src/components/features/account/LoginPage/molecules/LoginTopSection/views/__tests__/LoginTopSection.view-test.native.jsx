import React from 'react';
import { shallow } from 'enzyme';
import { LoginTopSectionVanilla } from '../LoginTopSection.view.native';

describe('LoginTopSectionVanilla component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<LoginTopSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
