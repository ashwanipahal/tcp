import React from 'react';
import { shallow } from 'enzyme';
import BirthdaySavings from '../BirthdaySavingsPage.view.native';

describe('BirthdaySavingsPage component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        lbl_profile_personal_info_back: 'back',
        lbl_profile_birthday_savings: 'Birthday Savings',
        lbl_profile_birthday_saving_info:
          'Add up to 4 kids’ birthdays to your account and receive special savings during their birthday month!',
      },
      mountAddChildModal: false,
      handleComponentChange: jest.fn(),
    };
    const component = shallow(<BirthdaySavings {...props} />);
    expect(component).toMatchSnapshot();
  });
});
