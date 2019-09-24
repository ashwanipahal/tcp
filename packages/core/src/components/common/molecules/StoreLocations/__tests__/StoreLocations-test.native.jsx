import React from 'react';
import { shallow } from 'enzyme';
import StoreLocations from '../views/StoreLocations.native';

describe('StoreLocations component', () => {
  it('StoreLocations component renders correctly without props', () => {
    const component = shallow(<StoreLocations />);
    expect(component).toMatchSnapshot();
  });
});
