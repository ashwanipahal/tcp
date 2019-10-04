import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationViewVanilla } from '../views/Confirmation.view';
import ConfirmationAccountFormContainer from '../../common/organism/ConfirmationAccountForm';

let props = {};
describe('ConfirmationViewVanilla', () => {
  beforeEach(() => {
    props = {
      isGuest: true,
    };
  });

  it('should render correctly', () => {
    const props1 = {
      orderNumbersByFullfillmentCenter: {
        fullfillmentCenterMap: [{ center: { shippingFullname: 'ship', orderType: 'BOSS' } }],
      },
      orderDetails: { date: '', orderNumber: 2345, trackingLink: '/' },
      orderShippingDetails: { address: {}, orderTotal: 23.45, itemsCount: 5 },
    };
    const tree = shallow(<ConfirmationViewVanilla {...props1} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with venmo payment progress', () => {
    const props1 = {
      orderNumbersByFullfillmentCenter: {
        fullfillmentCenterMap: [{ center: { shippingFullname: 'ship', orderType: 'BOSS' } }],
      },
      orderDetails: { date: '', orderNumber: '', trackingLink: '/' },
      orderShippingDetails: { address: {}, orderTotal: 23.45, itemsCount: 5 },
      isVenmoPaymentInProgress: true,
      venmoPayment: {},
    };
    const tree = shallow(<ConfirmationViewVanilla {...props1} />);
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
    const tree = shallow(<ConfirmationViewVanilla {...props1} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render confirmation account form', () => {
    const tree = shallow(<ConfirmationViewVanilla {...props} />);
    expect(tree.find(ConfirmationAccountFormContainer).length).toBe(1);
  });

  it('should not render confirmation account form', () => {
    props.isGuest = false;
    const tree = shallow(<ConfirmationViewVanilla {...props} />);
    expect(tree.find(ConfirmationAccountFormContainer).length).toBe(0);
  });
});
