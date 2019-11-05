import React from 'react';
import { shallow } from 'enzyme';
import HelpCenterHeader from '../views/HelpCenterHeader';

describe('HelpCenterHeader component', () => {
  it('HelpCenterHeader component renders correctly without props', () => {
    const component = shallow(<HelpCenterHeader />);
    expect(component).toMatchSnapshot();
  });

  it('HelpCenterHeader component renders correctly with props', () => {
    const props = {
      className: 'test-class',
      labels: {},
    };
    const component = shallow(<HelpCenterHeader {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
