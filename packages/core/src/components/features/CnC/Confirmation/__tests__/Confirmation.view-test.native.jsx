import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationView from '../views/Confirmation.view.native';

describe('ConfirmationView', () => {
  it('should render correctly', () => {
    const props = {
      isGuest: true,
    };
    const tree = shallow(<ConfirmationView {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly', () => {
    const props1 = {
      orderNumbersByFullfillmentCenter: {
        fullfillmentCenterMap: [{ center: { shippingFullname: 'ship', orderType: 'BOSS' } }],
      },
      orderDetails: { date: '', orderNumber: 2345, trackingLink: '/' },
      orderShippingDetails: { address: {}, orderTotal: 23.45, itemsCount: 5 },
    };
    const tree = shallow(<ConfirmationView {...props1} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly without order details', () => {
    const props1 = {
      orderNumbersByFullfillmentCenter: {
        fullfillmentCenterMap: [{ center: { shippingFullname: 'ship', orderType: 'BOSS' } }],
      },
      isVenmoPaymentInProgress: true,
      venmoPayment: {},
    };
    const tree = shallow(<ConfirmationView {...props1} />);
    expect(tree).toMatchSnapshot();
  });
});
