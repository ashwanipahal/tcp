import React from 'react';
import { shallow } from 'enzyme';
import mock from '@tcp/core/src/services/abstractors/bootstrap/navigation/mock';
import { NavigationVanilla as Navigation } from '../views/Navigation';

describe('NavBar component', () => {
  it('renders correctly', () => {
    const NavBarComp = shallow(
      <Navigation nav={mock.data.navigation} openNavigationDrawer closeNavigationDrawer={false} />
    );

    expect(NavBarComp).toMatchSnapshot();
  });

  it('DOM loaded perfectly', () => {
    const NavBarComp = shallow(
      <Navigation nav={mock.data.navigation} openNavigationDrawer closeNavigationDrawer={false} />
    );

    expect(NavBarComp.find('.nav-bar')).toHaveLength(1);
  });
});
