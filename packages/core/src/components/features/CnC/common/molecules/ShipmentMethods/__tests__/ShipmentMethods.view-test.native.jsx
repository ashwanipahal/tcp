import React from 'react';
import { shallow } from 'enzyme';
import ShipmentMethods, { onShipmentMethodChange } from '../views/ShipmentMethods.view.native';

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
    onShipmentMethodChange({ id: '11901', dispatch: jest.fn(), formName: '', formSection: '' });
    const tree = shallow(<ShipmentMethods {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
