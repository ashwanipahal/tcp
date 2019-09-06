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
    component.instance().onPickUpSubmit({
      pickUpContact: {},
      pickUpAlternate: {},
      smsSignUp: { sendOrderUpdate: false },
    });
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
    component.instance().onPickUpSubmit({
      pickUpContact: {},
      pickUpAlternate: {},
      smsSignUp: { sendOrderUpdate: false },
    });
    expect(component).toMatchSnapshot();
  });
});
