import React from 'react';
import { shallow } from 'enzyme';
import { Image } from '@tcp/core/src/components/common/atoms';
import { VenmoPaymentButtonVanilla } from '../VenmoPaymentButton.view';
import { modes } from '../../container/VenmoPaymentButton.util';

describe('Venmo Payment Button', () => {
  const props = {
    setVenmoData: jest.fn(),
    onVenmoPaymentButtonClick: jest.fn(),
    onVenmoPaymentButtonError: jest.fn(),
    className: 'venmo-container sc-gqjmRU gvHLxz',
    enabled: true,
    isMobile: true,
    mode: modes.PAYMENT_TOKEN,
    authorizationKey: 'encrytptedauthorizationkey',
    isNonceNotExpired: false,
    venmoData: {
      venmoClientTokenData: {
        userState: 'R',
        venmoCustomerIdAvailable: 'FALSE',
        venmoIsDefaultPaymentType: 'FALSE',
        venmoPaymentTokenAvailable: 'FALSE',
        venmoSecurityToken: 'encrytptedauthorizationkey',
      },
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
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render Venmo Button correctly', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    expect(tree).toMatchSnapshot();
    expect(tree.find('button')).toHaveLength(1);
  });

  it('should render Image correctly', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    expect(tree.find(Image)).toHaveLength(1);
  });

  it('calling setupVenmoInstance method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.setupVenmoInstance(true);
    expect(tree.state('hasVenmoError')).toBeTruthy();
  });

  it('calling handleVenmoSuccess method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.handleVenmoSuccess({ nonce: 'encryptedtext' });
    expect(props.onVenmoPaymentButtonClick).toBeCalled();
  });

  it('calling handleVenmoError method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.handleVenmoError({ code: 'error code 400' });
    expect(props.onVenmoPaymentButtonError).toBeCalled();
  });

  it('calling handleVenmoInstanceError method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.handleVenmoInstanceError({ code: 'error code 400' });
    expect(tree.state('hasVenmoError')).toBeTruthy();
  });

  it('calling handleVenmoClick method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.handleVenmoClick();
    expect(props.setVenmoPaymentInProgress).toBeCalled();
  });

  it('calling canCallVenmoApi method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    expect(componentInstance.canCallVenmoApi()).toEqual(false);
  });
});
