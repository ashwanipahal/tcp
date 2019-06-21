// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import MyPlaceRewards from '../container/MyPlaceRewards.container';

describe('MyPlaceRewards Container', () => {
  it('should render MyPlaceRewards Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<MyPlaceRewards mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
