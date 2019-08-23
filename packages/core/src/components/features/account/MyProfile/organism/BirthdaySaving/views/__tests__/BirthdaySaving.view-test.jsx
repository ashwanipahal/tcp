import React from 'react';
import { shallow } from 'enzyme';
import BirthdaySaving from '../BirthdaySaving.view';

describe('BirthdaySaving component', () => {
  it('should render correctly', () => {
    const labels = {
      lbl_profile_birthday_savings: 'Birthday Savings',
      lbl_profile_add_birthday_info: 'ADD BIRTHDAY INFO',
    };
    const component = shallow(<BirthdaySaving labels={labels} />);
    expect(component).toMatchSnapshot();
  });
});
