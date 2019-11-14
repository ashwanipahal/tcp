import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyBannerSkeletonVanilla } from '../LoyaltyBannerSkeleton.view';

describe('LoyaltyBanner Skeleton', () => {
  it('Loyalty Banner Skeleton should render properly', () => {
    const props = {
      className: 'sample-className',
    };
    const component = shallow(<LoyaltyBannerSkeletonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
