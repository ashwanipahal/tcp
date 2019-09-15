import React from 'react';
import { shallow } from 'enzyme';
import { VenmoPaymentButtonContainer, mapDispatchToProps } from '../VenmoPaymentButton.container';

describe('Venmo Payment Button Container', () => {
  const props = {
    className: 'venmo-container',
    enabled: true,
    isMobile: true,
    mode: 'client_token',
    authorizationKey: 'encrytptedauthorizationkey',
    venmoData: {
      venmoClientTokenData: 'Object',
      deviceData: '762a73c4175ca24f7b1436a440da5bd0',
      supportedByBrowser: true,
      loading: false,
    },
    venmoClientTokenData: {
      userState: 'R',
      venmoCustomerIdAvailable: 'FALSE',
      venmoIsDefaultPaymentType: 'FALSE',
      venmoPaymentTokenAvailable: 'FALSE',
      venmoSecurityToken: 'encrytptedauthorizationkey',
    },
    allowNewBrowserTab: true,
    isGuest: false,
    orderId: 3000332630,
    setVenmoPaymentInProgress: jest.fn(),
    getVenmoPaymentTokenAction: jest.fn(),
    setVenmoDataAction: jest.fn(),
  };

  it('should render correctly', () => {
    const tree = shallow(<VenmoPaymentButtonContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action setVenmoPaymentInProgress which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.setVenmoPaymentInProgress();
    expect(dispatch.mock.calls).toHaveLength(1);
  });

  it('should return an action getVenmoPaymentTokenAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getVenmoPaymentTokenAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
