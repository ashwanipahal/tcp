import React from 'react';
import { shallow } from 'enzyme';
import { RewardsPointsBanner } from '../RewardsPointsBanner.view';

describe('RewardsPointsBanner Component', () => {
  it('should render correctly', () => {
    const tree = shallow(<RewardsPointsBanner content="<p>test</p>" />);
    expect(tree).toMatchSnapshot();
  });
});
