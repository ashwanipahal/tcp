import React from 'react';
import { shallow } from 'enzyme';
import MyComponent from '../views/MyComponent.native';

describe('MyComponent component', () => {
  it('MyComponent component renders correctly without props', () => {
    const component = shallow(<MyComponent />);
    expect(component).toMatchSnapshot();
  });
});
