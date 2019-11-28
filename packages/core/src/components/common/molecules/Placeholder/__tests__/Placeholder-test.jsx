import React from 'react';
import { shallow } from 'enzyme';
import Placeholder from '../views/Placeholder';

describe('Placeholder component', () => {
  it('Placeholder component renders correctly without props', () => {
    const component = shallow(<Placeholder />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<Placeholder {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
