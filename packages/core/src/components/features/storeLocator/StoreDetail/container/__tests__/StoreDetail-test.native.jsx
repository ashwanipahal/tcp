import React from 'react';
import { shallow } from 'enzyme';
import StoreDetail from '../views/StoreDetail.native';

describe('StoreDetail component', () => {
  it('StoreDetail component renders correctly without props', () => {
    const component = shallow(<StoreDetail />);
    expect(component).toMatchSnapshot();
  });
});
