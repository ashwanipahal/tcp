import React from 'react';
import { shallow } from 'enzyme';
import { BillingPageVanilla } from '../views/BillingPage.view.native';

describe('PickUpFormPart component', () => {
  it('should renders correctly props not present', () => {
    const props = {
      addressLabels: {},
      shippingLabels: {},
      smsSignUpLabels: {},
      address: {},
      emailSignUpLabels: {},
      navigation: {},
      handleSubmit: () => {},
      submitBilling: () => {},
      availableStages: {},
      labels: {},
      isGuest: true,
    };
    const component = shallow(<BillingPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly props not present', () => {
    const props = {
      addressLabels: {},
      shippingLabels: {},
      smsSignUpLabels: {},
      address: {},
      emailSignUpLabels: {},
      navigation: {},
      handleSubmit: () => {},
      submitBilling: () => {},
      availableStages: {},
      labels: {},
      isGuest: false,
    };
    const component = shallow(<BillingPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
