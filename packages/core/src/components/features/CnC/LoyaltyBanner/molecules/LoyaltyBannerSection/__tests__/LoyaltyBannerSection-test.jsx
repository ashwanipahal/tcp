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
  };

  it('OrderLedger should render correctly', () => {
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
  };

  it('OrderLedger should render correctly', () => {
    component = shallow(<LoyaltyBannerSectionVanilla {...Props2} />);
    expect(component).toMatchSnapshot();
  });
});
