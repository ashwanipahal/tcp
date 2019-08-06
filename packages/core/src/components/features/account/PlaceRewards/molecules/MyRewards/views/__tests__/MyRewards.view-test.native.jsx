import React from 'react';
import { shallow } from 'enzyme';
import MyRewards from '../MyRewards.view.native';

describe('MyRewards', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const tree = shallow(<MyRewards labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
