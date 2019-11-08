import React from 'react';
import { shallow } from 'enzyme';
import { HelpCenterModuleTwoColVanilla } from '../views/HelpCenterModuleTwoCol';

describe('HelpCenterModuleTwoCol component', () => {
  it('HelpCenterModuleTwoCol component renders correctly without props', () => {
    const component = shallow(<HelpCenterModuleTwoColVanilla />);
    expect(component).toMatchSnapshot();
  });

  it('HelpCenterModuleTwoCol component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<HelpCenterModuleTwoColVanilla {...props} />);
    expect(component.find('.test-class')).toHaveLength(2);
  });
});
