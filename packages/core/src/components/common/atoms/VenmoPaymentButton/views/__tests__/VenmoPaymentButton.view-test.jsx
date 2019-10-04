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
    isRemoveOOSItems: false,
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
    expect(props.setVenmoData).not.toHaveBeenCalled();
  });

  it('calling handleVenmoSuccess method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.handleVenmoSuccess({ nonce: 'encryptedtext' });
    expect(props.setVenmoData).toBeCalled();
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
    tree.setState({ hasVenmoError: true });
    componentInstance.handleVenmoInstanceError({ code: 'error code 400' });
    expect(tree.state('hasVenmoError')).toBeTruthy();
  });

  it('calling handleVenmoInstanceError method without error arg', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    tree.setState({ hasVenmoError: false });
    const handleVenmoClickedError = jest.spyOn(componentInstance, 'handleVenmoClickedError');
    componentInstance.handleVenmoInstanceError();
    expect(tree.state('hasVenmoError')).toBe(true);
    expect(handleVenmoClickedError).toHaveBeenCalled();
  });

  it('calling handleVenmoClick method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.canCallVenmoApi = jest.fn();
    componentInstance.venmoInstance = {};
    componentInstance.handleVenmoClick();
    expect(componentInstance.canCallVenmoApi).not.toBeCalled();
    expect(props.setVenmoPaymentInProgress).toBeCalled();
    expect(props.onVenmoPaymentButtonClick).toBeCalled();
  });

  it('calling handleVenmoClick method for OOS Items', () => {
    const newProps = {
      ...props,
      isRemoveOOSItems: true,
    };
    const tree = shallow(<VenmoPaymentButtonVanilla {...newProps} />);
    const componentInstance = tree.instance();
    componentInstance.canCallVenmoApi = jest.fn();
    componentInstance.handleVenmoClick();
    expect(componentInstance.canCallVenmoApi).not.toBeCalled();
    expect(props.setVenmoPaymentInProgress).toBeCalled();
    expect(props.onVenmoPaymentButtonClick).toBeCalled();
  });

  it('calling handleVenmoClick method with venmo nonce', () => {
    const newProps = {
      ...props,
      isNonceNotExpired: false,
    };
    const tree = shallow(<VenmoPaymentButtonVanilla {...newProps} />);
    const componentInstance = tree.instance();
    const fetchVenmoNonce = jest.spyOn(componentInstance, 'fetchVenmoNonce');
    componentInstance.handleVenmoClick();
    expect(props.setVenmoPaymentInProgress).toBeCalled();
    expect(fetchVenmoNonce).not.toBeCalled();
  });

  it('calling canCallVenmoApi method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    expect(componentInstance.canCallVenmoApi()).toEqual(false);
  });

  it('calling fetchVenmoNonce method', () => {
    const venmoInstance = jest.fn();
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.fetchVenmoNonce();
    expect(venmoInstance).not.toBeCalled();
    expect(props.setVenmoData).toBeCalled();
  });

  it('calling disableVenmoButton method', () => {
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    expect(componentInstance.disableVenmoButton()).toEqual(undefined);
  });

  it('calling fetchVenmoClientToken method', () => {
    const getVenmoPaymentTokenAction = jest.fn();
    const tree = shallow(<VenmoPaymentButtonVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.fetchVenmoClientToken();
    expect(getVenmoPaymentTokenAction).not.toHaveBeenCalled();
  });
});
