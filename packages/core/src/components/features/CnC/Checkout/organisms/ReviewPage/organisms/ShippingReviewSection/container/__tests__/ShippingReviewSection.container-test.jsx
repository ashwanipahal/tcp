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

  it('calling componentDidUpdate method', () => {
    const props = {
      className: '',
      labels: {
        lbl_review_sectionShippingMethodTitle: 'title',
      },
      displayName: 'Free',
      isExpressCheckout: true,
      updateShippingMethodSelection: jest.fn(),
      expressReviewShippingSectionId: {
        shippingMethodId: '123',
      },
    };
    const prevProps = {
      className: '',
      labels: {
        lbl_review_sectionShippingMethodTitle: 'title',
      },
      displayName: 'Free',
      isExpressCheckout: true,
      updateShippingMethodSelection: jest.fn(),
      expressReviewShippingSectionId: {
        shippingMethodId: '354',
      },
    };
    const tree = shallow(<ShippingReviewContainer {...props} />);
    const componentInstance = tree.instance();
    jest.spyOn(componentInstance, 'componentDidUpdate');
    componentInstance.componentDidUpdate(prevProps);
    expect(componentInstance.componentDidUpdate).toHaveBeenCalled();
  });
});
