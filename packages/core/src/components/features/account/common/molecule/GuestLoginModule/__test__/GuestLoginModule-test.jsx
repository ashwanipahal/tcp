import React from 'react';
import { shallow } from 'enzyme';
import GuestLoginOverview from '../views';

describe('GuestLoginOverview component', () => {
  it('GuestLoginOverview component renders correctly without props', () => {
    const component = shallow(<GuestLoginOverview />);
    expect(component).toMatchSnapshot();
  });
});
