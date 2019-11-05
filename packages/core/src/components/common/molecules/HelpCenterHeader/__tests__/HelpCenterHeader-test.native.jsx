import React from 'react';
import { shallow } from 'enzyme';
import HelpCenterHeader from '../views/HelpCenterHeader.native';

describe('HelpCenterHeader component', () => {
  it('HelpCenterHeader component renders correctly without props', () => {
    const component = shallow(<HelpCenterHeader />);
    expect(component).toMatchSnapshot();
  });
});
