import React from 'react';
import { shallow } from 'enzyme';
import { ShippingReviewSectionvanilla } from '../views/ShippingReviewSection';

describe('GiftWrappingDisplay component', () => {
  it('should renders correctly props not present', () => {
    const props = { labels: {}, displayName: '' };
    const component = shallow(<ShippingReviewSectionvanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly props are present', () => {
    const props = {
      className: '',
      labels: {
        lbl_review_sectionShippingMethodTitle: 'title',
      },
      displayName: 'Free',
      isGiftOptionsEnabled: true,
      shippingMethod: { displayName: '' },
    };
    const component = shallow(<ShippingReviewSectionvanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly props are present and isexpresscheckout', () => {
    const props = {
      className: '',
      labels: {
        lbl_review_sectionShippingMethodTitle: 'title',
      },
      displayName: 'Free',
      isExpressCheckout: true,
      shippingMethod: { displayName: '' },
      shippingAddress: { phoneNumber: '1234567897' },
    };
    const component = shallow(<ShippingReviewSectionvanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
