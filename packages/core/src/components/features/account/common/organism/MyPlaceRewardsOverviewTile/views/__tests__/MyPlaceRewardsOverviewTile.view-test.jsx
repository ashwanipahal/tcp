import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { MyPlaceRewardsOverviewTile } from '../MyPlaceRewardsOverviewTile.view';

describe('MyPlaceRewardsOverviewTile component', () => {
  it('should render correctly when coupons are present', () => {
    const props = {
      labels: {
        lbl_overview_myPlaceRewardsAvailable: '',
      },
      coupons: List([{}]),
    };
    const component = shallow(<MyPlaceRewardsOverviewTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly when coupons are not present', () => {
    const props = {
      labels: {},
      coupons: List([]),
      isBrierleyEnabled: false,
    };
    const component = shallow(<MyPlaceRewardsOverviewTile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
