import React from 'react';
import { shallow } from 'enzyme';
import { CouponViewVanilla } from '../views/Coupon.view';

describe('Coupon Component', () => {
  let component;
  const Props = {
    handleApplyCoupon: () => {},
  };

  beforeEach(() => {
    component = shallow(<CouponViewVanilla {...Props} />);
  });

  it('Coupon should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Coupon should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
