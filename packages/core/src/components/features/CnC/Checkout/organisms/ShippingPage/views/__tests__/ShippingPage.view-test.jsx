import React from 'react';
import { shallow } from 'enzyme';
import ShippingPage from '../ShippingPage.view';
import { ShippingFormVanilla } from '../../organisms/ShippingForm/views/ShippingForm.view';
import { getSiteId } from '../../../../../../../../utils/utils.web';

jest.mock('../../../../../../../../utils/utils.web', () => ({
  getSiteId: jest.fn(),
}));

describe('Shipping Page', () => {
  it('should render correctly', () => {
    getSiteId.mockImplementation(() => 'us');
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const props = {
      address,
      shipmentMethods: [{}],
      loadShipmentMethods: () => {},
      handleSubmit: () => {},
    };
    const tree = shallow(<ShippingPage {...props} />);
    tree.instance().checkPOBoxAddress();
    tree.instance().submitShippingData({ address, shipmentMethods: {}, smsSignUp: {} });
    expect(tree).toMatchSnapshot();
    expect(ShippingFormVanilla).toHaveLength(1);
  });
});
