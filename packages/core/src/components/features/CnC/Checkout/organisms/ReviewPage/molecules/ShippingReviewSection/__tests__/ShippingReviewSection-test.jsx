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
    };
    const component = shallow(<ShippingReviewSectionvanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
