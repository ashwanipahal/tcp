import React from 'react';
import { shallow } from 'enzyme';
import { MiniBagHeaderVanilla } from '../views/MiniBagHeader';

describe('MiniBagHeader component', () => {
  it('renders correctly', () => {
    const props = {
      labels: {
        viewBag: 'view Bag content',
        viewSaveForLater: 'save for later',
        subTotal: 'total',
        points: 'points',
        inRewards: 'rewards',
        accessibility: {},
      },
      userName: 'User',
      cartItemCount: '12',
      subTotal: '122',
    };
    const component = shallow(<MiniBagHeaderVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly without username', () => {
    const props = {
      labels: {
        viewBag: 'view Bag content',
        viewSaveForLater: 'save for later',
        subTotal: 'total',
        points: 'points',
        inRewards: 'rewards',
        accessibility: {},
      },

      cartItemCount: '12',
      subTotal: '122',
    };
    const component = shallow(<MiniBagHeaderVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
