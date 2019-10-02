import React from 'react';
import { shallow } from 'enzyme';
import CouponAndPromos from '../../../../../../CnC/common/organism/CouponAndPromos';

describe('CnC template', () => {
  it('should render correctly', () => {
    const props = {
      showAccordian: false,
      isCarouselView: true,
      closedOverlay: () => {},
    };
    const tree = shallow(<CouponAndPromos {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
