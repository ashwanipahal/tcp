import React from 'react';
import { shallow } from 'enzyme';
import CouponAndPromos from '../../../../../../CnC/common/organism/CouponAndPromos';
import { MyOffersCouponsContainer } from '../MyOffersCoupons.container';

describe('MyOffersCoupons container', () => {
  it('should render correctly', () => {
    const props = {
      showAccordian: false,
      isCarouselView: true,
      closedOverlay: () => {},
      fetchNeedHelpContent: () => {},
      fetchCoupons: () => {},
    };
    const tree = shallow(<MyOffersCouponsContainer {...props} />);
    expect(tree).toMatchSnapshot();
    expect(tree.find(CouponAndPromos)).toBeTruthy();
  });
});
