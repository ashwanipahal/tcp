import React from 'react';
import { shallow } from 'enzyme';
import CreditCardPageHeader from '../CreditCardPageHeader';

describe('CreditCardPageHeader component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        plcc_form_back_button: 'back',
        plcc_form_rewardsCardHeading: 'rewards',
      },
    };
    const component = shallow(<CreditCardPageHeader {...props} />);
    expect(component).toMatchSnapshot();
  });
});
