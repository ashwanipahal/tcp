import React from 'react';
import { shallow } from 'enzyme';
import { BillingPageVanilla } from '../views/BillingPage.view';

describe('CheckoutProgressIndicator component', () => {
  it('should renders correctly props not present', () => {
    const props = {
      checkoutRoutingDone: true,
      labels: {},
      billingDidMount: () => {},
    };
    const component = shallow(<BillingPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly props not present and is Guest user', () => {
    const props = {
      checkoutRoutingDone: true,
      isGuest: true,
      labels: {},
      billingDidMount: () => {},
    };
    const component = shallow(<BillingPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly if routing not done', () => {
    const props = {
      checkoutRoutingDone: false,
      labels: {},
      billingDidMount: () => {},
      isRegisteredUserCallDone: false,
    };
    const component = shallow(<BillingPageVanilla {...props} />);
    const instance = component.instance();
    instance.componentDidUpdate({ isRegisteredUserCallDone: true });
    expect(component).toMatchSnapshot();
  });
});
