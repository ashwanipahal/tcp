// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import MyWallet from '../container/MyWallet.container';

describe('MyWallet Container', () => {
  it('should render MyWallet Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<MyWallet mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
