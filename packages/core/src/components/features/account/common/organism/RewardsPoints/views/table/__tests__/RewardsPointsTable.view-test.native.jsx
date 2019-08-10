import React from 'react';
import { shallow } from 'enzyme';
import RewardsPointsTable from '../RewardsPointsTable.view';

describe('RewardsPointsTable Component', () => {
  it('should render correctly', () => {
    const tree = shallow(<RewardsPointsTable />);
    expect(tree).toMatchSnapshot();
  });
});
