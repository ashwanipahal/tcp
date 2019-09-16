import React from 'react';
import { shallow } from 'enzyme';
import { PointsHistoryPageView } from '../PointsHistoryPage.view';

describe('PointHistoryPage component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<PointsHistoryPageView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
