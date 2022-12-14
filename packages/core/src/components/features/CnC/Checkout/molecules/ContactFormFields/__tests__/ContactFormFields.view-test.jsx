import React from 'react';
import { shallow } from 'enzyme';
import { ContactFormFieldsVanilla } from '../views/ContactFormFields.view';

describe('Coupon component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      labels: {},
      className: '',
      showEmailAddress: false,
      showPhoneNumber: false,
    };
    const component = shallow(<ContactFormFieldsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with express checkout', () => {
    const props = {
      labels: {},
      className: '',
      showEmailAddress: false,
      showPhoneNumber: false,
      isExpressCheckout: true,
    };
    const component = shallow(<ContactFormFieldsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
