import React from 'react';
import { shallow } from 'enzyme';
import { CouponFormVanilla } from '../views/CouponForm.view.native';

describe('CouponForm Component', () => {
  let component;
  const Props = {
    labels: {
      placeholderText: 'Enter Coupon Code',
      submitButtonLabel: 'Apply',
      couponCodeHeader: 'Coupon Code',
      couponNeedHelpText: 'Need Help?',
    },
    dataLocators: {
      submitButton: 'coupon_submit_btn',
      inputField: 'coupon_code',
    },
    fieldName: 'couponCode',
    handleSubmit: () => {},
  };

  beforeEach(() => {
    component = shallow(<CouponFormVanilla {...Props} />);
  });

  it('CouponForm should be defined', () => {
    expect(component).toBeDefined();
  });

  it('CouponForm should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
