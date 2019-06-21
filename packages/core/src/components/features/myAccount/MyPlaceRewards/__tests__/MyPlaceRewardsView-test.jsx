// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import MyPlaceRewards from '../views/MyPlaceRewards.view';

describe('MyPlaceRewards View', () => {
  it('should render MyPlaceRewards Correctly', () => {
    const tree = shallow(<MyPlaceRewards />);
    expect(tree).toMatchSnapshot();
  });
});
