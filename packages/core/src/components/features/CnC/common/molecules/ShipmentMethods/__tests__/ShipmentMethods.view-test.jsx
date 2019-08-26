import React from 'react';
import { shallow } from 'enzyme';
import { ShipmentMethodsVanilla } from '../views/ShipmentMethods.view';

describe('Shipping Page', () => {
  it('should render correctly', () => {
    const props = {
      shipmentMethods: [
        {
          id: '11901',
          displayName: 'standard',
          price: 5,
          shippingSpeed: 'express',
        },
        {
          id: '11904',
          displayName: 'rush hour',
          price: 10,
          shippingSpeed: 'express',
        },
      ],
      selectedShipmentId: '11901',
    };
    const tree = shallow(<ShipmentMethodsVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
