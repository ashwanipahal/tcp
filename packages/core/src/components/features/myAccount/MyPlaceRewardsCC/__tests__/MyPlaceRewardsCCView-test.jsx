// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import MyPlaceRewardsCC from '../views/MyPlaceRewardsCC.view';

describe('MyPlaceRewardsCC View', () => {
  it('should render MyPlaceRewardsCC Correctly', () => {
    const tree = shallow(<MyPlaceRewardsCC />);
    expect(tree).toMatchSnapshot();
  });
});
