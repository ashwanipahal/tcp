import React from 'react';
import { shallow } from 'enzyme';
import ShippingPage, { checkPOBoxAddress } from '../ShippingPage.view.native';

describe('Shipping Page', () => {
  it('should render correctly', () => {
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const props = {
      address,
      shipmentMethods: [{}],
      loadShipmentMethods: () => {},
      handleSubmit: () => {},
      shippingLabels: {
        sectionHeader: '',
      },
    };
    checkPOBoxAddress({
      address: { addressLine1: '123', addressLine2: '', loadShipmentMethods: jest.fn() },
    });
    const tree = shallow(<ShippingPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
