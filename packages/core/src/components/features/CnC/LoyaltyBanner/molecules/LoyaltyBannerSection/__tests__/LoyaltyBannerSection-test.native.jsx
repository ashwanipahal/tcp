import React from 'react';
import { shallow } from 'enzyme';
import LoyaltyBannerSection from '../views/LoyaltyBannerSection.native';

describe('LoyaltyBanner Section Component', () => {
  let component;
  const Props = {
    className: '',
    labels: {},
    estimatedRewardsVal: 20,
    currentSubtotal: 21,
    estimatedSubtotal: 33,
    thresholdValue: 16.66,
    isGuest: true,
    earnedReward: 0,
    isPlcc: false,
    pointsToNextReward: false,
  };

  it('LoyaltyBanner Section should render correctly', () => {
    component = shallow(<LoyaltyBannerSection {...Props} />);
    expect(component).toMatchSnapshot();
  });
});
