import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutPageVanilla } from '../views/CheckoutPage.view';
import CHECKOUT_STAGES from '../../../../../../../web/src/pages/App.constants';

describe('CheckoutPageVanilla component', () => {
  const initialProps = {
    className: 'className',
    backLinkText: 'backLinkText',
    nextButtonText: 'nextButtonText',
    disableNext: false,
    backLinkHandler: () => {},
    disableBackLink: false,
    router: { query: { subSection: CHECKOUT_STAGES.SHIPPING, section: CHECKOUT_STAGES.SHIPPING } },
    onPickupSubmit: () => {},
    isVenmoPaymentInProgress: true,
    isUsSite: true,
    reviewProps: { labels: {} },
    shippingProps: {
      shipmentMethods: {},
    },
  };

  const tree = shallow(<CheckoutPageVanilla {...initialProps} />);

  it('should renders correctly pickup', () => {
    const props = {
      className: 'className',
      backLinkText: 'backLinkText',
      nextButtonText: 'nextButtonText',
      disableNext: false,
      backLinkHandler: () => {},
      disableBackLink: false,
      router: { query: { section: CHECKOUT_STAGES.PICKUP } },
      onPickupSubmit: () => {},
      reviewProps: { labels: {} },
      shippingProps: {
        shipmentMethods: {},
      },
    };
    const component = shallow(<CheckoutPageVanilla {...props} />);
    component.instance().renderLeftSection();
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with shipping', () => {
    const props = {
      className: 'className',
      backLinkText: 'backLinkText',
      nextButtonText: 'nextButtonText',
      disableNext: false,
      backLinkHandler: () => {},
      disableBackLink: false,
      router: { query: { subSection: 'shipping' } },
      onPickupSubmit: () => {},
      reviewProps: { labels: {} },
      shippingProps: {
        shipmentMethods: {},
      },
    };
    const component = shallow(<CheckoutPageVanilla {...props} />);
    component.instance().renderLeftSection();
    expect(component).toMatchSnapshot();
  });

  it('calling getCurrentSection method', () => {
    expect(tree.instance().getCurrentSection()).toEqual('shipping');
  });

  it('calling isVenmoPickupDisplayed method', () => {
    const componentInstance = tree.instance();
    expect(componentInstance.isVenmoPickupDisplayed()).toBeFalsy();
  });

  it('calling isShowVenmoBanner method', () => {
    const props = {
      ...initialProps,
      router: { query: { subSection: CHECKOUT_STAGES.PICKUP, section: CHECKOUT_STAGES.PICKUP } },
    };
    const component = shallow(<CheckoutPageVanilla {...props} />);
    const componentInstance = component.instance();
    expect(componentInstance.isShowVenmoBanner(CHECKOUT_STAGES.PICKUP)).toBeFalsy();
  });

  it('calling isShowVenmoBanner method for Shipping', () => {
    const componentInstance = tree.instance();
    expect(componentInstance.isShowVenmoBanner(CHECKOUT_STAGES.SHIPPING)).toBeFalsy();
  });

  it('calling isVenmoPickupDisplayed method for pickup page', () => {
    const props = {
      className: 'className',
      backLinkText: 'backLinkText',
      nextButtonText: 'nextButtonText',
      disableNext: false,
      backLinkHandler: () => {},
      disableBackLink: false,
      router: { query: { section: 'pickup', subSection: 'pickup' } },
      onPickupSubmit: () => {},
      reviewProps: { labels: {} },
    };
    const component = shallow(<CheckoutPageVanilla {...props} />);
    const componentInstance = component.instance();
    expect(componentInstance.isVenmoPickupDisplayed()).toBeTruthy();
  });

  it('calling isVenmoShippingDisplayed method', () => {
    const componentInstance = tree.instance();
    expect(componentInstance.isVenmoShippingDisplayed()).toBeTruthy();
  });
});
