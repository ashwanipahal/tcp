// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import PointsHistory from '../views/PointsHistory.view';

describe('PointsHistory View', () => {
  it('should render PointsHistory Correctly', () => {
    const tree = shallow(<PointsHistory />);
    expect(tree).toMatchSnapshot();
  });
});
