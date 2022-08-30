import React from 'react';
import { shallow } from 'enzyme';
import { ShippingMethodDisplayanilla } from '../views/ShippingMethodDisplay';

describe('GiftWrappingDisplay component', () => {
  it('should renders correctly props not present', () => {
    const props = { labels: {}, displayName: '' };
    const component = shallow(<ShippingMethodDisplayanilla {...props} />);
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
    const component = shallow(<ShippingMethodDisplayanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
