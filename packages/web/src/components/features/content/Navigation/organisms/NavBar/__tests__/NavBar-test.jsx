import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/bootstrap/navigation/mock';
import { NavBarVanilla as NavBar } from '../NavBar';

describe('NavBar component', () => {
  it('renders correctly', () => {
    const NavBarComp = shallow(
      <NavBar nav={mock.data.navigation} openL2Drawer={() => {}} hideL2Drawer={() => {}} />
    );

    expect(NavBarComp).toMatchSnapshot();
  });

  it('DOM loaded perfectly', () => {
    const NavBarComp = shallow(
      <NavBar nav={mock.data.navigation} openL2Drawer={() => {}} hideL2Drawer={() => {}} />
    );

    expect(NavBarComp.find('.nav-bar-l1')).toHaveLength(1);
  });
});
