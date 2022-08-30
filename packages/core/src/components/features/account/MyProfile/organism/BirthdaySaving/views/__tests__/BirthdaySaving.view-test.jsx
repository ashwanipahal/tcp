import React from 'react';
import { shallow } from 'enzyme';
import BirthdaySaving from '../BirthdaySaving.view';

describe('BirthdaySaving component', () => {
  it('should render correctly', () => {
    const component = shallow(<BirthdaySaving />);
    expect(component).toMatchSnapshot();
  });
});
