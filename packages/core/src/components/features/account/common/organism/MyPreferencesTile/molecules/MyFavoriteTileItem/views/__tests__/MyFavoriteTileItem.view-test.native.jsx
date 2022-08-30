import React from 'react';
import { shallow } from 'enzyme';
import { MyFavoriteTileItem } from '../MyFavoriteTileItem.view.native';

describe('MyFavoriteTileItem component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      favStoreName: '',
      favStoreAddress: '',
      favStoreState: '',
      favStoreCity: '',
      favStoreZipcode: '',
      favStorePhone: '',
      isFavStoreName: '',
      addEditLabel: '',
    };
    const component = shallow(<MyFavoriteTileItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
