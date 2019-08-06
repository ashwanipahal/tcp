import React from 'react';
import { shallow } from 'enzyme';
import { CouponForm } from '../views/CouponForm.view';

describe.only('CartItem Component', () => {
  let component;
  const props = {
    labels: {
      placeholderText: 'Enter Coupon Code',
      submitButtonLabel: 'Apply',
    },
    dataLocators: {
      submitButton: 'coupon_submit_btn',
      inputField: 'coupon_code',
    },
    fieldName: 'coupon_code',
    handleSubmit: () => {},
  };

  beforeEach(() => {
    component = shallow(<CouponForm {...props} />);
  });

  it('CartItem should be defined', () => {
    expect(component).toBeDefined();
  });

  it('CartItem should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
