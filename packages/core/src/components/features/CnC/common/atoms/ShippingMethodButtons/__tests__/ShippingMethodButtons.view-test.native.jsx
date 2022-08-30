import React from 'react';
import { shallow } from 'enzyme';
import ShippingMethodButtons from '../views/ShippingMethodButtons.view.native';

describe('Shipping Page', () => {
  it('should render correctly', () => {
    const props = {
      title: '',
      onPress: () => {},
      id: null,
      selectedShipmentId: null,
      index: null,
    };
    const tree = shallow(<ShippingMethodButtons {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
