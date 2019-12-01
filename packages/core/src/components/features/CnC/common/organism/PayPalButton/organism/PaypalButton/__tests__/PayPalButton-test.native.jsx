import React from 'react';
import { shallow } from 'enzyme';
import { PayPalButtonVanilla } from '../views/PayPalButton.view.native';

describe('PayPalButton component', () => {
  let component;

  beforeEach(() => {
    const mocked = jest.fn();
    const props = {
      className: '',
      height: 48,
      containerId: '',
      isQualifedOrder: false,
      error: 'Error',
      isAddToBagModal: false,
      initalizePayPalButton: mocked,
      getPayPalSettings: {
        paypalInContextToken: 'abcd',
      },
      paypalStaticUrl: '/abc',
      paypalEnv: 'sandbox',
      payPalWebViewHandle: jest.fn(),
      setVenmoState: jest.fn(),
      closeModal: jest.fn(),
      paypalAuthorizationHandle: jest.fn(),
      isRenderDone: jest.fn(),
      clearPaypalSettings: jest.fn(),
    };
    component = shallow(<PayPalButtonVanilla {...props} />);
  });

  it('PayPalButton component renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should fire event on paypal callback on payment', () => {
    const instance = component.instance();
    const event = {
      nativeEvent: {
        data: 'payment',
      },
    };
    instance.handleWebViewEvents(event);
    expect(component.state('showAsModal')).toBe(true);
  });

  it('should fire event on paypal callback on authorize', () => {
    const instance = component.instance();
    const event = {
      nativeEvent: {
        data: 'onAuthorize',
      },
    };
    instance.handleWebViewEvents(event);
    expect(component.state('showAsModal')).toBe(false);
  });

  it('should fire event on paypal callback on cancel', () => {
    const instance = component.instance();
    const event = {
      nativeEvent: {
        data: 'onCancel',
      },
    };
    instance.handleWebViewEvents(event);
    expect(component.state('showAsModal')).toBe(false);
  });

  it('should fire event on paypal callback on loadSuccess', () => {
    const instance = component.instance();
    const event = {
      nativeEvent: {
        data: 'loadSuccess',
      },
    };
    instance.handleWebViewEvents(event);
    expect(component.state('showAsModal')).toBe(false);
  });

  it('should render correctly', () => {
    const props = {
      isBillingPage: false,
      getPayPalSettings: null,
    };
    const tree = shallow(<PayPalButtonVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly isBillingPage', () => {
    const props = {
      isBillingPage: true,
      getPayPalSettings: null,
    };
    const tree = shallow(<PayPalButtonVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
