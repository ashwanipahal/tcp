import React from 'react';
import { shallow } from 'enzyme';
import { VenmoPaymentButtonContainer, mapDispatchToProps } from '../VenmoPaymentButton.container';
import VenmoPaymentButton from '../../views';

describe('Venmo Payment Button Container', () => {
  let props;
  beforeEach(() => {
    props = {
      className: 'venmo-container',
      enabled: true,
      isMobile: true,
      mode: 'client_token',
      authorizationKey: 'encrytptedauthorizationkey',
      isNonceNotExpired: false,
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
      setVenmoProgress: jest.fn(),
      getVenmoPaymentTokenAction: jest.fn(),
      setVenmoDataAction: jest.fn(),
      onSuccess: jest.fn(),
    };
  });

  it('should render correctly', () => {
    const tree = shallow(<VenmoPaymentButtonContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('calling setVenmoData method', () => {
    const tree = shallow(<VenmoPaymentButtonContainer {...props} />);
    const componentInstance = tree.instance();
    expect(componentInstance.setVenmoData()).toEqual(undefined);
  });

  it('calling onVenmoPaymentButtonClick method', () => {
    const tree = shallow(<VenmoPaymentButtonContainer {...props} />);
    const componentInstance = tree.instance();
    componentInstance.onVenmoPaymentButtonClick();
    expect(props.onSuccess).toBeCalled();
  });

  it('calling onVenmoPaymentButtonError method', () => {
    const tree = shallow(<VenmoPaymentButtonContainer {...props} />);
    const componentInstance = tree.instance();
    componentInstance.onVenmoPaymentButtonError();
    expect(props.setVenmoProgress).toBeCalled();
  });

  it('should render VenmoPaymentButton correctly', () => {
    const tree = shallow(<VenmoPaymentButtonContainer {...props} />);
    expect(tree).toMatchSnapshot();
    expect(tree.find(VenmoPaymentButton)).toHaveLength(1);
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action setVenmoPaymentInProgress which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.setVenmoProgress();
    expect(dispatch.mock.calls).toHaveLength(1);
  });

  it('should return an action getVenmoPaymentTokenAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getVenmoPaymentTokenAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });

  it('should return an action setVenmoDataAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.setVenmoDataAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
