import React from 'react';
import { shallow } from 'enzyme';
import CreditCardPageHeader from '../CreditCardPageHeader';

describe('CreditCardPageHeader component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        lbl_PLCCForm_backButton: 'back',
        lbl_PLCCForm_rewardsCardHeading: 'rewards',
      },
    };
    const component = shallow(<CreditCardPageHeader {...props} />);
    expect(component).toMatchSnapshot();
  });
});
