import React from 'react';
import { shallow } from 'enzyme';
import { PointsHistoryPageContainer } from '../PointsHistoryPage.container';

describe('PointsHistoryPage container', () => {
  it('should render correctly', () => {
    const labels = {};
    const tree = shallow(<PointsHistoryPageContainer labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
