// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import MyPlaceRewardsCC from '../container/MyPlaceRewardsCC.container';

describe('MyPlaceRewardsCC Container', () => {
  it('should render MyPlaceRewardsCC Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<MyPlaceRewardsCC mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
