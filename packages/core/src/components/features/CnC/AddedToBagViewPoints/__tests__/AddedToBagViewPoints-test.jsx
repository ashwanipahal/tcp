import React from 'react';
import { shallow } from 'enzyme';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';

describe('AddedToBagViewPoints component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'abcd',
      pointsSummary: {
        itemPrice: 12,
        itemPoints: 23,
        subTotal: 34,
        userPoints: 60,
        pointsToNextReward: 12,
        totalItems: 3,
      },
    };
    const component = shallow(<AddedToBagViewPoints {...props} />);
    expect(component).toMatchSnapshot();
  });
});
