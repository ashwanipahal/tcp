import React from 'react';
import { shallow } from 'enzyme';
import MyComponent from '../views/MyComponent';

describe('MyComponent component', () => {
  it('MyComponent component renders correctly without props', () => {
    const component = shallow(<MyComponent />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<MyComponent {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
