import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationViewVanilla } from '../views/Confirmation.view';

describe('ConfirmationViewVanilla', () => {
  it('should render correctly', () => {
    const props = {
      orderNumbersByFullfillmentCenter: {
        fullfillmentCenterMap: [{ center: { shippingFullname: 'ship', orderType: 'BOSS' } }],
      },
      orderDetails: { date: '', orderNumber: 2345, trackingLink: '/' },
      orderShippingDetails: { address: {}, orderTotal: 23.45, itemsCount: 5 },
    };
    const tree = shallow(<ConfirmationViewVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with venmo payment progress', () => {
    const props = {
      orderNumbersByFullfillmentCenter: {
        fullfillmentCenterMap: [{ center: { shippingFullname: 'ship', orderType: 'BOSS' } }],
      },
      orderDetails: { date: '', orderNumber: '', trackingLink: '/' },
      orderShippingDetails: { address: {}, orderTotal: 23.45, itemsCount: 5 },
      isVenmoPaymentInProgress: true,
      venmoPayment: {},
    };
    const tree = shallow(<ConfirmationViewVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly without order details', () => {
    const props = {
      orderNumbersByFullfillmentCenter: {
        fullfillmentCenterMap: [{ center: { shippingFullname: 'ship', orderType: 'BOSS' } }],
      },
      isVenmoPaymentInProgress: true,
      venmoPayment: {},
    };
    const tree = shallow(<ConfirmationViewVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
