// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import PointsHistory from '../container/PointsHistory.container';

describe('PointsHistory Container', () => {
  it('should render PointsHistory Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<PointsHistory mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
