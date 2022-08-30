import React from 'react';
import { shallow } from 'enzyme';
import CnCCommonTemplate from '../views/CnCTemplate.view.native';

describe('CnCCommonTemplate Page', () => {
  it('should render correctly', () => {
    const props = {
      navigation: {},
      btnText: 'Shipping',
      onPress: jest.fn(),
    };
    const tree = shallow(<CnCCommonTemplate {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if on confirmation page', () => {
    const props = {
      isConfirmationPage: true,
      isGuest: true,
    };
    const tree = shallow(<CnCCommonTemplate {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render venmo payment correctly if on confirmation page', () => {
    const props = {
      isConfirmationPage: true,
      isGuest: true,
      isVenmoPaymentInProgress: true,
      venmoPayment: {
        ccBrand: 'VENMO',
        ccType: 'VENMO',
        defaultInd: true,
        userName: 'test-user',
      },
    };
    const tree = shallow(<CnCCommonTemplate {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render paypal button correctly if on confirmation page', () => {
    const props = {
      isConfirmationPage: true,
      isGuest: true,
      isVenmoPaymentInProgress: true,
      venmoPayment: {
        ccBrand: 'VENMO',
        ccType: 'VENMO',
        defaultInd: true,
        userName: 'test-user',
      },
      showPayPalButton: true,
      showVenmoSubmit: true,
      isPayPalWebViewEnable: true,
    };
    const tree = shallow(<CnCCommonTemplate {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render paypal button correctly if on confirmation page for registered user', () => {
    const props = {
      isConfirmationPage: true,
      isGuest: false,
      isVenmoPaymentInProgress: true,
      venmoPayment: {
        ccBrand: 'VENMO',
        ccType: 'VENMO',
        defaultInd: true,
        userName: 'test-user',
      },
      showPayPalButton: true,
      showVenmoSubmit: true,
      isPayPalWebViewEnable: true,
    };
    const tree = shallow(<CnCCommonTemplate {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render payment buttons correctly if on confirmation page for registered user', () => {
    const props = {
      isConfirmationPage: true,
      isGuest: false,
      isVenmoPaymentInProgress: true,
      venmoPayment: {
        ccBrand: 'VENMO',
        ccType: 'VENMO',
        defaultInd: true,
        userName: 'test-user',
      },
      showPayPalButton: true,
      showVenmoSubmit: true,
      isPayPalWebViewEnable: true,
      getPayPalSettings: jest.fn(),
      onVenmoSubmit: jest.fn(),
      onVenmoError: jest.fn(),
      btnText: 'Review',
      onPress: jest.fn(),
      backLinkText: 'Billing',
      onBackLinkPress: jest.fn(),
      footerBody: null,
    };
    const tree = shallow(<CnCCommonTemplate {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
