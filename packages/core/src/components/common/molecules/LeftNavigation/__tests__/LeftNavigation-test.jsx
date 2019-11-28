import React from 'react';
import { shallow } from 'enzyme';
import { LeftNavigationVanilla } from '../views/LeftNavigation';
import mock from '../views/mock';

describe('LeftNavigation component', () => {
  it('LeftNavigation component renders correctly without props', () => {
    const component = shallow(<LeftNavigationVanilla />);
    expect(component).toMatchSnapshot();
  });

  it('LeftNavigation component renders correctly with props', () => {
    const props = {
      data: mock,
      className: 'test',
      selectedPage: 'extra-points',
      defaultPage: 'help-center',
    };
    const component = shallow(<LeftNavigationVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
