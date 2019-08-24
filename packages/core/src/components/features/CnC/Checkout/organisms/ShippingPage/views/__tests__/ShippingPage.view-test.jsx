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
    const props = {
      address: {
        addressLine1: 'pob',
        addressLine2: '',
      },
    };
    const tree = shallow(<ShippingPage {...props} />);
    tree.instance().checkPOBoxAddress();
    expect(tree).toMatchSnapshot();
    expect(ShippingFormVanilla).toHaveLength(1);
  });
});
