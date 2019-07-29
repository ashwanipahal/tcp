import React from 'react';
import { shallow } from 'enzyme';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view.native';

describe('AddedToBagViewPoints native component', () => {
  it('renders correctly', () => {
    const props = {
      pointsSummary: {
        itemPrice: 12,
        itemPoints: 23,
        subTotal: 34,
        userPoints: 60,
        pointsToNextReward: 12,
        totalItems: 3,
      },
      labels: {
        bagSubTotal: '123',
      },
    };
    const component = shallow(<AddedToBagViewPoints {...props} />);
    expect(component).toMatchSnapshot();
  });
});
