import React from 'react';
import { shallow } from 'enzyme';
import { PromotionBannerContainer } from '../PromotionBanner.container';
import PromotionBanner from '../../views/PromotionBanner.view';

describe('PromotionBanner Container', () => {
  const props = {
    labels: {},
    tcpSegmentValue: 'C',
    bossBanner: true,
    fullBleed: false,
  };
  it('should render PromotionBanner view section', () => {
    const tree = shallow(<PromotionBannerContainer {...props} />);
    expect(tree.is(PromotionBanner)).toBeTruthy();
  });
});

describe('PromotionBanner Container with fullBleed', () => {
  const props = {
    labels: {},
    tcpSegmentValue: 'C',
    bossBanner: true,
    fullBleed: true,
  };
  it('should render PromotionBanner view section', () => {
    const tree = shallow(<PromotionBannerContainer {...props} />);
    expect(tree.is(PromotionBanner)).toBeTruthy();
  });
});
