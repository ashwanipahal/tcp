import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyBannerVanilla } from '../LoyaltyBannerView/views/LoyaltyBanner.view';

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

  it('LoyaltyBanner should render correctly', () => {
    component = shallow(<LoyaltyBannerVanilla {...Props} />);
    expect(component).toMatchSnapshot();
  });
});
