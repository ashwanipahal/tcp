import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import React from 'react';
import NavBar from '../components/common/molecules/NavBar';
import HomeStack from '../pages/home';
import PlpStack from '../pages/plp';
import AccountStack from '../pages/account';
import WalletStack from '../pages/login';
import BrandSwitchStack from '../pages/brandSwitch';
import Header from '../components/common/molecules/Header';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: createBottomTabNavigator(
      {
        HomeStack,
        PlpStack,
        BrandSwitchStack,
        AccountStack,
        WalletStack,
      },
      {
        header: props => <Header {...props} />,
        tabBarComponent: NavBar,
      }
    ),
  })
);
