import React from 'react';
import { shallow } from 'enzyme';
import StoreSearch from '../views/StoreSearch.native';

describe('StoreSearch component', () => {
  it('StoreSearch component renders correctly props', () => {
    const component = shallow(<StoreSearch />);
    expect(component).toMatchSnapshot();
  });
});
