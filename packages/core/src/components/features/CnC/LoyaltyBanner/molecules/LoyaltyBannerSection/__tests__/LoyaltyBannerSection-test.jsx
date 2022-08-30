import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyBannerSectionVanilla } from '../views/LoyaltyBannerSection';

describe('LoyaltyBanner View Component', () => {
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

  it('not isPlcc should render correctly', () => {
    component = shallow(<LoyaltyBannerSectionVanilla {...Props} />);
    expect(component).toMatchSnapshot();
  });

  const Props2 = {
    className: '',
    labels: {},
    estimatedRewardsVal: 200,
    currentSubtotal: 21,
    estimatedSubtotal: 33,
    thresholdValue: 16.66,
    isGuest: false,
    earnedReward: 0,
    isPlcc: false,
    pointsToNextReward: false,
  };

  it('isPlcc should render correctly', () => {
    component = shallow(<LoyaltyBannerSectionVanilla {...Props2} />);
    expect(component).toMatchSnapshot();
  });

  const Props3 = {
    className: '',
    labels: {},
    estimatedRewardsVal: 200,
    currentSubtotal: 21,
    estimatedSubtotal: 33,
    thresholdValue: 16.66,
    isGuest: false,
    earnedReward: 0,
    isPlcc: true,
    pointsToNextReward: false,
  };

  it('earnedReward should render correctly', () => {
    component = shallow(<LoyaltyBannerSectionVanilla {...Props3} />);
    expect(component).toMatchSnapshot();
  });

  const Props4 = {
    className: '',
    labels: {},
    estimatedRewardsVal: 200,
    currentSubtotal: 21,
    estimatedSubtotal: 33,
    thresholdValue: 16.66,
    isGuest: false,
    earnedReward: 1,
    isPlcc: true,
    pointsToNextReward: false,
  };

  it('earnedReward isGuest should render correctly', () => {
    component = shallow(<LoyaltyBannerSectionVanilla {...Props4} />);
    expect(component).toMatchSnapshot();
  });

  const Props5 = {
    className: '',
    labels: {},
    estimatedRewardsVal: 200,
    currentSubtotal: 21,
    estimatedSubtotal: 33,
    thresholdValue: 16.66,
    isGuest: true,
    earnedReward: 1,
    isPlcc: true,
    pointsToNextReward: false,
  };

  it('isGuest should render correctly', () => {
    component = shallow(<LoyaltyBannerSectionVanilla {...Props5} />);
    expect(component).toMatchSnapshot();
  });

  const Props6 = {
    className: '',
    labels: {},
    estimatedRewardsVal: 200,
    currentSubtotal: 21,
    estimatedSubtotal: 33,
    thresholdValue: 16.66,
    isGuest: false,
    earnedReward: 1,
    isPlcc: false,
    pointsToNextReward: false,
  };

  it('isGuest isPlcc should render correctly', () => {
    component = shallow(<LoyaltyBannerSectionVanilla {...Props6} />);
    expect(component).toMatchSnapshot();
  });
});
