import React from 'react';
import { shallow } from 'enzyme';
import PlaceRewardsContainer from '../PlaceRewards.container';
import { getSiteId } from '../../../../../../utils/utils.web';

jest.mock('../../../../../../utils/utils.web', () => ({
  getSiteId: jest.fn(),
}));

describe('PlaceRewardsContainer', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const tree = shallow(<PlaceRewardsContainer labels={labels} />);
    expect(tree).toMatchSnapshot();
  });

  it('should not render if site id is ca', () => {
    getSiteId.mockImplementation(() => 'ca');
    const tree = shallow(<PlaceRewardsContainer />);
    expect(tree).toMatchSnapshot();
  });
});
