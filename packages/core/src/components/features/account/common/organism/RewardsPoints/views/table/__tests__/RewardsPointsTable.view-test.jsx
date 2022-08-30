import React from 'react';
import { shallow } from 'enzyme';
import { RewardsPointsTableVanilla } from '../RewardsPointsTable.view';

describe('RewardsPointsTable Component', () => {
  it('should render correctly', () => {
    const tree = shallow(<RewardsPointsTableVanilla />);
    expect(tree).toMatchSnapshot();
  });
});
