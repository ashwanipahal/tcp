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
    const tree = shallow(<ShippingReviewSectionvanilla {...props} />);
    const componentInstance = tree.instance();
    jest.spyOn(componentInstance, 'componentDidUpdate');
    componentInstance.componentDidUpdate(prevProps);
    expect(componentInstance.componentDidUpdate).toHaveBeenCalled();
  });
});
