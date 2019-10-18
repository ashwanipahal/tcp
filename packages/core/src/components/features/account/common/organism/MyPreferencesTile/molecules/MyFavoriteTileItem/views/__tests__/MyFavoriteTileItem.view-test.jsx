import React from 'react';
import { shallow } from 'enzyme';
import MyFavoriteTileItem from '../MyFavoriteTileItem.view';

describe('MyFavoriteTileItem component', () => {
  it('should render correctly when coupons are not present', () => {
    const props = {
      labels: {},
      favStoreName: '',
      favStoreAddress: '',
      favStoreState: '',
      favStoreCity: '',
      favStoreZipcode: '',
      favStorePhone: '',
    };
    const component = shallow(<MyFavoriteTileItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
