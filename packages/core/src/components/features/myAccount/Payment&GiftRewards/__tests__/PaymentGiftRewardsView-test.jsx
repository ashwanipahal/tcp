// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import PaymentGiftRewards from '../views/PaymentGiftRewards.view';

describe('PaymentGiftRewards View', () => {
  it('should render PaymentGiftRewards Correctly', () => {
    const tree = shallow(<PaymentGiftRewards />);
    expect(tree).toMatchSnapshot();
  });
});
