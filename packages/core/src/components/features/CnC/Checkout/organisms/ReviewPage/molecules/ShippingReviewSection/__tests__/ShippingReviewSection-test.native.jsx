import React from 'react';
import { shallow } from 'enzyme';
import { ShippingReviewSectionvanilla } from '../views/ShippingReviewSection';

describe('ShippingReviewSection component', () => {
  it('should renders correctly props not present', () => {
    const props = { labels: {}, displayName: '' };
    const component = shallow(<ShippingReviewSectionvanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly props are present', () => {
    const props = {
      labels: {
        lbl_review_sectionShippingMethodTitle: 'title',
      },
      displayName: 'Free',
      shippingAddress: {},
      shippingMethod: {
        displayName: '',
      },
    };
    const component = shallow(<ShippingReviewSectionvanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
