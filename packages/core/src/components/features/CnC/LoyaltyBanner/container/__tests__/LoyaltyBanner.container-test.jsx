import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyBannerContainer } from '../LoyaltyBanner.container';

describe('LoyaltyBanner View Component', () => {
  let component;
  const Props = {
    orderDetails: {
      estimatedRewardsVal: 20,
      currentSubtotal: 21,
      estimatedSubtotal: 33,
    },
    thresholdValue: 16.66,
  };

  it('OrderLedger should render correctly', () => {
    component = shallow(<LoyaltyBannerContainer {...Props} />);
    expect(component).toMatchSnapshot();
  });
});
