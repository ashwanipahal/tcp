// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import MyWallet from '../views/MyWallet.view';

describe('MyWallet View', () => {
  it('should render MyWallet Correctly', () => {
    const tree = shallow(<MyWallet />);
    expect(tree).toMatchSnapshot();
  });
});
