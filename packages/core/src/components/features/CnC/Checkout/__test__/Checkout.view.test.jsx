import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutPageVanilla } from '../views/CheckoutPage.view';

describe('CheckoutPageVanilla component', () => {
  it('should renders correctly pickup', () => {
    const props = {
      className: 'className',
      backLinkText: 'backLinkText',
      nextButtonText: 'nextButtonText',
      disableNext: false,
      backLinkHandler: () => {},
      disableBackLink: false,
      router: { query: { section: 'pickup' } },
      onPickupSubmit: () => {},
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
    };
    const component = shallow(<CheckoutPageVanilla {...props} />);
    component.instance().renderLeftSection();
    expect(component).toMatchSnapshot();
  });

  it('calling getCurrentSection method', () => {
    const props = {
      className: 'className',
      backLinkText: 'backLinkText',
      nextButtonText: 'nextButtonText',
      disableNext: false,
      backLinkHandler: () => {},
      disableBackLink: false,
      router: { query: { subSection: 'shipping', section: 'shipping' } },
      onPickupSubmit: () => {},
    };
    const tree = shallow(<CheckoutPageVanilla {...props} />);
    const componentInstance = tree.instance();
    expect(componentInstance.getCurrentSection()).toEqual('shipping');
  });

  it('calling isVenmoPickupDisplayed method', () => {
    const props = {
      className: 'className',
      backLinkText: 'backLinkText',
      nextButtonText: 'nextButtonText',
      disableNext: false,
      backLinkHandler: () => {},
      disableBackLink: false,
      router: { query: { subSection: 'shipping', section: 'shipping' } },
      onPickupSubmit: () => {},
    };
    const tree = shallow(<CheckoutPageVanilla {...props} />);
    const componentInstance = tree.instance();
    expect(componentInstance.isVenmoPickupDisplayed()).toBeFalsy();
  });

  it('calling isVenmoShippingDisplayed method', () => {
    const props = {
      className: 'className',
      backLinkText: 'backLinkText',
      nextButtonText: 'nextButtonText',
      disableNext: false,
      backLinkHandler: () => {},
      disableBackLink: false,
      router: { query: { subSection: 'pickup', section: 'pickup' } },
      onPickupSubmit: () => {},
    };
    const tree = shallow(<CheckoutPageVanilla {...props} />);
    const componentInstance = tree.instance();
    expect(componentInstance.isVenmoShippingDisplayed()).toBeFalsy();
  });
});
