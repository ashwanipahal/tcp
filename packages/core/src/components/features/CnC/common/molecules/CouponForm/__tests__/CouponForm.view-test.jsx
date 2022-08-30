import React from 'react';
import { shallow } from 'enzyme';
import { CouponForm, onSubmitSuccess } from '../views/CouponForm.view';

describe.only('CouponForm Component', () => {
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

  it('CouponForm should be defined', () => {
    component = shallow(<CouponForm {...props} />);
    expect(component).toBeDefined();
  });

  it('CouponForm should render correctly', () => {
    component = shallow(<CouponForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CouponForm should render with error correctly', () => {
    props.error = { msg: '1234' };
    component = shallow(<CouponForm {...props} />);
    component.instance().renderTextBox({ input: { value: '123' } });
    component.instance().toggleTouched();
    component.instance().handleSubmit();
    expect(component).toMatchSnapshot();
  });

  it('on Submit Success', () => {
    const reset = jest.fn();
    onSubmitSuccess(undefined, undefined, { reset });
    expect(reset.mock.calls.length).toBe(1);
  });
});
