import React from 'react';
import { shallow } from 'enzyme';
import { ShippingReviewContainer } from '../ShippingReviewSection.container';
import ShippingReviewSection from '../../../../molecules/ShippingReviewSection';

describe('Coupon Container', () => {
  it('should render CouponContainer section', () => {
    const tree = shallow(
      <ShippingReviewContainer
        shippingAddress={{}}
        shippingMethod={{}}
        labels={{}}
        onEdit={jest.fn()}
      />
    );
    expect(tree.is(ShippingReviewSection)).toBeTruthy();
  });
});
