import React from 'react';
import { shallow } from 'enzyme';
import StoreAddressTile from '../views/StoreAddressTile.native';

describe('StoreAddressTile component', () => {
  it('StoreAddressTile component renders correctly without props', () => {
    const component = shallow(<StoreAddressTile />);
    expect(component).toMatchSnapshot();
  });
});
