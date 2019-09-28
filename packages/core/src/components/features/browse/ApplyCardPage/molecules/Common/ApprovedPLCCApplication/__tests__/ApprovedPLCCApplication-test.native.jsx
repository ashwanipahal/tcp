import React from 'react';
import { shallow } from 'enzyme';
import ApprovedPLCCApplicationView from '../ApprovedPLCCApplication.native';

describe('ApplicationInProgress component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      bagItems: true,
      toggleModal: jest.fn(),
      isGuest: false,
      approvedPLCCData: {
        savingAmount: 900,
        couponCode: 'xyz',
        address: {
          firstName: 'first',
        },
        creditLimit: 566,
      },
      plccData: {
        guest_shipping_info: 'xyz',
        total_savings_amount: 'abc',
      },
    };
    const component = shallow(<ApprovedPLCCApplicationView {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly while having no bag items', () => {
    const props = {
      labels: {},
      bagItems: false,
      toggleModal: jest.fn(),
      isGuest: true,
      plccData: {
        guest_shipping_info: 'xyz',
        total_savings_amount: 'abc',
      },
    };
    const component = shallow(<ApprovedPLCCApplicationView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
