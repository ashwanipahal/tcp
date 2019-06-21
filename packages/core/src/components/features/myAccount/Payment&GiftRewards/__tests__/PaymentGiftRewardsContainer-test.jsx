// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import PaymentGiftRewards from '../container/Payment&GiftRewards.container';

describe('PaymentGiftRewards Container', () => {
  it('should render PaymentGiftRewards Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<PaymentGiftRewards mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
