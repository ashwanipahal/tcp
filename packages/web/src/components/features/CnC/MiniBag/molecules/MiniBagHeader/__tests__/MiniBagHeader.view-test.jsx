import React from 'react';
import { shallow } from 'enzyme';
import MiniBagHeader from '../views/MiniBagHeader';

describe('MiniBagHeader component', () => {
  it('renders correctly', () => {
    const props = {
      labels: {
        viewBag: 'view Bag content',
        viewSaveForLater: 'save for later',
        subTotal: 'total',
        points: 'points',
        inRewards: 'rewards',
      },
      userName: 'User',
      cartItemCount: '12',
      subTotal: '122',
    };
    const component = shallow(<MiniBagHeader {...props} />);
    expect(component).toMatchSnapshot();
  });
});
