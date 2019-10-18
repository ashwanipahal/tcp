import React from 'react';
import { shallow } from 'enzyme';
import LoyaltyBanner from '../LoyaltyBannerView/views/LoyaltyBanner.view.native';

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
    component = shallow(<LoyaltyBanner {...Props} />);
    expect(component).toMatchSnapshot();
  });
});
